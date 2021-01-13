<template>
  <div>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">入库管理</div></el-col
      >
    </el-row>
    <div class="custRelation-form">
      <el-form
        :label-position="labelPosition"
        label-width="120px"
        :model="entryStore"
        :rules="rules"
      >
        <el-form-item label="产品ID：">
          <el-input
            v-model="entryStore.productId"
            placeholder="请输入产品ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品名：">
          <el-input
            v-model="entryStore.productName"
            placeholder="请输入产品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品定价(元)：" prop="price">
          <el-input
            v-model.number="entryStore.price"
            placeholder="请输入入库定价"
          ></el-input>
        </el-form-item>
        <el-form-item label="入库类型：">
          <el-select v-model="entryStore.inOutType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库数量：">
          <el-input
            v-model="entryStore.actNumber"
            placeholder="请输入入库数量"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            v-model="entryStore.actRemark"
            type="textarea"
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            style="width: 300px; margin-left: 30px"
            @click="entyrStoreSubmit"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addCustomerManage } from "../../api/customerManager";
import { entryOrOut } from "../../api/entryOroutStore";
import bus from "../../utils/eventBus";
export default {
  data() {
    return {
      labelPosition: "right",
      value: "",
      entryStore: {
        productId: "",
        productName: "",
        price: "",
        inOutType: "",
        actNumber: "",
        actRemark: "",
        type: "0",
        actPerson: "",
      },
      options: [
        { value: 1, label: "外购入库" },
        { value: 2, label: "调拨入库" },
        { value: 3, label: "退货入库" },
        { value: 4, label: "其他入库" },
        { value: 5, label: "借用归还" },
      ],
      rules: {
        price: [{ type: "number", message: "金额必须为数字值" }],
      },
    };
  },
  
  methods: {
    entyrStoreSubmit() {
      this.entryStore.actPerson = this.$store.state.user.user.name;      
      entryOrOut(this.entryStore).then((res) => {
        var data = res.data;
        if (data.status === "0000" && data.code === "0000") {
          this.$message({
            message: data.msg,
            type: "success",
          });
          // 请求成功之后，跳转详情，调用接口
          this.$router.push({name:"logInfo", params:{data:this.entryStore}});
          // 提交成功了，清空数据
          setTimeout(() => {
            this.entryStore.productId= "";
            this.entryStore.productName= "";
            this.entryStore.price= "";
            this.entryStore.inOutType= "";
            this.entryStore.actNumber= "";
            this.entryStore.actRemark="";
          }, 50);
        } else {
          this.$message({
            message: data.msg,
            type: "error",
          });
        }
      });
    },
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
/deep/ .el-select {
  width: 360px;
}
</style>