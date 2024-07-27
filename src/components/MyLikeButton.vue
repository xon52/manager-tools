<template>
	<Button
		icon="pi pi-heart-fill"
		title="Like"
		:severity="isActive ? 'danger' : 'secondary'"
		text
		aria-label="Like"
		@click="like" />
	<Dialog
		v-model:visible="isVisible"
		modal
		header="Thank you! ❤️"
		:draggable="false"
		dismissableMask
		:closable="false"
		position="topright">
		<div class="flex flex-col">
			<p class="text-surface-500 dark:text-surface-400 block mb-8">Please share this to someone or somewhere 🙏</p>
			<InputGroup>
				<InputText
					:value="link"
					@click="copy"
					readonly
					class="w-[25rem]" />
				<InputGroupAddon>
					<i
						@click="copy"
						class="pi pi-copy"></i>
				</InputGroupAddon>
			</InputGroup>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const link = 'mylink';
const isVisible = ref(false);
const isCopied = ref(false);
const isActive = ref(false);

const like = () => {
	isVisible.value = true;
	isActive.value = true;
};

const copy = () => {
	navigator.clipboard.writeText(link);
	isCopied.value = true;
	setTimeout(() => {
		isCopied.value = false;
	}, 2000);
};
</script>
