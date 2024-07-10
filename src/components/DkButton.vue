<template>
    <a
        v-if="href"
        :href="href"
        :target="target"
        :class="buttonClasses"
        role="button"
        v-bind="$attrs"
    >
        <slot></slot>
    </a>
    <button
        v-else
        v-bind="$attrs"
        :class="buttonClasses"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'DkButton',
    props: {
        href: {
            type: String,
            default: null,
        },
        target: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        buttonClasses() {
            let classes = '!tw-block !tw-w-full !tw-py-3 !tw-text-base !tw-bg-orange-100 !tw-text-center !tw-text-white !tw-uppercase !tw-font-bold hover:!tw-text-slate-901 focus:!tw-outline focus:!tw-outline-4 focus:!tw-outline-slate-902';

			if (this.disabled) {
				classes += ' tw-pointer-events-none !tw-bg-slate-200';
			}

            return classes;
        },
    },
};
</script>

<style></style>
