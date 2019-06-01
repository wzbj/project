<template>
  <div class="pageMsg">
    当前总条数: <span>10000</span>&nbsp;&nbsp;
    每页展示: <span>50</span>&nbsp;&nbsp;
    共有: <span>200</span>页&nbsp;&nbsp;
    当前第: <span>10</span>页
  </div>
</template>

<script>
export default {
  name:'PageMsg'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .pageMsg{
    width:100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: #B2E5FF;
  }
</style>
