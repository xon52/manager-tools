<template>
	<div>
		<p>Word count: {{ `${output ? '' : '~'}` + new Intl.NumberFormat().format(input.split(' ').length) }}</p>
		<p>Tokens: {{ `${output ? '' : '~'}` + new Intl.NumberFormat().format(tokens) }}</p>
		<p>
			Cost:
			{{
				`${output ? '' : '~'}` +
				new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3 }).format(cost)
			}}
		</p>
	</div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import gptEstimate from '@/helpers/gptEstimate';

const props = defineProps<{ input: string; output?: string }>();
const { input, output } = toRefs(props);

const guessOutputInputRatio = 0.5;
const tokens = ref(0);
const cost = ref(0);

const prepare = async () => {
	const _gptEstimate = gptEstimate(input.value, output.value);
	if (output.value) {
		tokens.value = _gptEstimate.totalTokens;
		cost.value = _gptEstimate.totalCost;
	} else {
		tokens.value = _gptEstimate.inputTokens * (1 + guessOutputInputRatio);
		cost.value = _gptEstimate.inputCost * (1 + guessOutputInputRatio);
	}
};

watch(props, prepare, { immediate: true });
</script>
