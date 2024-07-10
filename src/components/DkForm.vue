<script setup>
import { ref, computed } from 'vue';
import { apiService } from '@/api.js';

import DkCheckbox from '@/components/DkCheckbox.vue';
import DkButton from '@/components/DkButton.vue';
import DkNotification from '@/components/DkNotification.vue';

const { widgetData } = defineProps({
	widgetData: Object,
});

const emits = defineEmits(['submit-complete', 'api-error']);

const form = {
	name: ref(''),
	surname: ref(''),
	email: ref(''),
	telephone: ref(''),
	zip: ref(''),
	marketingCheck: ref(''),
};

const errors = ref({});
const isFormLoading = ref(false);
const isFormValid = ref(false);

const isNameValid = computed(() => form.name.value.trim() !== '');
const isSurenameValid = computed(() => form.surname.value.trim() !== '');
const isEmailValid = computed(() => form.email.value.trim() !== '');
const isPhoneValid = computed(() => form.telephone.value.trim() !== '');
const isZipValid = computed(() => form.zip.value.trim() !== '');

const hasGenericError = ref(false);

const validateField = (fieldName) => {
	delete errors.value[fieldName];

	switch (fieldName) {
		case 'name':
			if (!isNameValid.value) {
				errors.value.name = widgetData.labelRequiredFields ?? 'Required';
				isFormValid.value = false;
				break;
			}

			isFormValid.value = true;
			break;
		case 'surname':
			if (!isSurenameValid.value) {
				errors.value.surname = widgetData.labelRequiredFields ?? 'Required';
				isFormValid.value = false;
				break;
			}

			isFormValid.value = true;
			break;
		case 'email':
			if (!isEmailValid.value) {
				errors.value.email = widgetData.labelRequiredFields ?? 'Required';
				isFormValid.value = false;
				break;
			}

			if (!form.email.value.includes('@')) {
				errors.value.email = widgetData.labelEmailInvalid ?? 'Required';
				isFormValid.value = false;
				break;
			}

			isFormValid.value = true;
			break;
		case 'telephone':
			if (!isPhoneValid.value) {
				errors.value.telephone = widgetData.labelRequiredFields ?? 'Required';
				isFormValid.value = false;
				break;
			}

			isFormValid.value = true;
			break;
		case 'zip':
			if (!isZipValid.value) {
				errors.value.zip = widgetData.labelRequiredFields ?? 'Required';
				isFormValid.value = false;
				break;
			}

			isFormValid.value = true;
			break;
	}
};

const validateForm = () => {
	errors.value = {}; // Clear previous errors

	['name', 'surname', 'email', 'telephone', 'zip'].forEach((fieldName) => {
		validateField(fieldName);
	});

	if (Object.keys(errors.value).length !== 0) {
		isFormValid.value = false;
		return false;
	}

	isFormValid.value = true;
	return true;
}

const submitForm = async () => {
	if (!validateForm()) {
		return;
	}

	const theForm = document.getElementById('the-form');
	const formData = new FormData(theForm);

	const formDataObject = {};
	formData.forEach((value, key) => formDataObject[key] = value);

	hasGenericError.value = false;

	isFormLoading.value = true;
	apiService.sendLeadData(formDataObject).then((response) => {
		// If the response is null from
		// previous step, submit is complete.
		if (!response) {
			emits('submit-complete');
			return;
		};

		// If the reponse code is 422
		// there are valitation errors
		if (response.code === 422) {
			Object.keys(response.data).forEach(errorKey => {
				// The validation errors are in the form
				// 0: errorObj
				// 1: errorObj
				// so the key of the error is numeric.
				if (isNaN(errorKey)) {
					return;
				}

				const errorData = response.data[errorKey];
				errors.value[errorData.param] = errorData.message;
			});

			return;
		}

		throw new Error();
	}).catch(() => {
		hasGenericError.value = true;
	}).finally(() => {
		isFormLoading.value = false;
	});
};
</script>

<template>
	<form id="the-form" action="#" @submit.prevent="submitForm()" class="dk-form tw-mt-6 tw-flex tw-flex-col tw-gap-3">
		<DkNotification v-if="hasGenericError" class="tw-mt-6" :title="widgetData.labelFormErrorTitle"
			:body="widgetData.labelFormErrorSubtitle" :is-inline="true" />
		<div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4">
			<div class="tw-w-full">
				<input name="dkwp[name]" v-model="form.name.value" type="text" :placeholder="widgetData.labelName"
					class="tw-w-full tw-p-3 tw-text-sm tw-border tw-border-solid tw-border-slate-600"
					:class="{ 'tw-border-red': errors.name }" @blur="validateField('name')">
				<p v-if="errors.name" class="tw-mt-1 tw-text-2xs tw-text-red">{{ errors.name }}</p>
			</div>
			<div class="tw-w-full">
				<input name="dkwp[surname]" v-model="form.surname.value" type="text"
					:placeholder="widgetData.labelSurname"
					class="tw-w-full tw-p-3 tw-text-sm tw-border tw-border-solid tw-border-slate-600"
					:class="{ 'tw-border-red': errors.surname }" @blur="validateField('surname')">
				<p v-if="errors.surname" class="tw-mt-1 tw-text-2xs tw-text-red">{{ errors.surname }}</p>
			</div>
		</div>
		<div>
			<input name="dkwp[email]" v-model="form.email.value" type="email" :placeholder="widgetData.labelEmail"
				class="tw-w-full tw-p-3 tw-text-sm tw-border tw-border-solid tw-border-slate-600"
				:class="{ 'tw-border-red': errors.email }" @blur="validateField('email')">
			<p v-if="errors.email" class="tw-mt-1 tw-text-2xs tw-text-red">{{ errors.email }}</p>
		</div>
		<div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4">
			<div class="tw-w-full">
				<input name="dkwp[telephone]" v-model="form.telephone.value" type="text"
					:placeholder="widgetData.labelPhone"
					class="tw-w-full tw-p-3 tw-text-sm tw-border tw-border-solid tw-border-slate-600"
					:class="{ 'tw-border-red': errors.telephone }" @blur="validateField('telephone')">
				<p v-if="errors.telephone" class="tw-mt-1 tw-text-2xs tw-text-red">{{ errors.telephone }}</p>
			</div>
			<div class="tw-w-full">
				<input name="dkwp[zip]" v-model="form.zip.value" type="text" :placeholder="widgetData.labelZip"
					class="tw-w-full tw-p-3 tw-text-sm tw-border tw-border-solid tw-border-slate-600"
					:class="{ 'tw-border-red': errors.zip }" @blur="validateField('zip')">
				<p v-if="errors.zip" class="tw-mt-1 tw-text-2xs tw-text-red">{{ errors.zip }}</p>
			</div>
		</div>

		<div class="tw-mt-3 tw-text-black">
			<p class="tw-text-2xs">{{ widgetData.labelRequiredFields }}</p>
			<p class="tw-text-[8px] tw-my-3">{{ widgetData.labelPrivacyInfo }}</p>
		</div>

		<div class="dk-form__privacy">
			<DkCheckbox v-for="flag in widgetData.privacyFlags" :key="`flag-${flag.name}`" :id="flag.name"
				:name="flag.name" :required="flag.required" @blur="flag.required ? validateForm() : null">
				<span class="tw-text-[8px] tw-text-gray-base" v-html="flag.label"></span>
			</DkCheckbox>
		</div>
		<DkButton class="dk-form__cta" type="submit" :disabled="!isFormValid">
			{{ widgetData.labelWidgetCta }}
		</DkButton>

		<input v-for="hiddenField in Object.keys(widgetData.hiddenFieldsForm).filter(hf => hf.includes('dkwp['))"
			:key="hiddenField" :name="hiddenField" :value="widgetData.hiddenFieldsForm[hiddenField]" type="hidden">

		<div v-if="isFormLoading"
			class="dk-form__loader tw-absolute tw-z-10 tw-top-0 tw-left-0 tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-bg-slate-50 tw-bg-opacity-50">
			<span class="the-loader"></span>
		</div>
	</form>
</template>

<style scoped>
.dk-modal__privacy :deep(a) {
	text-decoration: underline;
}
</style>
