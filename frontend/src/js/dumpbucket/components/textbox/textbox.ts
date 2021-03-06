export default {
    computed: {
        content: {
            get() {
                return this.$store.getters.dumpbucket_getContent;
            },

            set(value: string) {
                this.$store.dispatch('dumpbucket_setContent', value);
            },
        },

        editable: {
            get() {
                return this.$store.getters.dumpbucket_getEditable;
            },
        },
    },

    methods: {

        contentChanged(event: any) {

            this.content = event.target.innerText;
        },
    },
    
    mounted() {

        this.$el.innerText = this.content;
    },
};
