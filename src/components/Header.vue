<template>
    <div style="height: 50px;width: 100%; line-height: 50px;display: flex;background-color: #545c64;">
        <div style="width: 200px;padding-left: 30px;font-weight: bold;color: white;">崴崴市场后台管理</div>
        <div style="flex: 1"></div>
        <div style="width: 100px;">
            <el-dropdown>
                <span class="el-dropdown-link" style="color:white;">{{ user.nickName }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="$router.push('/person')">关于</el-dropdown-item>
                        <el-dropdown-item @click="$router.push('/login')">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            user: {},
        }
    },
    created() {
        let str = sessionStorage.getItem("user") || "{}";
        this.user = JSON.parse(str);
    },
    methods: {

    }
}
</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>