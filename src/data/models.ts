interface ModelType {
	label: string;
	value: string;
	inputCost: number;
	outputCost: number;
	disabled?: boolean;
}

interface ModelGroup {
	label: string;
	options: ModelType[];
}

const models: ModelGroup[] = [
	{
		label: 'Anthropic',
		options: [
			{
				label: 'Claude 3.5 Sonnet',
				value: 'claude-3-5-sonnet-20240620',
				inputCost: 3,
				outputCost: 15,
			},
			{
				label: 'Claude 3 Opus',
				value: 'claude-3-opus-20240229',
				inputCost: 15,
				outputCost: 75,
			},
			{
				label: 'Claude 3 Sonnet',
				value: 'claude-3-sonnet-20240229',
				inputCost: 3,
				outputCost: 15,
			},
			{
				label: 'Claude 3 Haiku',
				value: 'claude-3-haiku-20240307',
				inputCost: 0.25,
				outputCost: 1.25,
			},
		],
	},
	{
		label: 'Anthropic',
		options: [
			{
				label: 'GPT-4o',
				value: 'gpt-4o-2024-05-13',
				inputCost: 5,
				outputCost: 15,
			},
			{
				label: 'GPT-4o mini',
				value: 'gpt-4o-mini-2024-07-18',
				inputCost: 0.15,
				outputCost: 0.6,
			},
			{
				label: 'GPT-3.5 Turbo',
				value: 'gpt-3.5-turbo-0125',
				inputCost: 0.5,
				outputCost: 1.5,
			},
		],
	},
];

export default models;
