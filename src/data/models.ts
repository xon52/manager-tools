interface ModelType {
	family: string;
	label: string;
	value: string;
	inputCost: number;
	outputCost: number;
	disabled?: boolean;
}

const models: ModelType[] = [
	{
		family: 'Anthropic',
		label: 'Claude 3.5 Sonnet',
		value: 'claude-3-5-sonnet-20240620',
		inputCost: 3,
		outputCost: 15,
	},
	{
		family: 'Anthropic',
		label: 'Claude 3 Opus',
		value: 'claude-3-opus-20240229',
		inputCost: 15,
		outputCost: 75,
	},
	{
		family: 'Anthropic',
		label: 'Claude 3 Sonnet',
		value: 'claude-3-sonnet-20240229',
		inputCost: 3,
		outputCost: 15,
	},
	{
		family: 'Anthropic',
		label: 'Claude 3 Haiku',
		value: 'claude-3-haiku-20240307',
		inputCost: 0.25,
		outputCost: 1.25,
	},
	{
		family: 'OpenAI',
		label: 'GPT-4o',
		value: 'gpt-4o-2024-05-13',
		inputCost: 5,
		outputCost: 15,
	},
	{
		family: 'OpenAI',
		label: 'GPT-4o mini',
		value: 'gpt-4o-mini-2024-07-18',
		inputCost: 0.15,
		outputCost: 0.6,
	},
	{
		family: 'OpenAI',
		label: 'GPT-3.5 Turbo',
		value: 'gpt-3.5-turbo-0125',
		inputCost: 0.5,
		outputCost: 1.5,
	},
];

export default models;
