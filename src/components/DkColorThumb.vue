<template>
    <div class="dk-color-thumb" :class="parentSizeClass" @click="onClick">
        <div class="dk-color-thumb__icon tw-relative tw-flex tw-justify-center tw-items-center tw-rounded-full tw-outline tw-outline-offset-2 tw-outline-1 tw-outline-slate-300 hover:tw-outline-2 tw-cursor-pointer"
            :class="thumbClasses" :style="thumbStyle">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="showMore"
                class="dk-color-thumb__icon-svg">
                <path
                    d="M9 15C7.35 15 6 16.35 6 18C6 19.65 7.35 21 9 21C10.65 21 12 19.65 12 18C12 16.35 10.65 15 9 15ZM27 15C25.35 15 24 16.35 24 18C24 19.65 25.35 21 27 21C28.65 21 30 19.65 30 18C30 16.35 28.65 15 27 15ZM18 15C16.35 15 15 16.35 15 18C15 19.65 16.35 21 18 21C19.65 21 21 19.65 21 18C21 16.35 19.65 15 18 15Z"
                    fill="currentColor" />
            </svg>
        </div>
    </div>
</template>

<script>

export default {
    name: 'DkColorThumb',
    props: {
        /**
         * Array of strings with color variables.`
         */
        color: {
            type: Object,
            default: null,
        },
        /**
         * Available sizes: 's', 'l'.
         */
        size: {
            type: String,
            default: '',
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        showMore: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isCurrentSelection: this.isSelected,
        };
    },
    computed: {
        parentSizeClass() {
            let classes =
                'tw-relative tw-p-2 tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-300';

            if (this.size === 's') {
                classes += ' tw-w-14 tw-h-14';
            } else {
                classes += ' tw-w-14 tw-h-14 lg:tw-w-18 lg:tw-h-18';
            }

            if (this.isDisabled) {
                classes += ' tw-opacity-[.5] tw-pointer-events-none';
            }

            return classes;
        },
        thumbClasses() {
            let classes = '';

            if (this.isCurrentSelection) {
                classes += ' !tw-outline-2 !tw-outline-slate-500';
            }

            classes += this.size === 's' ? ' tw-w-10 tw-h-10' : ' tw-w-10 tw-h-10 lg:tw-w-14 lg:tw-h-14';

            return classes;
        },
        thumbStyle() {
            if (this.showMore) {
                return { backgroundColor: '#E2E5E9' };
            }

            if (this.color.primaryHex && !this.color.secondaryHex) {
                return { backgroundColor: `${this.color.primaryHex}` };
            }

            return {
                background: `linear-gradient(135deg, ${this.color.primaryHex} 0%, ${this.color.primaryHex} 50%, ${this.color.secondaryHex} 51%, ${this.color.secondaryHex} 100%)`,
            };
        },
    },
    watch: {
        isSelected(newValue) {
            this.isCurrentSelection = newValue;
        },
    },
    methods: {
        onClick() {
            if (this.showMore) {
                this.$emit('show-more');
            } else {
                this.isCurrentSelection = !this.isCurrentSelection;
                this.$emit('select-color');
            }
        },
    },
};
</script>
