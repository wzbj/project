<template>
  <div class="dialog">
    <el-dialog
      :visible.sync="dialog.show"
      :title="dialog.title"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <el-form-item label="话术类型">
            <el-select v-model="talkId" filterable placeholder="话术类型" @change="handleTalk">
              <el-option v-for="(type,index) in typeList" :key="index
              " :label="type.name" :value="type.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择话术">
            <el-radio
              v-model="radioWord"
              v-for="(word, index) in checkWordList"
              :key="index"
              :label="word.text"
            >{{word.text}}
            </el-radio>
          </el-form-item>
          <el-form-item prop="describe" label="给该用户备注(选填)">
            <el-input type="textarea" :rows="2" v-model="formData.describe" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item prop='income'  label="收入:">
            <el-input type="income" v-model="formData.income"></el-input>
          </el-form-item>

          <el-form-item prop='expend' label="支出:">
            <el-input type="expend" v-model="formData.expend"></el-input>
          </el-form-item>

          <el-form-item prop='cash' label="账户现金:">
            <el-input type="cash" v-model="formData.cash"></el-input>
          </el-form-item>

            <el-form-item label="备注:">
              <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button type="danger" @click="dialog.show = false">取消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dialogfound',
  computed: {
    ...mapGetters([
      'wordList',
      'typeList'
    ])
    // talkId() {
    //   return this.$store.getters.typeList[0].id
    // }
  },
  data() {
    return {
      tableData:[],
      // talkId:this.typeList[0].id,
      talkId:'',
      radioWord:'',
      checkWordList:[],//类型下对应的话术
      format_type_list:[
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      form_rules: {
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" }
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" }
        ],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
      }
    }
  },
  props: {
    dialog: Object,
    formData: Object
  },
  created() {
    this.getFirstTypeid()
  },
  methods:{
    onSubmit(form){
      console.log(form)
      this.$refs[form].validate(valid => {
        if(valid){
          // console.log(this.formData)
          const url = this.dialog.option === 'add' ? "add" : `edit/${this.formData._id}`;
          this.$axios.post(`/api/profiles/${url}`,this.formData)
            .then(res => {
              // 添加成功
              this.$message({
                message:"数据添加成功",
                type:'success'
              });
              // 隐藏对话框
              this.dialog.show = false
              this.$emit('update');
            })
        }
      })
    },
    handleTalk() {
      // 选中过滤当前类型下的话术
      const typeId = this.talkId
      console.log(typeId)
      console.log(this.wordList)
      this.checkWordList=this.wordList.filter(item => item.typeId == typeId)
      console.log(this.checkWordList)
    },
    getFirstTypeid() {
      // this.talkId = this.typeList[0].id
    }
  }
}
</script>


<style scoped>
  /* .dialog .el-dialog__body{
    padding:30px 14px!important;
  } */
  .el-radio{
    display: block;
    width: 100%;
    white-space: normal;
    margin-left: 0;
    margin-top: 8px;
    line-height: 20px;
  }
</style>
