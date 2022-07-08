<template>
    <div
        style="width: 100%;height: 100vh; background: linear-gradient(90deg,#3cadeb,#9c88ff);display: flex;justify-content: center;align-items: center">
        <div
            style="width: 300px; height: 380px;box-shadow: 0 5px 15px rgba(0, 0, 0, .8); display: flex;justify-content: center;align-items: center;">
            <el-form :model="form" size="normal" style="height: 100% ;width: 220px;" ref="form" :rules="rules">
                <div style="width: 100%;height: 40px;margin-top:10px;line-height: 40px;text-align: center">
                    <span style="color: white;font-weight: 900;font-size: 30px;">Login</span>
                </div>
                <el-form-item style="margin-top: 50px" prop="adminname">
                    <el-input v-model="form.adminname" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="adminpwd">
                    <el-input v-model="form.adminpwd" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        style="color: white; border-radius: 30px;width: 100%;height: 50px;background: linear-gradient(90deg,#3cadeb,#9c88ff);"
                        @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import request from "@/utils/request";
import axios from "axios";

export default {
    name: "Login",
    data() {
        return {
            form: {},
            rules: {
                adminname: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                adminpwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            }
        }
    },
    created() {
        sessionStorage.removeItem("user");
    },
    methods: {
        login() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    var url = "/api/admin/login?adminname="+ this.form.adminname +"&adminpwd=" + this.form.adminpwd
                    request.get(url).then(res => {
                        console.log(res);
                        if (res.state == '0') {
                            this.$message({
                                type: "success",
                                message: "登录成功"
                            })
                            console.log("res.data:" + res.data)
                            sessionStorage.setItem("user", JSON.stringify(res.data));//缓存用户信息
                            this.$router.push("/");//登录成功后的页面跳转
                        } else {
                            this.$message({
                                type: "error",
                                message: res.msg
                            })
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        }
    }
}
</script>

<style scoped>
</style>