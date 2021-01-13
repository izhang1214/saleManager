<template>
  <div class="sale-Order">
    <div class="quoto-search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="单号：">
          <el-input placeholder="请输入单号" v-model="searchData.saleOrderId"></el-input>
        </el-form-item>
        <el-form-item label="客户名：">
          <el-input placeholder="请输入客户名" v-model="searchData.custName"></el-input>
        </el-form-item>
        <el-form-item label="产品名：">
          <el-input placeholder="请输入产品名" v-model="searchData.productName"></el-input>
        </el-form-item>
        <el-form-item label="提交时间：">
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="searchData.status" placeholder="状态" style="width: 250px">
              <el-option label="未转定" value="0"></el-option>
              <el-option label="转定" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="quoto-showData">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" 
        v-if="roleId!=1"></el-table-column>
        <el-table-column
          align="center"
          label="销售订单号"
          prop="saleOrderId"
          width="220"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderNo"
          label="询价单号"
          width="220"
        >
        </el-table-column>
        <el-table-column align="center" prop="custName" label="客户名">
        </el-table-column>
        <el-table-column align="center" prop="productName" label="产品名">
        </el-table-column>
        <el-table-column align="center" prop="price" label="定价">
        </el-table-column>
        <el-table-column align="center" prop="quotedPrice" label="报价">
        </el-table-column>
        <el-table-column align="center" prop="remarks" label="备注">
        </el-table-column>
        <el-table-column align="center" prop="sale" label="销售">
        </el-table-column>
        <el-table-column align="center" label="订单提交时间" width="220">
          <template slot-scope="scope">
            {{scope.row.saleOrderDate | dateFormat('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="statusDesc" label="状态">
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          prop="quotedPriceDate"
          label="操作"
          fit="true"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" v-if="scope.row.status!=1" @click="handleTransfer(scope.row)">转定</el-button>
            <el-button
              v-show="roleId!=1"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="quoto-footer">
        <div>
          <el-button @click="addSale">新增</el-button>
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
    <AddQuoto ref="addSaleRef" :addData="addData" @get-data="GetData"/>
  </div>
</template>

<script>
import AddQuoto from "../../components/AddQuoto/addquoto";
import {saleOrderList,transferOrder,deleteSingleOrder,deleteAllSaleOrder} from '../../api/saleOrder';
export default {
  components: {
    AddQuoto,
  },
  data() {
    return {
      id:"",
      ids:[],
      rowTotal:0,
      searchData:{
        saleOrderId:"",
        custName:"",
        productName:"",
        saleOrderDate:"",
        page:1,
        pageRow:5,
        sale:this.$store.state.user.user.id+'',
      },
      addData: {
        productName: "产品名：",
        custName: "客户名：",
        orderNo: "询价单号：",
        remarks: "备注：",
        saleFlag: true,
      },
      value: "",
      currentPage: 1,
      tableData: [],
      roleId:"",
    };
  },
  created () {
    this.roleId= this.$store.state.user.user.roleId;
  },
  methods: {
    // 查询
    handleSearch() {
      saleOrderList(this.searchData).then(res=>{
        let data = res.data;
        if(data.status==='0000' && data.code==='0000'){
          this.rowTotal=data.data.rowTotal;
          this.tableData = data.data.list.map(x=>{
            x.statusDesc = x.status==1?'已转定':'未转定';
            return x
          });
          this.tableData.sort((a,b)=> a.status-b.status);
        }
      })
    },
    // 转定
    async handleTransfer(val){
      val.sale=this.$store.state.user.user.id+'';
      delete val.saleOrderDate;
      delete val.createDate;
      const {data} = await transferOrder(val);
      if(data.status==='0000' && data.code==='0000'){
        this.pubMethods();
      }
    },
    async handleDelete(val) {
      let deleteData ={
        id:val.id,
        user:{
          roleId:this.$store.state.user.user.roleId
        }
      }
      const {data} = await deleteSingleOrder(deleteData);
      if(data.status==='0000' && data.code==='0000'){
        this.pubMethods(data.msg);
      }
    },
    pubMethods(msg){
      this.$message({
        message:msg,
        type:'success'
      })
      this.handleSearch();
    },
    // 新增
    addSale() {
      this.$refs.addSaleRef.drawer = true;
    },
    GetData(){
      this.handleSearch();
    },
    handleSelectionChange(val) {
      val.forEach(x => {
          this.id = x.id+''
      })
      this.ids = val.map(x=>{
          return x.id 
      })
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
          deleteSingleOrder({id:this.id}).then(res=>{
              if(res.data.status==="0000" && res.data.code==="0000"){
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                this.handleSearch();
              }
          })
      }
      if(this.ids.length>0){
        const {data} =await deleteAllSaleOrder({ids:this.ids});
      }
    },
    
    handleCurrentChange(val) {
      this.searchData.page=val;
      this.handleSearch(this.searchData)
    },
    handleSizeChange(val){
      console.log(val);
    },
  },
};
</script>

<style scoped>
.el-form-item__content,
.el-date-editor {
  width: 250px;
}
.el-form-item {
  margin-right: 20px;
}
.quoto-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.quoto-search {
  box-shadow: 1px 1px 10px 0 #ccc;
  border-bottom: 1px solid #ccc3;
  padding: 10px 10px 0;
}
</style>