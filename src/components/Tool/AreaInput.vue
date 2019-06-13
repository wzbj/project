<template>
  <div class="area_input">
    <input type="text" class="area_code" placeholder="区号" v-model="area_phone.area">
    <input type="text" class="area_phone" placeholder="请输入手机号" v-model="area_phone.phone">
    <!-- <input type="text" class="area_code" placeholder="区号" :value="area_phone.area" @input="area_phone.area = $event.target.value">
    <input type="text" class="area_phone" placeholder="请输入手机号" :value="area_phone.phone" @input="area_phone.phone = $event.target.value"> -->
  </div>
</template>

<script>
export default {
  name: "AreaInput",
  props: {
    // area_code: {
    //   type:String,
    //   default:86
    // },
    area_phone: Object,
    telPhone:String
  },
  methods:{
    // lastMobile() {
    //   if(area_phone.phone != '') {
    //     this.telPhone = area_phone.area+area_phone.phone
    //   }else{
    //     this.telPhone = ''
    //   }
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .area_input{
    width:100%;
    .area_code{
      width:18%;
      padding:0 5px;
      text-align: center;
    }
    .area_phone{
      width: 79%;
    }
    input{
      display: inline-block;
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
    }
    input::-webkit-input-placeholder {

      /* WebKit browsers */

      color: #bbb;

    }
  }
</style>
