<script setup>
import { computed, ref, onMounted } from 'vue';
import widgetScripts from './widget-scripts.js';

import IconCheckmark from './components/icons/IconCheckmark.vue';

const props = defineProps({
	widgetData: Object
});

const isSuccess = ref(false);
const isCopyPasteAvailable = window.isSecureContext;

const widgetData = computed(() => {
	return JSON.stringify(props.widgetData, null, 2);
});

const widgetDataScript = `<script type="application\/json" id="dk-widget-data">${widgetData.value}; window.widgetDataBaseURL="${window.widgetDataBaseURL}";<\/script>`;
const codeToCopy = widgetDataScript + widgetScripts;

const copyCodeToClipboard = () => {
	if (!isCopyPasteAvailable) return;

	window.navigator.clipboard.writeText(codeToCopy).then(
		() => isSuccess.value = true,
	);
};
</script>

<template>
	<div class="widget-copy-button-wrapper tw-w-full tw-flex tw-flex-col">
		<button @click="copyCodeToClipboard()" class="tw-block tw-py-2 tw-px-4 tw-outline-dashed tw-w-full"
			:disabled="!isCopyPasteAvailable">
			<span v-if="isSuccess === true" class="tw-flex tw-justify-center tw-items-center tw-gap-2">
				<span>Copied!</span>
				<IconCheckmark class="tw-w-6 tw-h-6" />
			</span>
			<template v-else>
				Copy widget code
			</template>
		</button>
		<p v-if="!isCopyPasteAvailable" class="tw-text-xs tw-text-center tw-mt-4 tw-italic">copy code not available because of
			security requirements — requires HTTPS</p>
	</div>
</template>
