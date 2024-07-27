<template>
	<FloatLabel>
		<AutoComplete
			v-model="modelValue"
			dropdown
			class="w-full"
			:suggestions="suggestions.length > 0 ? suggestions : undefined"
			:id="`${uid}-input`"
			@complete="search"
			:loading="false"
			:invalid="required && modelValue === ''"
			:emptySearchMessage="props.emptyMessage" />
		<label :for="`${uid}-input`">{{ props.label }}</label>
	</FloatLabel>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue';

const { uid } = getCurrentInstance()!;

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
