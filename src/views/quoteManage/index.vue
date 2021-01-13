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
                        type="datetimerange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
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
                    v-if='userInfo.roleId==0'
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    label="询价单号"
                    prop="orderNo"
                    align="center"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="custName"
                    label="客户名"
                    align="center"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="productName"
                    label="产品名"
                    align="center"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="定价"
                    align="center"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="expectPrice"
                    label="期望价"
                    align="center"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="remarks"
                    label="客户备注"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="询价时间"
                    width="170"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.priceDate | dateFormat('YYYY-MM-DD HH:mm:ss')}}                        
                    </template>
                </el-table-column>
                <el-table-column
                    prop='status'
                    label="状态"
                    align="center"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="期望报价时间"
                    width="170"
                    align="center">
                    <template  slot-scope="scope">
                        {{scope.row.expectPriceDate | dateFormat('YYYY-MM-DD HH:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="报价"
                    align="center">
                    <template slot-scope="scope" >
                        <el-button size="mini" type="primary"
                            v-if="!scope.row.quotedPrice"
                            @click="quickQrice(scope.row)"
                            >
                            立即报价
                        </el-button>
                    <span v-else>{{scope.row.quotedPrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="quotedPricePeople"
                    label="报价人"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="quotedPriceDate"
                    label="报价时间"
                    width="170"
                    align="center">
                    <template slot-scope="scope" v-if="scope.row.quotedPriceDate">
                        {{scope.row.quotedPriceDate | dateFormat('YYYY-MM-DD HH:mm:ss')}}
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div :class="[userInfo.roleId==0?'quoto-footer':'quoto-footer-end']"> -->
            <div class="quoto-footer">
                <div>
                    <el-button @click="addPrice">新增</el-button>
                    <el-button @click="toggleSelection()" v-if="roleId==0">删除</el-button>
                </div>
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next,jumper"
                    :page-size="5"
                    :total="rowTotal">
                </el-pagination>
            </div>
        </div>
        <AddQuoto ref="addQuotoRef" :addData="addData" @get-data="GetData"/>
        <el-drawer
            title="新增报价"
            :visible.sync="drawer">
            <div class="demo-drawer__content">
                <el-form label-position="right" label-width="80px" :rules="rules"
                    :model="formLabelAlign"
                >
                    <el-form-item label="报价(元)：" prop="addQuotedPrice">
                        <el-input v-model.number="formLabelAlign.addQuotedPrice" placeholder="请输入报价金额"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="demo-drawer__footer">
                <el-button style="margin-left: 10px" @click="cancelForm">取 消</el-button>
                <el-button type="primary" @click="sureBtn">确 定</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import AddQuoto from '../../components/AddQuoto/addquoto';
import {quotoManagerSearch,deleteQuotoOrder,deleteAllOrder,quickQuoto} from '../../api/quotoManager';
export default {
    components:{
        AddQuoto
    },
    data() {
        return {
            quotedPriceParams:{},
            quotoId:null,//新增报价id
            userInfo:"",
            rowTotal:0,
            roleId:"",
            addData:{
                productName:"产品名：",
                expectPrice:"期望价(元)：",
                custName:"客户名：",
                remarks:"备注：",
                quotoFlag:true
            },
            drawer:false,
            value: '',
            tableData:[],
            id:"",
            ids:[],
            currentPage:1,
            searchParams:{
                custName:"",
                orderNo:"",
                productName:"",
                priceStartDate:"",
                priceEndDate:"",
                page:1,
                pageRow:10,
                user:{
                    roleId:"",
                    name:""
                }
           },
           formLabelAlign:{
               addQuotedPrice:""
           },
           rules:{
                addQuotedPrice: [
                    { type: 'number', message: '金额必须为数字值'}
                ]
            }
        }
    },
    created () {
        this.userInfo = this.$store.state.user.user;
        this.roleId = this.$store.state.user.user.roleId;
        this.searchParams.user.roleId = this.roleId;
        this.searchParams.user.name = this.$store.state.user.user.name;
    },
    methods: {
        // 查询
        async onSubmit() {
            if(this.value){
                this.searchParams.priceStartDate=this.value[0];
                this.searchParams.priceEndDate=this.value[1];
            }else{
                this.searchParams.priceStartDate="";
                this.searchParams.priceEndDate="";
            }
            const {data} = await quotoManagerSearch(this.searchParams);
            this.rowTotal = data.data.rowTotal;
            this.tableData = data.data.list;
        },
        handleSelectionChange(val){
            val.forEach(x => {
                this.id = x.id+''
            })
            this.ids = val.map(x=>{
                return x.id 
            })
        },
        toggleSelection(){
            if(!this.id){
                this.$message({
                    message: '请选择删除项',
                    type: 'warning'
                })
            }
            let deleteDataId ={
                id:this.id,
                user:{
                    roleId:this.$store.state.user.user.roleId
                }
            }
            let deleteDataIds ={
                ids:this.ids,
                user:{
                    roleId:this.$store.state.user.user.roleId
                }
            }
            // 删除单个
            if(this.id && typeof(deleteDataId.id)==="string"){
                deleteQuotoOrder(deleteDataId).then(res=>{
                    if(res.data.status==="0000" && res.data.code==="0000"){
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.onSubmit();
                    }
                })
            }
            if(this.ids.length>0){
                deleteAllOrder(deleteDataIds).then(res=>{})
            }
        },
        // 新增
        addPrice(){
            this.$refs.addQuotoRef.drawer = true;
        },
        GetData(){
            setTimeout(() => {
                this.onSubmit();    
            });
        },
        handleCurrentChange(val) {
            this.searchParams.page=val;
            this.currentPage = val;
            this.onSubmit(this.searchParams)
        },
        handleSizeChange(val){
            console.log(val);
        },
        cancelForm(){
            this.loading = false;
            this.drawer = false;
        },
        // 立即报价
        quickQrice(val){
            this.drawer = true;
            this.quotoId=val.id;
            this.quotedPriceParams=val;
            console.log(this.quotedPriceParams.quotedPrice);
        },
        sureBtn(){
            var data ={
                id:this.quotoId,
                quotedPrice:this.formLabelAlign.addQuotedPrice,
                quotedPricePeople:this.$store.state.user.user.id+'',
                user:{
                    roleId:this.$store.state.user.user.roleId
                }
            }
            quickQuoto(data).then(res=>{
                var data = res.data;
                if(data.code==='0000' && data.status==="0000"){
                    this.$message({
                        message:data.msg,
                        type:"success"
                    })
                    this.onSubmit();
                    setTimeout(() => {
                        this.drawer = false;
                    });
                    this.quotedPriceParams.quotedPrice = this.formLabelAlign.addQuotedPrice;
                    this.formLabelAlign.addQuotedPrice='';
                }else{
                    this.$message({
                        message:data.msg,
                        type:"warning"
                    })
                }
            })
        }
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
.quoto-footer-end{
    display: flex;
    justify-content: flex-end;
    margin-top:20px;
}
.quoto-search{
    box-shadow: 1px 1px 10px 0 #ccc;
    border-bottom: 1px solid #ccc3;    
    padding: 10px 10px 0;
}
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