chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'getPageHtml') {
		sendResponse({ content: document.getElementsByTagName('html')[0].innerHTML });
	}
	return true;
});
