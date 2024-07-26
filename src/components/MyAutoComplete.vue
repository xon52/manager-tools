<template>
	<FloatLabel>
		<AutoComplete
			v-model="modelValue"
			dropdown
			:suggestions="suggestions.length > 0 ? suggestions : undefined"
			inputId="ac"
			@complete="search"
			:loading="false"
			:invalid="required && modelValue === ''"
			:emptySearchMessage="props.emptyMessage" />
		<label for="ac">{{ props.label }}</label>
	</FloatLabel>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const modelValue = defineModel<string>();

const props = defineProps<{
	options: string[];
	label?: string;
	emptyMessage?: string;
	required?: boolean;
}>();

const suggestions = ref<string[]>([]);

const search = (event: any) => {
	suggestions.value = props.options.filter((option) => option.toLowerCase().includes(event.query.toLowerCase()));
	return;
};
</script>
