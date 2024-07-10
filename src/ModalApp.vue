<script setup>
import { computed } from 'vue';
import { container as WidgetContainerModal } from "jenesius-vue-modal";
import { openModal, closeModal } from "jenesius-vue-modal";
import { getJsonDataFromScript } from '@/utils/get-json';

import DkModal from './components/DkModal.vue';

const props = defineProps({
	widgetDataProp: Object,
});

const widgetDataJson = getJsonDataFromScript('#dk-widget-data');
const widgetData = computed(() => props.widgetDataProp ?? widgetDataJson);

const handleOpenModal = async () => {
	await openModal(DkModal, {
		closeModal,
		widgetData,
	});
}

window.openDkModal = handleOpenModal;
</script>

<template>
	<WidgetContainerModal />
</template>
