<template>
	<div class="summarizer">
		<div v-if="summary">
			<p>Input word count: {{ new Intl.NumberFormat().format(input.split(' ').length) }}</p>
			<p>Total tokens: {{ new Intl.NumberFormat().format(estimatedTokens) }}</p>
			<p>
				Total cost:
				{{
					new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3 }).format(
						estimatedCost
					)
				}}
			</p>
		</div>
		<div v-else>
			<p>Input word count: {{ new Intl.NumberFormat().format(input.split(' ').length) }}</p>
			<p>Input tokens: {{ new Intl.NumberFormat().format(guessTokens) }}</p>
			<p>
				Estimated cost:
				{{
					new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3 }).format(
						guessCost
					)
				}}
			</p>
		</div>
		<button
			@click="summarize"
			:disabled="loading">
			Summarize 2
		</button>
		<div
			v-if="loading"
			class="status loading">
			<p>Summarizing page content...</p>
			<div class="progress-bar"></div>
		</div>
		<div
			v-if="error"
			class="status error">
			<p>{{ error }}</p>
			<button @click="dismissError">Dismiss</button>
		</div>
		<div
			v-if="summary"
			class="summary">
			<div v-html="summary"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Anthropic from '@anthropic-ai/sdk';
import { extractArticle, htmlToText } from '@/helpers';
import gptCost from '@/helpers/gptCost';

const summary = ref('');
const guessTokens = ref(0);
const guessCost = ref(0);
const estimatedTokens = ref(0);
const estimatedCost = ref(0);
const input = ref('');
const loading = ref(false);
const error = ref('');
const COOLDOWN_PERIOD = 5000; // 5 seconds
const lastSummarizeTime = ref(0);

const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
if (!tab || !tab.id) {
	throw new Error('No active tab found');
}
const response = await chrome.tabs.sendMessage(tab.id, { action: 'getPageHtml' });
const html = response.content;
const extracted = await extractArticle(html, tab.url);
input.value = htmlToText(extracted?.content || html);

const prepare = async () => {
	const { inputCost, inputTokens } = gptCost(input.value);
	guessTokens.value = inputTokens;
	guessCost.value = inputCost * 2;
};

onMounted(prepare);

const total = async () => {
	const { totalCost, totalTokens } = gptCost(input.value, summary.value);
	estimatedTokens.value = totalTokens;
	estimatedCost.value = totalCost;
};

const summarize = async () => {
	loading.value = true;
	error.value = '';
	summary.value = '';

	// Prevent multiple requests within the cooldown period
	const now = Date.now();
	if (now - lastSummarizeTime.value < COOLDOWN_PERIOD) {
		error.value = `Please wait ${Math.ceil(
			(COOLDOWN_PERIOD - (now - lastSummarizeTime.value)) / 1000
		)} seconds before trying again.`;
		return;
	}
	lastSummarizeTime.value = now;

	try {
		if (!import.meta.env.VITE_ANTHROPIC_API_KEY) {
			throw new Error('Anthropic API key is not set');
		}

		const anthropic = new Anthropic({
			apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
		});

		const content = [
			'You are a professional summarizer.',
			'Using the provided text, complete the sections:',
			'- The main idea, eliminating extraneous language and focusing on critical aspects',
			'- A summary that is detailed, thorough, in-depth, and complex, while maintaining clarity and conciseness.',
			'Reply using properly formatted HTML.',
			'You must rely strictly on the provided text, without including external information',
			'\n',
			input.value,
		].join('\n');

		const reply = await anthropic.messages.create({
			model: 'claude-3-5-sonnet-20240620',
			max_tokens: 1024,
			messages: [
				{
					role: 'user',
					content,
				},
			],
		});

		if (!reply || !reply.content || !reply.content.length) {
			throw new Error('Failed to generate summary');
		}

		const replyText = (reply.content[0] as Anthropic.TextBlock).text;

		// Extract the contends from the body element of the HTML response
		summary.value = replyText.match(/<body>([\s\S]*)<\/body>/)?.[1] || replyText;

		total();
	} catch (e) {
		console.error('Error:', e);
		if (e instanceof Error) {
			switch (e.message) {
				case 'No active tab found':
					error.value = 'Unable to access the current tab. Please try again.';
					break;
				case 'Failed to retrieve page content':
					error.value = 'Unable to read the page content. Please refresh the page and try again.';
					break;
				case 'Anthropic API key is not set':
					error.value = 'API key is missing. Please check the extension configuration.';
					break;
				case 'Failed to generate summary':
					error.value = 'Unable to generate a summary. The service may be temporarily unavailable.';
					break;
				default:
					error.value = 'An unexpected error occurred. Please try again later.';
			}
		} else {
			error.value = 'An unknown error occurred. Please try again later.';
		}
	} finally {
		loading.value = false;
	}
};

const dismissError = () => {
	error.value = '';
};
</script>

<style scoped>
.summarizer {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.status {
	padding: 0.5rem;
	border-radius: 4px;
}

.loading {
	background-color: #e6f7ff;
	color: #1890ff;
}

.error {
	background-color: #fff1f0;
	color: #f5222d;
}

.progress-bar {
	width: 100%;
	height: 4px;
	background-color: #e6f7ff;
	position: relative;
	overflow: hidden;
}

.progress-bar::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 30%;
	height: 100%;
	background-color: #1890ff;
	animation: progress 1.5s ease-in-out infinite;
}

@keyframes progress {
	0% {
		left: -30%;
	}
	100% {
		left: 100%;
	}
}

button {
	padding: 0.5rem 1rem;
	background-color: #1890ff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

button:disabled {
	background-color: #d9d9d9;
	cursor: not-allowed;
}

.summary {
	padding: 1rem;
	border-radius: 4px;
}
</style>
