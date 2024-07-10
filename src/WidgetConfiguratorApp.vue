<script setup>
import { computed, ref } from 'vue';
import { getJsonDataFromScript } from '@/utils/get-json';
import { apiService } from './api';

import DkButton from './components/DkButton.vue';
import DkNotification from './components/DkNotification.vue';
import WidgetApp from './WidgetApp.vue';
import WidgetCode from './WidgetCode.vue';

const widgetConfiguratorData = getJsonDataFromScript('#dk-widget-config-data');

window.publisherBaseURL = widgetConfiguratorData.publisherBaseURL;
window.widgetDataBaseURL = widgetConfiguratorData.widgetDataBaseURL;

const selectedMake = ref(null);
const selectedModel = ref(null);
const selectedVersion = ref(null);
const ctaText = ref(widgetConfiguratorData.defaultCta);
const widgetData = ref(null);
const isFormLoading = ref(null);

const showWidget = ref(false);
const hasError = ref(false);

const makes = ref(widgetConfiguratorData.makes);
const models = ref([]);
const versions = ref([]);

const isSelectModelDisabled = computed(() => {
	return !selectedMake.value;
});

const isSelectVersionDisabled = computed(() => {
	return !selectedModel.value;
});

const isSubmitDisabled = computed(() => {
	return !selectedModel.value;
});

const handleMakeChange = () => {
	selectedModel.value = null;
	selectedVersion.value = null;
	models.value = [];
	versions.value = [];
	fetchModels();
};

const handleModelChange = () => {
	selectedVersion.value = null;
	versions.value = [];
	fetchVersions();
};

const fetchModels = async () => {
	isFormLoading.value = true;

	try {
		const modelsData = await apiService.fetchModels(selectedMake.value.makeUrlCode);
		models.value = modelsData.models;
	} catch (error) {
		console.table(error);
		hasError.value = true;
		return Promise.reject();
	} finally {
		isFormLoading.value = false;
	}
};

const fetchVersions = async () => {
	isFormLoading.value = true;

	try {
		const versionsData = await apiService.fetchVersions(selectedMake.value.makeUrlCode, selectedModel.value.id);
		versions.value = versionsData.versions;
	} catch (error) {
		console.table(error);
		hasError.value = true;
		return Promise.reject();
	} finally {
		isFormLoading.value = false;
	}
};

const fetchWidgetData = async () => {
	isFormLoading.value = true;

	const vehicleHistoricalId = selectedVersion.value ? selectedVersion.value.vehicleHistoricalId : null;

	return apiService.fetchWidgetData(selectedMake.value.makeUrlCode, selectedModel.value.id, vehicleHistoricalId)
		.then(data => data)
		.catch((error) => {
			console.table(error);
			hasError.value = true;
			return Promise.reject();
		})
		.finally(() =>
			isFormLoading.value = false
		);
};

const handleSubmitForm = () => {
	fetchWidgetData()
		.then(response => {
			widgetData.value = {
				...response,
				labelWidgetCta: ctaText.value,
			};

			console.log(JSON.stringify(response));
			showWidget.value = true;
		});
};
</script>

<template>
	<div class="widget-config-app !tw-max-w-[680px] !tw-mx-auto tw-p-8 tw-rounded-xl">
		<h1 class="widget-config-app__title !tw-text-4xl !tw-mb-8">{{ widgetConfiguratorData.labelTitle }}</h1>
		<div class="widget-config-app__form-wrapper tw-relative">
			<form action="#" @submit.prevent="handleSubmitForm()" class="tw-flex tw-flex-col tw-gap-4">
				<div class="tw-flex tw-flex-col">
					<label for="select-make">{{ widgetConfiguratorData.labelMake }}</label>
					<select id="select-make" v-model="selectedMake" required
						class="tw-px-3 tw-py-2 tw-border tw-border-solid tw-border-slate-100 tw-rounded"
						@change="handleMakeChange()">
						<option v-for="(make, i) in makes" :key="i" :value="make">{{ make.makeName }}</option>
					</select>
				</div>
				<div class="tw-flex tw-flex-col">
					<label for="select-model">{{ widgetConfiguratorData.labelModel }}</label>
					<select id="select-model" v-model="selectedModel" required :disabled="isSelectModelDisabled"
						class="tw-px-3 tw-py-2 tw-border tw-border-solid tw-border-slate-100 tw-rounded"
						:class="{ 'tw-cursor-not-allowed': isSelectModelDisabled }" @change="handleModelChange()">
						<option v-for="(model, i) in models" :key="i" :value="model">{{ model.name }}</option>
					</select>
				</div>
				<div class="tw-flex tw-flex-col">
					<label for="select-version">{{ widgetConfiguratorData.labelVersion }}</label>
					<select id="select-version" v-model="selectedVersion" :disabled="isSelectVersionDisabled"
						class="tw-px-3 tw-py-2 tw-border tw-border-solid tw-border-slate-100 tw-rounded"
						:class="{ 'tw-cursor-not-allowed': isSelectVersionDisabled }">
						<option v-for="(version, i) in versions" :key="i" :value="version">{{ version.name }}</option>
					</select>
				</div>
				<div class="tw-flex tw-flex-col">
					<label for="cta-text">CTA</label>
					<input v-model="ctaText" type="text" class="tw-px-3 tw-py-2 tw-border tw-border-solid tw-border-slate-100 tw-rounded">
				</div>
				<DkButton type="submit" :disabled="isSubmitDisabled"
					:class="{ 'tw-cursor-not-allowed': isSubmitDisabled }">
					{{ widgetConfiguratorData.labelCreate }}
				</DkButton>
			</form>

			<div v-if="isFormLoading"
				class="wiget-config-app__loader tw-absolute tw-z-10 tw-top-0 tw-left-0 tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-bg-slate-50 tw-bg-opacity-50">
				<span class="the-loader"></span>
			</div>
		</div>

		<div v-if="showWidget" class="widget-container tw-flex !tw-mt-10 tw-gap-4 tw-items-center">
			<WidgetApp :widget-data-prop="widgetData" class="tw-shrink-0 tw-outline-dashed" />
			<WidgetCode :widget-data="widgetData" />
		</div>
		<DkNotification v-else-if="hasError" class="tw-mt-6" :title="'API Error'"
			:body="'There was a problem with the API, please try again'" :is-inline="true" />
	</div>
</template>
