<template>
    <div class="sale-Order">
        <div class="quoto-search">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="姓名：">
                    <el-input placeholder="请输入姓名" v-model="searchData.name"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <el-input placeholder="请输入电话" v-model="searchData.phone"></el-input>
                </el-form-item>
                <el-form-item label="联系邮箱：">
                    <el-input placeholder="请输入邮箱" v-model="searchData.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="insertAddress">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="quoto-showData">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                    align="center"
                    label="姓名"
                    prop="name"
                    width="120">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="type"
                    label="类型"
                    width="120">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="department"
                    label="部门">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="phone"
                    label="联系电话">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="email"
                    label="联系邮箱">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop='address'
                    label="联系地址">
                </el-table-column>                
            </el-table>
            <div class="quoto-footer">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5,10, 20, 30]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalRecord">
                </el-pagination>
            </div>
        </div>
        <el-drawer
            title="新增通讯录"
            :visible.sync="drawer">
            <div class="demo-drawer__content">
                <el-form label-position="right" label-width="80px" :model="formLabelAlign">
                    <el-form-item label="姓名：">
                        <el-input v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item label="电话：">
                        <el-input v-model="formLabelAlign.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input v-model="formLabelAlign.email"></el-input>
                    </el-form-item>
                    <el-form-item label="部门：">
                        <el-input v-model="formLabelAlign.mark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="demo-drawer__footer">
                <el-button style="margin-left: 10px" @click="cancelForm"
                >取 消</el-button
                >
                <el-button type="primary" @click="sureBtn">确 定</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import {searchAddress,insertAddress} from '../../api/addressBook';
export default {
    data() {
        return {
            formLabelAlign: {
                name: '',
                phone: '',
                email: '',
                mark:""
            },
            value:"",
            drawer:false,
            currentPage:1,
            tableData: [],
            totalRecord:0,
            searchData:{
                name:"",
                phone:"",
                email:"",
                page: 1,
                pageRow: 5,
            }
        }
    },
    methods: {
        handleSearch() {
            searchAddress(this.searchData).then(res=>{
                var data = res.data;                
                if(data.status==='0000' && data.code==='0000'){
                    this.tableData = data.data.dataList;
                    this.totalRecord = data.data.totalRecord;
                    console.log(this.tableData);
                }else{
                    this.$message({
                        message:data.msg,
                        type:"warning"
                    })
                }
            })
        },
        insertAddress(){
            this.drawer = true
        },
        cancelForm() {
            this.loading = false;
            this.drawer = false;
        },
        sureBtn(){
            insertAddress(this.formLabelAlign).then(res=>{
                var data = res.data;
                if(data.code==='0000' && data.status==="0000"){
                    this.$message({
                        message:data.msg,
                        type:'success'
                    })
                    this.handleSearch();
                }else{
                    this.$message({
                        message:data.msg,
                        type:"warning"
                    })
                }
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(page) {
            this.searchData.page=page;
            this.handleSearch()
        }
    }
}
</script>

<style scoped>
.el-form-item__content,.el-date-editor{
    width: 250px;
}
.el-form-item{margin-right:20px;}
.quoto-footer{
    display: flex;
    justify-content: flex-end;
    margin-top:20px;
}
.quoto-search{
    box-shadow: 1px 1px 10px 0 #ccc;
    border-bottom: 1px solid #ccc3;
    padding: 10px 10px 0;
}
/* .el-input,
.el-textarea__inner {
  width: 80% !important;
} */
.demo-drawer__footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #ccc;
  padding-top: 5px;
}
/deep/ :focus {
  outline: 0;
}
/deep/ .el-drawer__header {
  line-height: 40px;
  box-shadow: 1px 1px 10px 0px #ccc;
}
</style>