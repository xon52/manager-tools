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
		resetSyncData() {
			chrome.storage.sync.clear();
		},
		loadSyncData() {
			chrome.storage.sync.get(['aiModel', 'apiKey'], (result) => {
				this.aiModel = result.aiModel || '';
				this.apiKey = result.apiKey || '';
			});
		},
		loadSessionData() {
			chrome.storage.session.get(['tabs'], (result) => {
				this.tabs = result.tabs || [];
			});
		},
		async saveSessionData() {
			await chrome.storage.session.set({ tabs: this.tabs });
		},
		async setAiModel(payload: string) {
			this.aiModel = payload;
			await chrome.storage.sync.set({ aiModel: payload });
		},
		async setApiKey(payload: string) {
			this.apiKey = payload;
			await chrome.storage.sync.set({ apiKey: payload });
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
		getConversations: (state) => (tabId: number) => state.tabs.find((tab) => tab.tabId === tabId)?.conversations || [],
	},
});
