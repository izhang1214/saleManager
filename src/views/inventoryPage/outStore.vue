<template>
  <div>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">出库管理</div></el-col
      >
    </el-row>
    <div class="custRelation-form">
      <el-form
        :label-position="labelPosition"
        label-width="120px"
        :model="outStore"
        :rules="rules"
      >
        <el-form-item label="产品ID：">
          <el-input
            v-model="outStore.productId"
            placeholder="请输入产品ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品名：">
          <el-input
            v-model="outStore.productName"
            placeholder="请输入产品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品定价(元)：" prop="price">
          <el-input
            v-model.number="outStore.price"
            placeholder="请输入出库定价"
          ></el-input>
        </el-form-item>
        <el-form-item label="出库类型：">
          <el-select v-model="outStore.inOutType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出库数量：">
          <el-input
            v-model="outStore.actNumber"
            placeholder="请输入出库数量"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            v-model="outStore.actRemark"
            type="textarea"
            placeholder="请填写备注"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            style="width: 300px; margin-left: 30px"
            @click="outStoreSubmit"
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
      outStore: {
        productId: "",
        productName: "",
        price: "",
        inOutType: "",
        actNumber: "",
        actRemark: "",
        type: "1",
        actPerson: "",
      },
      options: [
        { value: 1, label: "销售出库" },
        { value: 2, label: "借用出库" },
        { value: 3, label: "赠品出库" },
        { value: 4, label: "报废出库" },
      ],
      rules: {
        price: [{ type: "number", message: "金额必须为数字值" }],
      },
    };
  },
  methods: {
    outStoreSubmit() {
      this.outStore.actPerson = this.$store.state.user.user.name;
      entryOrOut(this.outStore).then((res) => {
        var data = res.data;
        if (data.status === "0000" && data.code === "0000") {
          this.$message({
            message: data.msg,
            type: "success",
          });
          // 请求成功之后，跳转详情，调用接口
          this.$router.push({name:"logInfo", params:{data:this.outStore}});
          setTimeout(()=>{
          //   bus.$emit('getStoreLog',this.outStore);
            // 提交成功了，清空数据
            this.outStore.productId="",
            this.outStore.productName="",
            this.outStore.price="",
            this.outStore.inOutType="",
            this.outStore.actNumber= "",
            this.outStore.actRemark=""
          },50);
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