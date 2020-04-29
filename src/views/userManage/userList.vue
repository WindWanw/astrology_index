<template>
    <div class="not-found">
        <div v-if="get(102)">
            123
        </div>
        <div v-else>
            231212
        </div>
    </div>
</template>

<script>
    export default {
        name: "userList",
        data() {
            return {}
        },
        computed: {

        },
        methods: {
            get(item){
                if(item==12){
                    return true;
                }

                return false;
            }
        },
        created() {

        }
    }
</script>
