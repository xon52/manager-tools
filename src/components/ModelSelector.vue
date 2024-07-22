<template>
	<select
		ref="selector"
		class="model-select"
		@change="selectModel">
		<option>Pre-loaded models</option>
		<option
			v-for="model in models"
			:key="model.label"
			:value="model.name"
			:disabled="model.disabled || model.isGroup"
			:class="{ 'is-group': model.isGroup }">
			{{ model.label }}
		</option>
	</select>
</template>

<script setup lang="ts">
type Model = {
	label: string;
	name: string;
	isGroup: boolean;
	disabled: boolean;
};

import modelList from '@/data/models';
import { onMounted, Ref, ref } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const selector: Ref<HTMLSelectElement | null> = ref(null);
const models: Ref<Model[]> = ref([]);

const selectModel = () => {
	alert(selector.value?.value);
	emit('update:modelValue', selector.value?.value);
	if (selector.value) selector.value.selectedIndex = 0;
};

onMounted(() => {
	modelList.forEach((group) => {
		models.value.push({
			label: group.label,
			name: group.label,
			isGroup: true,
			disabled: true,
		});
		group.options?.forEach((model) => {
			models.value.push({
				label: model.label,
				name: model.name,
				isGroup: false,
				disabled: model.disabled || false,
			});
		});
	});
});
</script>

<style scoped>
.model-select {
	background-color: var(--bg-default);
	border: 1px solid var(--muted);
}
.model-select[disabled] {
	color: var(--muted);
}
.model-select option:first-of-type {
	display: none;
}
.model-select option:hover {
	background-color: var(--bg-accent);
}
.is-group {
	font-weight: bold;
}
</style>
