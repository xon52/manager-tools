<template>
	<!-- <FloatLabel>
		<InputText
			v-model="modelValue"
			id="inputtext"
			:invalid="required && modelValue === ''" />
		<label for="inputtext">{{ props.label }}</label>
	</FloatLabel> -->
	<div class="flex flex-col gap-2">
		<label :for="`${uid}-input`">{{ props.label }}: </label>
		<InputText
			:id="`${uid}-input`"
			v-model="modelValue"
			:aria-describedby="`${uid}-help`" />
		<small
			:id="`${uid}-help`"
			v-if="help">
			{{ help }}
		</small>
	</div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const { uid } = getCurrentInstance()!;
const modelValue = defineModel<string>();
const props = defineProps<{
	label: string;
	required?: boolean;
	help?: string;
}>();
</script>
