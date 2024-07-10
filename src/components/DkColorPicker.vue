<template>
    <div class="dk-color-picker tw-flex tw-flex-col tw-items-center">
        <p v-if="showColorName" class="dk-color-picker__color-name body-md tw-mb-6">
            {{ currentColorName }}
        </p>
        <div class="dk-color-picker__thumbs tw-flex tw-justify-center tw-flex-wrap" :class="{ ...parentGapSize }"
            :style="parentWidth">
            <dk-color-thumb v-for="(color, index) in colorsToShow" :key="`thumb-${index}`" :class="thumbWidthClass"
                :color="color" :size="size" :is-selected="index === currentSelection"
                @select-color="updateCurrentSelection(index)" />
            <dk-color-thumb v-if="showMore" class="dk-color-picker__show-more" :class="thumbWidthClass" :size="size"
                :show-more="showMore" @show-more="showAllColors" />
        </div>
        <p v-if="text" class="dk-color-picker__disclaimer tw-text-2xs">
            {{ text }}
        </p>
    </div>
</template>

<script>
import DkColorThumb from './DkColorThumb.vue';

export default {
    name: 'DkColorPicker',
    components: {
        DkColorThumb,
    },
    props: {
        showColorName: {
            type: Boolean,
            default: true,
        },
        colors: {
            type: Array,
            required: true,
        },
        /**
         * Max number of initial colors to display, including 'show more'.
         */
        maxLanding: {
            type: Number,
            default: 5,
        },
        /**
         * Max number of colors per line after clicking on 'show more'.
         * Normally, it's 10 for desktop and 5 for mobile.
         */
        maxPerLine: {
            type: Number,
            default: 10,
        },
        /**
         * Available sizes: 's', 'l'.
         */
        size: {
            type: String,
            default: '',
        },
        /**
         * The text to show under the color picker.
         */
        text: {
            type: String,
            default: '',
        },
        /**
         * A flag to set to true when we want to show all available colors.
         */
        showAll: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            currentSelection: 0,
            colorsToShow: [],
            colorsToHide: [],
        };
    },
    computed: {
        showMore() {
            return this.showAll ? !this.showAll : this.colorsToHide.length > 0;
        },
        currentColorName() {
            return this.colors[this.currentSelection].description;
        },
        parentGapSize() {
            return this.size === 's' ? 'tw-gap-2' : 'tw-gap-4';
        },
        thumbWidthClass() {
            const thumbWidth = 100 / this.maxPerLine;
            return `tw-w-[${thumbWidth}%]`;
        },
        parentWidth() {
            const thumbWidthOnDesktop = 72;
            const thumbWidthOnMobile = 56;
            const gapOnDesktop = 16;
            const gapOnMobile = 8;

            const thumbWidth =
                this.size === 's' ? thumbWidthOnMobile * this.maxPerLine : thumbWidthOnDesktop * this.maxPerLine;
            const gapWith =
                this.size === 's' ? gapOnMobile * (this.maxPerLine - 1) : gapOnDesktop * (this.maxPerLine - 1);
            return { maxWidth: `${thumbWidth + gapWith}px` };
        },
    },
    created() {
        const areColorsToHide = this.showAll ? !this.showAll : this.colors.length > this.maxLanding;
        this.colorsToShow = areColorsToHide ? this.colors.slice(0, this.maxLanding - 1) : this.colors;
        this.colorsToHide = areColorsToHide ? this.colors.slice(this.colorsToShow.length) : [];
    },
    methods: {
        updateCurrentSelection(index) {
            this.currentSelection = index;
            this.$emit('item-click', index);
        },
        showAllColors() {
            this.colorsToShow = this.colorsToShow.concat(this.colorsToHide);
            this.colorsToHide = [];
        },
    },
};
</script>
