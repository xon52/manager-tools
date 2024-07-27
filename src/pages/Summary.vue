<template>
	<div class="flex flex-col h-full">
		<!-- Output -->
		<div class="flex-1 overflow-y-auto">
			<div
				v-for="(conversation, key) in conversations"
				:key="tabId + '-' + key">
				<p v-if="conversation.role === 'user'">{{ conversation.content }}</p>
				<div
					v-else
					v-html="conversation.content"></div>
			</div>
		</div>

		<!-- Actions -->
		<div class="flex justify-around m-4">
			<Button
				@click="summarize"
				severity="primary">
				Summarize Page
			</Button>
		</div>

		<!-- Chat -->
		<Accordion value="-1">
			<AccordionPanel value="0">
				<AccordionHeader>Context</AccordionHeader>
				<AccordionContent>
					<Textarea
						v-model="newContext"
						rows="5"
						fluid
						placeholder="No context will not use any of the page" />
					<div class="flex justify-end">
						<Button
							text
							label="Reset context"
							size="small"
							icon="pi pi-refresh"
							aria-label="Refresh"
							@click="refreshContext">
						</Button>
					</div>
				</AccordionContent>
			</AccordionPanel>

			<AccordionPanel value="1">
				<AccordionHeader>Ask a question</AccordionHeader>
				<AccordionContent>
					<Textarea
						v-model="newChat"
						rows="5"
						fluid
						@keydown.enter="addConversation"
						placeholder="Enter new conversation" />
					<div class="flex justify-end">
						<Button
							text
							label="Send"
							size="small"
							icon="pi pi-send"
							aria-label="Send"
							@click="addConversation">
						</Button>
					</div>
				</AccordionContent>
			</AccordionPanel>
		</Accordion>
	</div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { Conversation } from '@/types';

const store = useStore();
const router = useRouter();
const tabId = ref();
const conversations: Ref<Conversation[]> = ref([]);
const newContext = ref('');
const newChat = ref('');

const refreshContext = () => {
	// router.push({ path: '/chat' });
};

const summarize = () => {
	// router.push({ path: '/chat' });
};

onMounted(() => {
	chrome.tabs.getCurrent((tab) => {
		tabId.value = tab?.id;
		conversations.value = store.getConversations(tabId.value);
	});
});

const addConversation = () => {
	const newConversation: Conversation = {
		role: 'user',
		content: newChat.value,
	};
	store.addConversation(tabId.value, newConversation);
};
</script>
