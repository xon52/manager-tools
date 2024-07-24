<template>
	<div>
		{{ modelName }}
		<AutoComplete
			v-model="modelName"
			label="Current AI Modelz"
			:options="modelOptions" />
		<button @click="updateModel">Update Model 2</button>
	</div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';
import modelList from '@/data/models';
import AutoComplete from '@/components/AutoComplete.vue';

const store = useStore();
const router = useRouter();
const modelName = ref('claude-3-sonnet-20240229');
const modelOptions = modelList.map((group) => group.options.map((option) => option.value)).flat();

const updateModel = () => {
	store.setAiModel(modelName.value);
	modelName.value = '';
	router.push('/chat');
};
</script>
