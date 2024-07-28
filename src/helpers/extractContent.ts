import { extractFromHtml } from '@extractus/article-extractor';
import htmlToText from './htmlToText';

const extractContent = async (tab: chrome.tabs.Tab) => {
	// console.log('tab', tab);
	// Send a message to the content script to get the page HTML
	const response = await chrome.tabs.sendMessage(tab.id!, { action: 'getPageHtml' });
	// console.log('response', response);
	const html = response.content;
	// console.log('html', html);
	// Extract the article from the HTML
	const extracted = await extractFromHtml(html, tab.url, {});
	// console.log('extracted', extracted);
	const texted = htmlToText(extracted?.content || html);
	// console.log('texted', texted);
	return texted;
};

export default extractContent;
