<template>
    <div class="son">
      <p>{{ sonMsg }}</p>
      <p>子组件接收到内容：{{ psMsg }}</p>
      <!--<input type="text" v-model="user" @change="setUser">-->
      <button @click="setUser">传值</button>
    </div>
  </template>
  <script>
  export default {
    name: "son",
    data(){
      return {
        sonMsg:'子组件',
        user:'子传父的内容'
      }
    },
    props:['psMsg'],
    methods:{
      setUser:function(){
        this.$emit('transfer',this.user)//将值绑定到transfer上传递过去
      }
    }
  }
  </script>