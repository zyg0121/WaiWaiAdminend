<template>
    <div style="padding-left:10px; padding-right: 10px; width: calc(100vw - 200px)">
        <!--    功能趋于-->
        <!--<div style="margin: 10px 0">
            <el-button type="warning" plain @click="add">新增</el-button>
        </div>-->
        <!--    搜索区域-->
        <div style="margin: 10px 0">
            <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable></el-input>
            <el-button style="margin-left: 5px; background-color: #5defc1; color: white" @click="load" plain>查询
            </el-button>
        </div>
        <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column prop="categoryid" label="商品种类编号" sortable>
            </el-table-column>
            <el-table-column prop="categoryname" label="商品种类名称">
            </el-table-column>

            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <div style="display: flex; align-content: space-between">
                        <el-button @click="handleEdit(scope.row)" type="primary">编辑</el-button>
						<!--
                        <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.goodsid)">
                            <template #reference>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
						-->
                    </div>
                </template>
            </el-table-column>

        </el-table>



        <div style="margin: 10px 0">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage4" :page-sizes="[5, 10, 20]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
            <!--弹窗-->
            <el-dialog title="提示" v-model="dialogVisible" width="30%">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="商品种类名称">
                        <el-input v-model="form.categoryname"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="save">确 定</el-button>
                    </span>
                </template>
            </el-dialog>

        </div>
    </div>
</template>

<script>


import request from "@/utils/request";

export default {
    name: 'Book',
    components: {

    },
    data() {
        return {
            form: {},
            search: '',
            currentPage4: 1,
            pageSize: 10,
            total: 0,
            dialogVisible: false,
            tableData: [],
            user: {}
        }
    },
    created() {
        this.load();
        let userStr = sessionStorage.getItem("user") || '{}';
        this.user = JSON.parse(userStr);
    },
    methods: {
        load() {
            request.get("/api/category/all", {
                params: {
                    pageNum: this.currentPage4,
                    pageSize: this.pageSize,
                    search: this.search,
                }
            }).then(res => {
                console.log(this.search)
                console.log(res);
                this.tableData = res.data.records;
                this.total = res.data.total;
            })
        },
		esayLoad(){
			request.get("/api/category/all")
			.then(res => {
				console.log(res);
				this.tableData = res.data.records;
				this.total = res.data.toatl;
			})
		},
        add() {
            this.dialogVisible = true;
            this.form = {};
            this.$nextTick(() => {
                if (this.$refs['upload']) {
                    this.$refs['upload'].clearFiles();//清楚历史图片
                }
            });
        },
        save() {
            //console.log(this.form)
            if (this.form.goodsid) {//更新
                request.post("/api/category/update", this.form).then(res => {
                    console.log(res);
                    if (res.state == '0') {
                        this.$message({
                            type: "success",
                            message: "更新成功"
                        })
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg
                        })
                    }
                    this.load();//刷新表格数据
                    this.dialogVisible = false;//关闭弹窗
                });
            } else {//新增 暂时抛弃
                request.post("/api/category/insert", this.form).then(res => {
                    console.log(res);
                    if (res.state == '0') {
                        this.$message({
                            type: "success",
                            message: "新增成功"
                        })
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg
                        })
                    }
                    this.load();//刷新表格数据
                    this.dialogVisible = false;//关闭弹窗
                });
            }

        },
        handleEdit(row) {
            this.form = JSON.parse((JSON.stringify(row)));
            console.log(this.form)
            this.dialogVisible = true;
            this.$nextTick(() => {
                if (this.$refs['upload']) {
                    this.$refs['upload'].clearFiles();//清楚历史图片
                }
            });
        },
        handleSizeChange(pageSize) {//改变当前页面个数
            this.pageSize = pageSize;
            this.load();
        },
        handleCurrentChange(pageNum) {//改变当前页码
            this.currentPage4 = pageNum;
            this.load();
        },
        // currentPage4(){
        //
        // },
        handleDelete(id) {
            console.log(id);
            request.get("/api/category/delete?id=" + id).then(res => {
                console.log(res)
                if (res.state === '0') {
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    })
                } else {
                    this.$message({
                        type: "error",
                        message: res.msg
                    })
                }
                this.load()//重新加载
            });
        },

        filesUploadSuccess(res) {
            console.log(res);
            this.form.cover = res.data;
            this.load();
        }

    }
}
</script>
