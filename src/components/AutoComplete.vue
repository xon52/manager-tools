<template>
	<FloatLabel>
		<AutoComplete
			v-model="modelValue"
			dropdown
			:suggestions="suggestions.length > 0 ? suggestions : null"
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
import AutoComplete from 'primevue/autocomplete';
import FloatLabel from 'primevue/floatlabel';

const modelValue = defineModel<string>();

const props = defineProps<{
	options: string[];
	label?: string;
	emptyMessage?: string;
	required?: boolean;
}>();

const emit = defineEmits<{ (e: 'update', value: string): void }>();

const suggestions = ref<string[]>([]);

const search = (event: any) => {
	suggestions.value = props.options.filter((option) => option.toLowerCase().includes(event.query.toLowerCase()));
	return;
};
</script>
