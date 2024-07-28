import { v4 as uuidv4 } from 'uuid';
import { Chat } from '@/types';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chats', {
	state: () => ({
		chats: [] as Chat[],
	}),

	actions: {
		async initialize() {
			// chrome.storage.session.get(['tabs'], (result) => {
			// 	this.tabs = result.tabs || [];
			// });
			// chrome.action.onClicked.addListener((tab) => {
			// 	console.log('tab', tab);
			// 	useChatStore().addTab(tab.id);
			// 	chrome.sidePanel.setOptions({
			// 		tabId: tab.id,
			// 		enabled: true,
			// 	});
			// });
			// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
			// 	console.log('tabId', tabId, 'changeInfo', changeInfo, 'tab', tab);
			// 	useChatStore().switchTab(tabId);
			// 	if (useChatStore().isActive(tabId)) {
			// 		chrome.sidePanel.setOptions({
			// 			tabId: tabId,
			// 			enabled: true,
			// 		});
			// 	} else {
			// 		chrome.sidePanel.setOptions({
			// 			tabId: tabId,
			// 			enabled: false,
			// 		});
			// 	}
			// });
		},
		// async saveSessionData() {
		// 	await chrome.storage.session.set({ tabs: this.tabs });
		// },
		// addTab(tabId: number) {
		// 	this.tabs.push({ tabId, conversations: [] });
		// 	this.saveSessionData();
		// },
		// removeTab(tabId: number) {
		// 	this.tabs = this.tabs.filter((tab) => tab.tabId !== tabId);
		// 	this.saveSessionData();
		// },
		addChat(tabId: number, role: string, content: string) {
			this.chats.push({
				tabId,
				id: uuidv4(),
				role,
				content,
				createdAt: Date.now(),
			});
		},
	},

	getters: {
		getChats: (state) => (tabId: number) => {
			return state.chats.filter((chat) => chat.tabId === tabId).sort((a, b) => a.createdAt - b.createdAt);
		},
	},
});
