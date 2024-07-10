<script setup>
import { ref, computed, onMounted } from 'vue';

import DkColorPicker from '@/components/DkColorPicker.vue';
import DkButton from '@/components/DkButton.vue';
import DkForm from '@/components/DkForm.vue';

const props = defineProps({
    closeModal: Function,
    widgetData: Object,
});

const modalStep = ref(0);
const selectedColor = ref(null);
const sideImage = ref(props.widgetData.sideImage);

const colorData = computed(() => props.widgetData.vehicleColors.external);

const handleCloseModal = () => {
    props.closeModal();
};

const handleNextStep = () => {
    modalStep.value++;
};

const onColorSelection = (index) => {
    selectedColor.value = colorData.value[index];
	sideImage.value = selectedColor.value.colorImage.image800;
};

onMounted(() => {
	selectedColor.value = colorData.value[0];
	sideImage.value = selectedColor.value.colorImage.image800;
});
</script>

<template>
    <div class="dk-modal tw-max-h-full tw-overflow-auto tw-bg-white md:tw-rounded-lg tw-p-4 max-md:tw-fixed max-md:tw-left-0 max-md:tw-top-0 max-md:tw-w-full max-md:tw-h-screen">
        <div v-if="modalStep === 0" class="dk-modal__step md:tw-w-[528px]">
            <header class="dk-modal__header tw-sticky -tw-top-4 tw-z-10 -tw-mt-4 -tw-ml-4 -tw-mr-4 tw-p-4 tw-bg-white">
                <h1 class="dk-modal__title tw-text-blue-100 tw-font-bold tw-text-[22px] md:tw-text-2xl tw-mb-1 tw-pr-6">{{ widgetData.labelModalStep1Title }}</h1>
                <h2 class="dk-modal__subtitle tw-text-gray-base tw-text-xs">{{ widgetData.labelModalStep1Subtitle }}</h2>
                <button class="tw-absolute tw-top-4 tw-right-4" @click="handleCloseModal()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
                            fill="#141414" />
                    </svg>
                </button>
            </header>
            <main>
                <img :src="sideImage" alt="car-side" class="tw-block tw-mb-4 tw-max-h-[156px] tw-mx-auto">
                <DkColorPicker :colors="colorData" :show-color-name="false" :size="'s'" class="tw-block tw-mb-2" @item-click="onColorSelection" />
                <p class="dk-modal__color-disclaimer tw-text-[8px] tw-text-center tw-text-gray-base">{{ widgetData.labelModalColorDisclaimer }}</p>

                <DkForm :widget-data="widgetData" @submit-complete="handleNextStep()" @api-error="handleApiError()" />
            </main>
        </div>
        <div v-if="modalStep === 1" class="dk-modal__step md:tw-w-[528px]">
            <header class="dk-modal__header">
                <div class="tw-flex tw-items-center tw-gap-2 tw-mb-1">
                    <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1747_2969)">
                            <path
                                d="M18 3.5C9.72 3.5 3 10.22 3 18.5C3 26.78 9.72 33.5 18 33.5C26.28 33.5 33 26.78 33 18.5C33 10.22 26.28 3.5 18 3.5ZM13.935 24.935L8.55 19.55C7.965 18.965 7.965 18.02 8.55 17.435C9.135 16.85 10.08 16.85 10.665 17.435L15 21.755L25.32 11.435C25.905 10.85 26.85 10.85 27.435 11.435C28.02 12.02 28.02 12.965 27.435 13.55L16.05 24.935C15.48 25.52 14.52 25.52 13.935 24.935Z"
                                fill="#66CC6B" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1747_2969">
                                <rect width="36" height="36" fill="white" transform="translate(0 0.5)" />
                            </clipPath>
                        </defs>
                    </svg>

                    <h1 class="dk-modal__title tw-text-blue-100 tw-font-bold tw-text-[22px] md:tw-text-2xl tw-mb-1">{{ widgetData.labelModalStep2Title }}</h1>
                </div>
				<h2 class="dk-modal__subtitle tw-text-gray-base tw-text-xs">{{ widgetData.labelModalStep2Subtitle }}</h2>
            </header>
            <hr class="tw-my-4 tw-border-solid tw-border-t tw-border-gray" />
            <div class="dk-modal__car-info tw-text-black tw-flex tw-justify-between tw-items-end">
                <div>
                    <h2 class="dk-widget__make tw-mb-1 tw-text-2xs tw-uppercase">{{ widgetData.make }}</h2>
                    <h1 class="dk-widget__model tw-text-base tw-font-bold">{{ widgetData.model }}</h1>
                </div>
                <div v-if="selectedColor" class="tw-text-gray-base">
                    <span class="tw-text-[8px] tw-mr-1">Color:</span>
                    <span class="tw-text-2xs tw-font-bold">{{ selectedColor.description }}</span>
                </div>
            </div>
            <img :src="widgetData.sideImage" alt="car-side" class="tw-block tw-mb-8 tw-max-h-[156px] tw-mx-auto">
            <DkButton
                class="dk-widget__cta"
                @click="handleCloseModal()">
                {{ widgetData.labelConfirm }}
            </DkButton>
        </div>
    </div>
</template>
