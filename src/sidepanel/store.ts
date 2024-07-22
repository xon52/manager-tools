import { defineStore } from 'pinia';

type conversation = {
	role: string;
	content: string;
};

export const useStore = defineStore('ai', {
	state: () => ({
		aiModel: '',
		apiKey: '',
		tabs: Array<{ tabId: number; conversations: conversation[] }>(),
	}),

	actions: {
		async initializeStore() {
			await Promise.all([this.loadSyncData(), this.loadSessionData()]);
		},
		loadSyncData() {
			chrome.storage.sync.get(['ai_model', 'anthropic_key', 'openai_key'], (result) => {
				this.aiModel = result.aiModel || '';
				this.apiKey = result.apiKey || '';
			});
		},
		loadSessionData() {
			chrome.storage.session.get(['tabs'], (result) => {
				this.tabs = result.tabs || [];
			});
		},
		async saveSyncData() {
			await chrome.storage.sync.set({
				aiModel: this.aiModel,
				apiKey: this.apiKey,
			});
		},
		async saveSessionData() {
			await chrome.storage.session.set({ tabs: this.tabs });
		},
		setAiModel(model: string) {
			this.aiModel = model;
			this.saveSyncData();
		},
		setApiKey(key: string) {
			this.apiKey = key;
			this.saveSyncData();
		},
		addTab(tabId: number) {
			this.tabs.push({ tabId, conversations: [] });
			this.saveSessionData();
		},
		removeTab(tabId: number) {
			this.tabs = this.tabs.filter((tab) => tab.tabId !== tabId);
			this.saveSessionData();
		},
		addConversation(tabId: number, conversation: conversation) {
			this.tabs.find((tab) => tab.tabId === tabId)?.conversations.push(conversation);
			this.saveSessionData();
		},
	},

	getters: {
		getAiModel: (state) => state.aiModel,
		getApiKey: (state) => state.apiKey,
		getConversations: (state) => (tabId: number) => state.tabs.find((tab) => tab.tabId === tabId)?.conversations || [],
	},
});
