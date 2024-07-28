<template>
	<div class="flex flex-col h-full max-h-full">
		<!-- Output -->
		<div
			class="bg-slate-600 flex-1 p-4 overflow-auto prose dark:prose-invert prose-sm"
			style="height: 100%">
			<article
				v-for="chat in filteredChats"
				:key="chat.id"
				v-html="chat.content"></article>
		</div>

		<!-- Actions -->
		<div class="flex justify-around m-4">
			<Button
				@click="summarize"
				severity="primary"
				:loading="working">
				Summarize Page
			</Button>
		</div>

		<!-- Estimate -->
		<MyCostStats
			:input="newContext"
			:output="newChat" />

		<Accordion value="-1">
			<!-- Context -->
			<AccordionPanel value="0">
				<AccordionHeader>Context</AccordionHeader>
				<AccordionContent>
					<Textarea
						v-model="newContext"
						rows="5"
						fluid
						disabled
						placeholder="No context will not use any of the page" />
					<!-- <div class="flex justify-end">
						<Button
							text
							label="Reset context"
							size="small"
							icon="pi pi-refresh"
							aria-label="Refresh"
							@click="refreshContext">
						</Button>
					</div> -->
				</AccordionContent>
			</AccordionPanel>
			<!-- Chat -->
			<AccordionPanel value="1">
				<AccordionHeader>Ask a question</AccordionHeader>
				<AccordionContent>
					<Textarea
						v-model="newChat"
						rows="5"
						fluid
						@keydown.enter="addChat"
						placeholder="Enter new conversation" />
					<div class="flex justify-end">
						<Button
							text
							label="Send"
							size="small"
							icon="pi pi-send"
							aria-label="Send"
							@click="addChat">
						</Button>
					</div>
				</AccordionContent>
			</AccordionPanel>
		</Accordion>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useSettingsStore, useChatStore } from '@/stores';
import { Chat } from '@/types';
import MyCostStats from '@/components/MyCostStats.vue';
import { storeToRefs } from 'pinia';
import { extractContent } from '@/helpers';
import Anthropic from '@anthropic-ai/sdk';

const tabId = ref(0);
const newContext = ref('');
const newChat = ref('');
const COOLDOWN_PERIOD = 5000; // 5 seconds
const lastSummarizeTime = ref(0);
const working = ref(false);
const error = ref<string | undefined>();

const chatStore = useChatStore();
const { chats } = storeToRefs(chatStore);
const settingsStore = useSettingsStore();
const { apiKey, aiModel } = storeToRefs(settingsStore);

const filteredChats = computed(() => chats.value.filter((chat: Chat) => chat.tabId === tabId.value));

const refresh = async () => {
	const activeTab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
	if (!activeTab || activeTab.id === undefined) throw new Error('No active tab found');
	tabId.value = activeTab.id;
	const content = await extractContent(activeTab!);
	newContext.value = [
		'Using the provided text, complete the sections:',
		'- The main idea, eliminating extraneous language and focusing on critical aspects.',
		'- A summary that is detailed, thorough, in-depth, and complex, while maintaining clarity and conciseness.',
		'Reply using properly formatted HTML.',
		'Only use the provided text, without including external information.',
		'\n',
		content,
	].join('\n');
};

const addChat = () => {
	alert('addChat');
};

const summarize = async () => {
	working.value = true;
	error.value = '';

	// Prevent multiple requests within the cooldown period
	const now = Date.now();
	if (now - lastSummarizeTime.value < COOLDOWN_PERIOD) {
		error.value = `Please wait ${Math.ceil(
			(COOLDOWN_PERIOD - (now - lastSummarizeTime.value)) / 1000
		)} seconds before trying again.`;
		return;
	}
	lastSummarizeTime.value = now;

	try {
		if (!apiKey) throw new Error('Anthropic API key is not set');
		const anthropic = new Anthropic({ apiKey: apiKey.value });

		const reply = await anthropic.messages.create({
			model: aiModel.value,
			max_tokens: 1024,
			messages: [
				{
					role: 'user',
					content: newContext.value,
				},
			],
		});

		if (!reply || !reply.content || !reply.content.length) {
			throw new Error('Failed to generate summary');
		}

		// Extract the contends from the body element of the HTML response
		const replyText = (reply.content[0] as Anthropic.TextBlock).text;
		const replyTextTrim = replyText.split('\n').slice(2).join('\n');
		console.log(replyTextTrim);
		chatStore.addChat(tabId.value, 'assistant', replyTextTrim);
	} catch (e) {
		console.error('Error:', e);
		if (e instanceof Error) {
			switch (e.message) {
				case 'No active tab found':
					error.value = 'Unable to access the current tab. Please try again.';
					break;
				case 'Failed to retrieve page content':
					error.value = 'Unable to read the page content. Please refresh the page and try again.';
					break;
				case 'Anthropic API key is not set':
					error.value = 'API key is missing. Please check the extension configuration.';
					break;
				case 'Failed to generate summary':
					error.value = 'Unable to generate a summary. The service may be temporarily unavailable.';
					break;
				default:
					error.value = 'An unexpected error occurred. Please try again later.';
			}
		} else {
			error.value = 'An unknown error occurred. Please try again later.';
		}
	} finally {
		working.value = false;
	}
};

watch(tabId, refresh, { immediate: true });
</script>
