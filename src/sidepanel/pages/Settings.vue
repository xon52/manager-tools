<template>
	<Card>
		<!-- Content -->
		<template #content>
			<Fieldset legend="API details">
				<MyAutoComplete
					v-model="aiModel"
					label="AI Model"
					required
					:options="modelOptions" />
				<MyInput
					v-model="apiKey"
					label="API Key"
					required />
			</Fieldset>
		</template>
		<!-- Footer -->
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
import { computed, ref } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';
import modelList from '@/data/models';
import MyAutoComplete from '@/components/MyAutoComplete.vue';
import MyInput from '@/components/MyInput.vue';
import Button from 'primevue/button';
import Fieldset from 'primevue/fieldset';
import Card from 'primevue/card';

const store = useStore();
const router = useRouter();

const modelOptions = modelList.map((m) => m.value);

const aiModel = ref(store.getAiModel);
const apiKey = ref(store.getApiKey);

const canSave = computed(() => aiModel.value !== store.getAiModel);
const canCancel = computed(() => !!aiModel.value);

const save = () => {
	store.setAiModel(aiModel.value);
	router.push('/chat');
};
const cancel = () => {
	router.push('/chat');
};
</script>
