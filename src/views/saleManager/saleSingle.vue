<template>
    <div class="quoto-content">
        <div class="quoto-search">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="询价单号">
                    <el-input placeholder="请输入单号" v-model="searchParams.orderNo"></el-input>
                </el-form-item>
                <el-form-item label="客户名">
                    <el-input placeholder="请输入客户名" v-model="searchParams.custName"></el-input>
                </el-form-item>
                <el-form-item label="产品名">
                    <el-input placeholder="请输入产品名" v-model="searchParams.productName"></el-input>
                </el-form-item>
                <el-form-item label="询价时间">
                    <el-date-picker
                        v-model="value"
                        type="daterange"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchSale">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="quoto-showData">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    v-if="roleId!=1"
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="销售单号"
                    prop="saleId"
                    width="220">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="orderNo"
                    width="220"
                    label="询价单号">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="custName"
                    label="客户名">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="productName"
                    label="产品名">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="price"
                    label="定价">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop='quotedPrice'
                    label="报价">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop='remarks'
                    label="备注">
                </el-table-column>
                <el-table-column
                    align="center"
                    width="160"
                    label="销售提交时间">
                    <template slot-scope="scope">
                        {{scope.row.saleOrderDate | dateFormat('YYYY-MM-DD HH:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="roleId==0"
                    align="center"
                    prop="quotedPriceDate"
                    width="160"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="quoto-footer">
                <div>
                    <el-button @click="addSingle">新增</el-button>
                    <el-button @click="removeAll" v-show="roleId!=1">批量删除</el-button>
                </div>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="5"
                    layout="total,prev, pager, next, jumper"
                    :total="rowTotal">
                </el-pagination>
            </div>
        </div>
        <AddQuoto ref="addSigleRef" :addData="addData" @get-data="GetData"/>
    </div>
</template>

<script>
import AddQuoto from '../../components/AddQuoto/addquoto';
import {getSaleList,deleteSale,removeAllSale} from '../../api/saleOrder';
export default {
    components:{
        AddQuoto
    },
    data() {
        return {
            rowTotal:0,
            id:"",
            ids:[],
            roleId:"",
            addData:{
                productName:"产品名：",
                custName:"客户名：",
                saleOrder:"销售订单号：",
                orderNo:"询价单号：",
                remarks:"备注：",
                singleFlag:true,
            },
            drawer:false,
            value: '',
            tableData: [],
            currentPage:1,
            searchParams:{
                custName:"",
                productName:'',
                orderNo:"",
                priceStartDate:"",
                priceEndDate:"",
                sale:this.$store.state.user.user.id+'',
                page:1,
                pageRow:5
           }
        }
    },
    created () {
        this.roleId= this.$store.state.user.user.roleId;
        console.log(this.roleId);
    },
    methods: {
        searchSale(){
            getSaleList(this.searchParams).then(res=>{
                let data = res.data;
                if(data.status==='0000' && data.code==='0000'){
                    this.rowTotal=data.data.rowTotal;
                    this.tableData = data.data.list;
                }
            })
        },
        GetData(){
            console.log(this.searchSale);
            this.searchSale();
        },
        // 新增
        addSingle(){
            this.$refs.addSigleRef.drawer = true;
            console.log(this.$refs.addSigleRef);
        },
        handleSizeChange(){},
        handleCurrentChange(page){
            this.searchParams.page=page;
            this.searchSale()
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        pubMethods(msg){
            this.$message({
                message:msg,
                type:'success'
            })
            this.searchSale();
        },
        handleDelete(val) {
            let data={
                id:val.id,
                user:{
                    roleId:this.$store.state.user.user.roleId
                }
            }
            deleteSale(data).then(res=>{
                const data=res.data;
                console.log(data);
                if(data.status==='0000' && data.code==='0000'){
                    this.pubMethods(data.msg);
                }
            })
        },
        handleSelectionChange(val) {
            val.forEach(x => {
                this.id = x.id+''
            })
            this.ids = val.map(x=>{
                return x.id 
            })
            console.log(this.ids);
        },
        async removeAll(){
            if(!this.id){
                this.$message({
                    message: '请选择删除项',
                    type: 'warning'
                })
            }
            // 删除单个
            if(this.id && typeof(this.id)==="string"){
                deleteSale({id:this.id}).then(res=>{
                    if(res.data.status==="0000" && res.data.code==="0000"){
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.searchSale();
                    }
                })
            }
            // 批量删除
            if(this.ids.length>0){
                const {data} =await removeAllSale({ids:this.ids});
            }
        },
    },
}
</script>

<style scoped>
.el-form-item__content,.el-date-editor{
    width: 250px;
}
.el-form-item{margin-right:20px;}
.quoto-footer{
    display: flex;
    justify-content: space-between;
    margin-top:20px;
}
.quoto-search{
    box-shadow: 1px 1px 10px 0 #ccc;
    border-bottom: 1px solid #ccc3;
    padding: 10px 10px 0;
}
</style>