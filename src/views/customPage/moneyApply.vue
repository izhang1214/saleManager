<template>
  <div>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
            费用报销申请
        </div></el-col
      >
    </el-row>
    <div class="custRelation-form">
      <el-form
        :label-position="labelPosition"
        label-width="120px"
        :rules="rules"
        :model="formLabelAlign"
      >
        <el-form-item label="报销人：">
          <el-input v-model="formLabelAlign.costPerson" placeholder="请输入报销人"></el-input>
        </el-form-item>
        <el-form-item label="报销金额(元)：" prop="costPrice">
          <el-input v-model.number="formLabelAlign.costPrice" placeholder="请输入报销金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="报销申请时间：">
          <el-input disabled v-model="formLabelAlign.costSubmitTimeStr" placeholder="申请时间"></el-input>
        </el-form-item>
        <el-form-item label="收款人开户行：">
          <el-input v-model="formLabelAlign.payeeBank" placeholder="请输入收款人开户行"></el-input>
        </el-form-item>
        <el-form-item label="银行账号：">
          <el-input v-model="formLabelAlign.payeeBankNo" placeholder="请输入银行账号"></el-input>
        </el-form-item>
        <el-form-item label="审批人：">
          <el-input v-model="formLabelAlign.auditPerson" placeholder="请输入审批人"></el-input>
        </el-form-item>
        <el-form-item label="报销类型：">
          <el-select v-model="value" placeholder="请选择">
              <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="formLabelAlign.param1" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:300px;margin-left:30px;" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>      
    </div>
  </div>
</template>

<script>
import {addCostSubmit} from '../../api/customerManager';
import {timeMixin} from '../../utils/timeMixins';
export default {
  mixins:[timeMixin],
  data() {
    return {
      labelPosition: "right",
      formLabelAlign:{
        costOrderNo: "",
        costChildOrderNo: "",
        costPerson: "",
        auditPerson: "",
        costPrice:"",
        costSubmitTimeStr: null,
        payeeBank: "",
        payeeBankNo: "",
        costTypeName: "",
        costType: "1",
        param1:"",
    },
      options: [
        {text:"交通费",value:"交通费"},
        {text:"住宿费",value:"住宿费"},
        {text:"通信费",value:"通信费"},
        {text:"其他费用",value:"其他费用"}
      ],
      value: '',
      rules:{
        costPrice: [
          { type: 'number', message: '金额必须为数字值'}
        ]
      }
    };
  },
  mounted () {    
    this.formLabelAlign.costSubmitTimeStr=this.getTime(new Date());
  },
  methods: {
    // inputFun(){
    //   if(isNaN(this.formLabelAlign.costPrice)){
    //     this.$message({
    //       message:"金额必须为数字",
    //       type:"warning"
    //     })
    //   }
    // },
    handleSubmit() {
      this.formLabelAlign.costTypeName = this.value;
      addCostSubmit(this.formLabelAlign).then(res=>{
        var data = res.data;
        if(data.status==='0000'&& data.code=="0000"){
          this.$message({
            message:data.msg,
            type:'success'
          })
        }else{
          this.$message({
            message:data.msg,
            type:"warning"
          })
        }
      })
    },
  }
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
  width:360px;
}
</style>