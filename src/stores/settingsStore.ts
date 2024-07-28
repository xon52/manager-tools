import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
	state: () => ({
		aiModel: '',
		apiKey: '',
	}),

	actions: {
		async initialize() {
			chrome.storage.sync.get(['aiModel', 'apiKey'], (result) => {
				this.aiModel = result.aiModel || '';
				this.apiKey = result.apiKey || '';
			});
		},
		resetSyncData() {
			chrome.storage.sync.clear();
		},
		async setAiModel(payload: string) {
			this.aiModel = payload;
			await chrome.storage.sync.set({ aiModel: payload });
		},
		async setApiKey(payload: string) {
			this.apiKey = payload;
			await chrome.storage.sync.set({ apiKey: payload });
		},
	},

	getters: {},
});
