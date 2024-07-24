<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
	ComboboxAnchor,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxRoot,
	ComboboxTrigger,
	ComboboxViewport,
} from 'radix-vue';

const modelValue = defineModel<string>();

const props = defineProps<{
	options: string[];
	placeholder?: string;
}>();

const emit = defineEmits<{ (e: 'update', value: string): void }>();
</script>

<template>
	<ComboboxRoot
		class="relative"
		v-model="modelValue">
		<ComboboxAnchor
			class="min-w-[160px] inline-flex items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-grass11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-grass9 outline-none">
			<ComboboxInput
				class="!bg-transparent outline-none text-grass11 h-full selection:bg-grass5 placeholder-mauve8"
				:placeholder="props.placeholder" />
			<ComboboxTrigger>
				<Icon
					icon="radix-icons:chevron-down"
					class="h-4 w-4 text-grass11" />
			</ComboboxTrigger>
		</ComboboxAnchor>

		<ComboboxContent
			class="absolute z-10 w-full mt-2 min-w-[160px] bg-white overflow-hidden rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
			<ComboboxViewport class="p-[5px]">
				<ComboboxEmpty class="text-mauve8 text-xs font-medium text-center py-2" />

				<template v-for="option in props.options">
					<ComboboxItem
						:key="option"
						v-for="(key, val) in options"
						class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1"
						:value="val">
						<span>
							{{ key }}
						</span>
					</ComboboxItem>
				</template>
			</ComboboxViewport>
		</ComboboxContent>
	</ComboboxRoot>
</template>
