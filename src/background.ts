// const openTabs = new Map();

chrome.runtime.onInstalled.addListener((details) => {
	console.log('onInstalled', details);
});

chrome.action.onClicked.addListener((tab) => {
	if (tab.id === undefined) return;
	chrome.sidePanel.open({ tabId: tab.id });
});

// chrome.action.onClicked.addListener((tab) => {
// 	if (tab.id === undefined) return;
// 	if (openTabs.has(tab.id)) {
// 		console.log('Tab already exists', tab);
// 		openTabs.delete(tab.id);
// 		chrome.sidePanel.setOptions({
// 			path: './sidepanel/index.html',
// 			tabId: tab.id,
// 			enabled: false,
// 		});
// 		return;
// 	} else {
// 		console.log('tab open', tab);
// 		chrome.sidePanel.open({ tabId: tab.id });
// 		openTabs.set(tab.id, true);
// 		chrome.sidePanel.setOptions({
// 			path: './sidepanel/index.html',
// 			tabId: tab.id,
// 			enabled: true,
// 		});
// 	}
// });

// https://developer.chrome.com/docs/extensions/develop/concepts/messaging#connect

chrome.runtime.onConnect.addListener(function (port) {
	if (port.name === 'mySidepanel') {
		port.onDisconnect.addListener(async () => {
			console.log('Sidepanel closed.');
		});
	}
});
