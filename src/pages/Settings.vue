<template>
	<Card>
		<!-- Content -->
		<template #content>
			<Accordion value="0">
				<AccordionPanel value="0">
					<!-- GPT -->
					<AccordionHeader title="Use your own details and modify some of the parameters">
						GPT Model Settings
					</AccordionHeader>
					<AccordionContent>
						<div class="grid gap-y-7 pt-4">
							<MyAutoComplete
								v-model="aiModel"
								label="AI Model"
								required
								:options="modelOptions" />
							<MyInput
								label="API Key"
								v-model="apiKey"
								required />
						</div>
					</AccordionContent>
				</AccordionPanel>
			</Accordion>
		</template>
		<!-- Footer -->
		<template #footer>
			<div class="flex justify-around mt-4">
				<Button
					@click="save"
					severity="primary">
					Save
				</Button>
				<Button
					@click="cancel"
					severity="secondary">
					Cancel
				</Button>
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores';
import { useRouter } from 'vue-router';
import modelList from '@/data/models';
import MyAutoComplete from '@/components/MyAutoComplete.vue';
import MyInput from '@/components/MyInput.vue';
import { storeToRefs } from 'pinia';

const store = useSettingsStore();
const router = useRouter();

const modelOptions = modelList.map((m) => m.value);

const { aiModel, apiKey } = storeToRefs(store);

const save = () => {
	store.setAiModel(aiModel.value);
	store.setApiKey(apiKey.value);
	router.push('/summary');
};
const cancel = () => {
	router.push('/summary');
};
</script>
