<template>
  <div :status="status">
    <el-button size="small" @click="handleShield" type="danger" v-if="status == '1'">屏蔽</el-button>
    <el-button size="small" @click="handleSink" type="danger" v-if="status == '1'">沉底</el-button>
    <el-button size="small" @click="handleReleive" type="success" v-if="status == '0'">解封</el-button>
    <el-button size="small" @click="handleSink" type="danger" v-if="status == '0'">沉底</el-button>
    <el-button size="small" @click="handleReleive" type="success" v-if="status == '2'">海捞</el-button>
  </div>
</template>

<script>
export default {
  name:'StatusBtn',
  props:{
    status:Number
  },
  methods: {
    handleShield() {
      console.log(11111111111)
      this.$emit('handleShield')
    },
    handleReleive() {
      console.log(22222)
      this.$emit('handleReleive')
    },
    handleSink() {
      console.log(3333)
      this.$emit('handleSink')
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-button{
    margin-left: 0;
    margin-top: 3px;
  }
</style>
