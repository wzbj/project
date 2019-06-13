<template>
<!-- <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1">
      <router-view />
    </el-alert>
  </div> -->
  <div class="hello">
    <h1>总金额： {{ total }}</h1>
    <product
      :productName="item.name"
      :index="index"
      :key='index'
      @getProduct="getValue"
      v-for="(item, index) in productList">
    </product>
    <el-button type="success" @click="handletest">测试</el-button>
  </div>
</template>
<script>
import Product from '@/components/Tool/Product'
export default {
  name: 'Cart',
  data () {
    return {
      productList: [
        {
          id: 1,
          sum: 0,
          name: '爱法贝鞋子'
        },
        {
          id: 2,
          sum: 0,
          name: '1001夜牛仔外套'
        }
      ],
      testtotal:''
    }
  },
  methods: {
    getValue (value) {
      this.productList[value.index].sum = value.total
    },
    handletest() {
      // console.log(this.total)
      console.log(this.testtotal)
    }
  },
  computed: {
    total () {
      this.testtotal = this.productList.reduce((accumulator, current) =>
        accumulator.sum + current.sum
      // return this.productList.reduce((accumulator, current) =>
      //   accumulator.sum + current.sum
      )
    }
  },
  components: {
    Product
  }
}
</script>





