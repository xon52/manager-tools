const htmlToText = (html: string) => {
	const doc = new DOMParser().parseFromString(html, 'text/html');
	// insert a '-' for each li element
	doc.querySelectorAll('li').forEach((li) => {
		li.insertAdjacentHTML('afterbegin', ' - ');
	});
	// Add stars to header tags
	doc.querySelectorAll('h1').forEach((h) => {
		h.insertAdjacentHTML('afterbegin', '# ');
	});
	doc.querySelectorAll('h2').forEach((h) => {
		h.insertAdjacentHTML('afterbegin', '## ');
	});
	doc.querySelectorAll('h3').forEach((h) => {
		h.insertAdjacentHTML('afterbegin', '### ');
	});
	doc.querySelectorAll('h4, h5, h6').forEach((h) => {
		h.insertAdjacentHTML('afterbegin', '#### ');
	});
	// add a new line after each element
	doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((p) => {
		p.insertAdjacentHTML('beforebegin', '\n');
	});
	// add a new line after each element
	doc.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div, ol, ul, br').forEach((p) => {
		p.insertAdjacentHTML('afterend', '\n');
	});

	let text = doc.body.textContent || '';
	// trim each line, remove excess new lines, and remove new lines after list items
	text = text
		.split('\n')
		.map((line) => line.trim())
		.join('\n')
		.replace(/\n{3,}/g, '\n\n')
		.replace(/-\n{1,}/g, '-');
	return text;
};

export default htmlToText;
