import { GPTTokens } from 'gpt-tokens';

const costPerMillionInputTokens = 3.0;
const costPerMillionOutputTokens = 3.0;

const gptCost = (input: string, output?: string) => {
	const inputInfo = new GPTTokens({ model: 'gpt-4o', messages: [{ role: 'user', content: input }] });
	const inputTokens = inputInfo.usedTokens;
	const inputCost = (inputInfo.usedTokens / 1000000) * costPerMillionInputTokens;

	let outputCost = 0;
	let outputTokens = 0;
	if (output) {
		const outputInfo = new GPTTokens({ model: 'gpt-4o', messages: [{ role: 'assistant', content: output }] });
		outputTokens = outputInfo.usedTokens;
		outputCost = (outputInfo.usedTokens / 1000000) * costPerMillionOutputTokens;
	}
	return {
		inputTokens,
		inputCost,
		outputTokens,
		outputCost,
		totalTokens: inputTokens + outputTokens,
		totalCost: inputCost + outputCost,
	};
};

export default gptCost;
