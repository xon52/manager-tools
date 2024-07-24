<template>
	<div>
		<h1>Chat</h1>
		<h4>Using: {{ store.getAiModel }}</h4>
		<div
			v-for="(conversation, key) in conversations"
			:key="tabId + '-' + key">
			<p v-if="conversation.role === 'user'">{{ conversation.content }}</p>
			<div
				v-else
				v-html="conversation.content"></div>
		</div>
		<div>
			<input
				v-model="newChat"
				placeholder="Enter new conversation" />
			<button @click="addConversation">Send</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';
import { Conversation } from '@/types';

const store = useStore();
const router = useRouter();
const tabId = ref();
const conversations: Ref<Conversation[]> = ref([]);
const newChat = ref('');

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
