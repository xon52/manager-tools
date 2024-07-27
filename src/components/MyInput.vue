<template>
	<div>
		<FloatLabel>
			<InputText
				v-model="modelValue"
				:id="`${uid}-input`"
				:invalid="required && modelValue === ''"
				class="w-full" />
			<label :for="`${uid}-input`">{{ props.label }}</label>
		</FloatLabel>
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
