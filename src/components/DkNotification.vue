<template>
    <div :class="notificationClasses">
        <div
            class="dk-notification__body tw-flex tw-text-2xs tw-mr-2"
            :class="{ 'tw-items-center': isInline, 'tw-flex-col': !isInline }"
        >
            <h6
                v-if="title"
                class="dk-notification__title tw-leading-2xs tw-font-semibold"
                :class="{ 'tw-mb-1': !isInline, 'tw-mr-2': isInline }"
            >
                {{ title }}
            </h6>
            <p
                v-if="body"
                class="dk-notification__description tw-leading-2xs"
                :class="{ 'tw-mt-1': !isInline }"
                v-html="body"
            ></p>
        </div>
        <button
            v-if="showDismiss"
            type="button"
            class="dk-notification__dismiss tw-inline-flex tw-ml-auto"
            @click="handleDismiss"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="tw-w-[20px] tw-h-[20px]"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: 'DkNotification',
    props: {
        title: {
            default: '',
            type: String,
        },
        body: {
            default: '',
            type: String,
        },
        isInline: {
            default: false,
            type: Boolean,
        },
        showDismiss: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isVisible: true,
        };
    },
    computed: {
        notificationClasses() {
            return [
                'dk-notification',
                'tw-flex',
                'tw-p-4',
                'tw-text-sm',
                'tw-border tw-border-solid',
                'tw-bg-bg-red tw-border-border-red',
                {
                    'tw-items-start': !this.isInline,
                    'tw-items-center': this.isInline,
                },
                { 'tw-hidden': !this.isVisible },
            ];
        },
    },
    methods: {
        handleDismiss() {
            this.isVisible = false;
            this.$emit('dismissed');
        },
    },
};
</script>
