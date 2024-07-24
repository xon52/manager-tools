<template>
	<FloatLabel>
		<AutoComplete
			v-model="modelValue"
			dropdown
			:suggestions="suggestions"
			inputId="ac"
			@complete="search"
			:delay="1000"
			:invalid="required && modelValue === ''" />
		<label for="ac">{{ props.label }}</label>
	</FloatLabel>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import FloatLabel from 'primevue/floatlabel';

const modelValue = defineModel<string>();

const props = defineProps<{
	options: string[];
	label?: string;
	required?: boolean;
}>();

const emit = defineEmits<{ (e: 'update', value: string): void }>();

const suggestions = ref<string[]>([]);

const search = (event: any) => {
	const canSearch = event.query && event.query.length > 2;
	console.log('canSearch', canSearch);
	console.log('event.query', event.query);
	suggestions.value = canSearch
		? props.options.filter((option) => option.toLowerCase().includes(event.query.toLowerCase()))
		: props.options;
	console.log('suggestions', suggestions.value);
	return;
};
</script>
