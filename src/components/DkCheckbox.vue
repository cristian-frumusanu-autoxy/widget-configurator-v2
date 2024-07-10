<template>
    <div class="tw-flex tw-items-center" :class="wrapperClasses">
        <input :id="id" type="checkbox" :name="id" :checked="value || checked" :disabled="disabled"
            class="tw-relative tw-inline-grid tw-place-content-center tw-bg-white tw-appearance-none tw-h-6 tw-w-6 tw-shrink-0 tw-mr-2 tw-border tw-border-brand-secondary checked:tw-bg-slate-900 checked:tw-border-slate-900 checked:before:tw-content-[''] checked:before:tw-w-[7px] checked:before:tw-h-[13px] checked:before:tw-border-r checked:before:tw-border-b checked:before:tw-border-solid checked:before:tw-border-b-white checked:before:tw-border-r-white checked:before:tw-rotate-45 checked:before:tw-translate-y-[-2px] indeterminate:tw-bg-slate-900 indeterminate:before:tw-absolute indeterminate:before:tw-top-2/4 indeterminate:before:tw-bg-white indeterminate:before:-tw-translate-y-2/4 indeterminate:before:tw-content-[''] indeterminate:before:tw-left-[15%] indeterminate:before:tw-w-[70%] indeterminate:before:tw-h-[1px] hover:tw-border-slate-900 focus:tw-ring-1 focus:tw-ring-offset-1 focus:tw-ring-slate-900 focus:tw-outline-none disabled:tw-border-slate-300 disabled:checked:tw-bg-slate-300 tw-peer"
            :class="classes" @change="handleChange">
        <label :for="id" class="peer-disabled:tw-text-slate-300" :class="labelClasses">{{ label }}</label>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'DKCheckbox',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        /** Checkbox ID */
        id: {
            type: String,
            required: true,
        },
        /** Is checkbox checked */
        checked: {
            type: Boolean,
            default: false,
        },
        /** Is checkbox checked */
        disabled: {
            type: Boolean,
            default: false,
        },
        /** Checkbox label */
        label: {
            type: String,
            default: null,
        },
        /** Checkbox extra classes */
        classes: {
            type: String,
            default: null,
        },
        /** Checkbox wrapper extra classes */
        wrapperClasses: {
            type: String,
            default: null,
        },
        /** Checkbox label extra classes */
        labelClasses: {
            type: String,
            default: null,
        },
    },
    methods: {
        handleChange(e) {
            this.$emit('update:modelValue', e.target.checked);
        },
    },
};
</script>
