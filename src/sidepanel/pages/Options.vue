<template>
	<div>
		<p>Current AI Model: {{ store.getAiModel }}</p>
		<input
			v-model="modelName"
			placeholder="Enter new AI model" />
		<ModelSelectorVue
			:modelValue="modelName"
			@update:modelValue="(v) => (modelName = v)" />
		<button @click="updateModel">Update Model</button>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';
import ModelSelectorVue from '@/components/ModelSelector.vue';

const store = useStore();
const router = useRouter();
const modelName = ref('claude-3-sonnet-20240229');

const updateModel = () => {
	store.setAiModel(modelName.value);
	modelName.value = '';
	router.push('/chat');
};
</script>
