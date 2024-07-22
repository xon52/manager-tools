chrome.runtime.onInstalled.addListener((details) => {
	console.log('Extension installed', details);
});

chrome.action.onClicked.addListener((tab) => {
	// if (tab.id) chrome.sidePanel.open({ tabId: tab.id });
	if (tab.id) chrome.sidePanel.open({ tabId: tab.id });
	// chrome.sidePanel
	// 	.getOptions({ tabId: tab.id })
	// 	.then((options) => options.enabled)
	// 	.then((isOpen) => {
	// 		console.log('Side panel open state:', isOpen);
	// 		chrome.sidePanel.setOptions({ tabId: tab.id, enabled: !isOpen });
	// 	});
});
