<template>
	<Card>
		<template #title>Options</template>
		<template #content>
			{{ modelName }}
			<AutoComplete
				v-model="modelName"
				label="Current AI Model"
				:options="modelOptions" />
		</template>
		<template #footer>
			<div class="flex gap-4 mt-1">
				<Button
					@click="save"
					:disabled="!canSave"
					severity="primary">
					Save
				</Button>
				<Button
					@click="cancel"
					:disabled="!canSave"
					severity="secondary">
					Cancel
				</Button>
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';
import modelList from '@/data/models';
import AutoComplete from '@/components/AutoComplete.vue';
import Button from 'primevue/button';
import Card from 'primevue/card';

const store = useStore();
const router = useRouter();
const modelName = ref(store.getAiModel);
const modelOptions = modelList.map((m) => m.value);

const canSave = computed(() => modelName.value !== store.getAiModel);
const canCancel = computed(() => modelName.value === store.getAiModel);

const save = () => {
	store.setAiModel(modelName.value);
	router.push('/chat');
};
const cancel = () => {
	router.push('/chat');
};
</script>
