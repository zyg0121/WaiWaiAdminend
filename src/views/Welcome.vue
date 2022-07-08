<template>
    欢迎{{ username }}
</template>

<script>
import request from "@/utils/request";

export default {
    name: 'Welcome',
    components: {

    },
    data() {
        return {
            username: {},
            user: {}
        }
    },
    created() {
        let userStr = sessionStorage.getItem("user") || '{}';
        this.user = JSON.parse(userStr);
        console.log(userStr);
        this.load(userStr);
    },
    methods: {
        load(userStr) {
            var url = "/api/admin/selectById?adminid=" + userStr
            request.get(url).then(res => {
                console.log(res);
                this.username = res.data
                console.log(this.username)
            })
        },
    }
}
</script>
