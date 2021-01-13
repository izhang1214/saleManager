<template>
  <div>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          客户关系管理(新增)
        </div></el-col
      >
    </el-row>
    <div class="custRelation-form">
      <el-form
        :label-position="labelPosition"
        label-width="120px"
        :model="addCustomer"
      >
        <el-form-item label="名称：">
          <el-input v-model="addCustomer.customerName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="addCustomer.customerPhone" placeholder="请输入联系电话" maxlength='11'></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱：">
          <el-input v-model="addCustomer.customerEmail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="联系地址：">
          <el-input v-model="addCustomer.customerAddress" placeholder="请输入客户联系地址"></el-input>
        </el-form-item>
        <el-form-item label="营业执照：">
          <el-input v-model="addCustomer.customerLicense" placeholder="请输入营业执照号码"></el-input>
        </el-form-item>
        <el-form-item label="登录名：">
          <el-input v-model="addCustomer.userName" placeholder="创建用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="addCustomer.passWord" type="password" :show-password="true" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="客户类型：">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:300px;margin-left:30px;" @click="addCustomerMethod">提交</el-button>
        </el-form-item>
      </el-form>      
    </div>
  </div>
</template>

<script>
import {addCustomerManage} from '../../api/customerManager';
export default {
  data() {
    return {
      labelPosition: "right",
      value:"",
      addCustomer: {
          customerName: "",
          customerPhone: "",
          customerEmail: "",
          customerAddress: "",
          customerLicense: "",
          userName: "",
          passWord: "",
          type: ""
      },
      options: [{
          value: '客户',
          label: '客户'
        }, {
          value: '供应商',
          label: '供应商'
        }]
    };
  },
  methods: {
    addCustomerMethod() {
      if(!this.value){
        this.$message({
          message:'请选择客户类型',
          type:"warning"
        });
        return false;
      }
      this.addCustomer.type = this.value;
      addCustomerManage(this.addCustomer).then(res=>{
        var data = res.data;
        if(data.status==='0000'&& data.code=="0000"){
          this.$message({
            message:data.msg,
            type:'success'
          })
        }
      })
    }
  },
};
</script>

<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 44px;
  line-height: 44px;
  padding-left: 20px;
}
.bg-purple-dark {
  background: rgba(245, 245, 245, 1);
}
.custRelation-form {
  width: 480px;
  margin: 50px auto;
}
/deep/ .el-select{
  width: 360px;
}
</style>