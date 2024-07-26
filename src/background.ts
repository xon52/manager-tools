chrome.runtime.onInstalled.addListener((details) => {});

chrome.action.onClicked.addListener((tab) => {
	// The callback for runtime.onMessage must return falsy if we're not sending a response
	(async () => {
		// This will open a tab-specific side panel only on the current tab.
		await chrome.sidePanel.open({ tabId: tab.id || 0 });
		await chrome.sidePanel.setOptions({
			tabId: tab.id,
			enabled: true,
		});
	})();
});

// chrome.commands.onCommand.addListener((shortcut) => {
// 	console.log('lets reload');
// 	console.log(shortcut);
// 	if (shortcut.includes('+M')) {
// 		chrome.runtime.reload();
// 	}
// });
