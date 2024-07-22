import { extractFromHtml } from '@extractus/article-extractor';

const extractArticle = (html: string, url?: string) => {
	return extractFromHtml(html, url, {});
};

export default extractArticle;
