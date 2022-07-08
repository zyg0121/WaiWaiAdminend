<template>
  <el-menu style="width: 200px;min-height: calc(100vh - 50px);" :uniqueOpened="true" default-active="/welcome"
    class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="rgb(64, 158, 255)"
    router>
    <el-menu-item index="/welcome">概览</el-menu-item>
    <el-menu-item index="/goods">商品管理</el-menu-item>
	<el-menu-item index="/user">用户管理</el-menu-item>
	<el-menu-item index="/order">订单管理</el-menu-item>
	<el-menu-item index="/want">“我想要”管理</el-menu-item>
	<el-menu-item index="/category">商品种类管理</el-menu-item>
	<el-menu-item index="/feedback">反馈管理</el-menu-item>
  </el-menu>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Aside",
  data() {
    return {
      user: {},
    }
  },
  created() {
    let userStr = sessionStorage.getItem("user") || '{}';
    this.user = JSON.parse(userStr);
  },
  methods: {

  }
}
</script>

<style scoped>
</style>