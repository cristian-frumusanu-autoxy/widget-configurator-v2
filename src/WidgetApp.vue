<script setup>
import { computed } from 'vue';
import { container as WidgetContainerModal } from "jenesius-vue-modal";
import { openModal, closeModal } from "jenesius-vue-modal";
import { getJsonDataFromScript } from '@/utils/get-json';

import DkModal from './components/DkModal.vue';
import DkButton from './components/DkButton.vue';
import LogoDriveK from './components/icons/LogoDriveK.vue';

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
</script>

<template>
	<div class="dk-widget tw-w-[300px] md:tw-h-[600px] tw-rounded-lg tw-overflow-hidden tw-flex tw-flex-col tw-bg-white"
		:class="{'!tw-font-sans': !!props.widgetDataProp}"
		v-bind="$attrs"
	>
		<img :src="widgetData.smallImageFrontSide" alt="mercedes"
			class="tw-block md:tw-hidden tw-max-w-[164px] tw-mx-auto">
		<img :src="widgetData.bigImageFrontSide" alt="mercedes" class="tw-hidden md:tw-block">
		<section class="dk-widget__body max-md:tw-pt-2 tw-p-4">
			<div
				class="dk-widget__model-info tw-flex tw-items-center tw-justify-between tw-overflow-hidden max-md:tw-mb-2">
				<div class="dk-widget_model-info-text tw-shrink-0 tw-max-w-full">
					<h2 class="dk-widget__make tw-mb-1 tw-text-2xs tw-uppercase">{{ widgetData.make }}</h2>
					<h1 class="dk-widget__model tw-text-base tw-font-bold tw-text-blue-100">{{ widgetData.model }}</h1>
				</div>
				<img :src="widgetData.logoImage" alt="make-logo" class="tw-w-[40px] tw-h-[40px]">
			</div>
			<hr class="max-md:tw-hidden tw-my-4 tw-border-solid tw-border-t tw-border-gray">
			<div class="dk-widget__pricing tw-flex tw-justify-between tw-items-center">
				<div class="tw-flex tw-flex-col tw-text-gray-base">
					<span class="dk-widget__pricing-label tw-text-2xs md:tw-text-xs tw-leading-2xs md:tw-leading-sm">{{ widgetData.labelPrice }}</span>
					<span class="dk-widget__pricing-vat tw-text-[8px]">{{ widgetData.labelVat }}</span>
				</div>
				<span class="dk-widget__price tw-text-sm md:tw-text-base tw-text-blue-100 tw-font-bold">{{ widgetData.price }}</span>
			</div>
			<DkButton class="dk-widget__cta tw-mt-2 md:!tw-mt-4 max-md:tw-h-8 max-md:!tw-py-0 max-md:!tw-text-sm"
				@click="handleOpenModal()">
				{{ widgetData.labelWidgetCta }}
			</DkButton>
		</section>
		<section
			class="dk-widget__body dk-widget__copy tw-p-4 tw-flex max-md:tw-hidden tw-flex-col tw-grow tw-bg-slate-50 tw-border tw-border-solid tw-border-slate-100 tw-text-center tw-rounded-br-lg tw-rounded-bl-lg">
			<h2 class="dk-widget__copy-title tw-text-black tw-font-bold tw-leading-base tw-mb-1">{{ widgetData.copyText1 }}</h2>
			<p class="dk-widget__copy-text tw-text-2xs tw-text-gray-base tw-leading-xs tw-mb-2">{{ widgetData.copyText2 }}</p>
			<a href="#" class="dk-widget__copy-link tw-text-xs tw-text-black tw-underline">{{ widgetData.copyText3 }}</a>
			<div class="dk-widget__copy-logo tw-flex tw-items-center tw-justify-center tw-gap-1 tw-mt-auto">
				<span class="tw-text-[8px] tw-text-gray-base">{{ widgetData.copyText4 }}</span>
				<LogoDriveK class="tw-h-[18px]" />
			</div>
		</section>
	</div>

	<WidgetContainerModal />
</template>
