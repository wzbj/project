<template>
  <div class="hello">
    <h2>{{ productName }}</h2>
    <div>单价: <input type="text" v-model="price"></div>
    <div>数量: <input type="text" v-model="number"></div>
    <div>总价格：{{ total }}</div>
  </div>
</template>
<script>
export default {
  name: 'Product',
  data () {
    return {
      price: 0,
      number: 0
    }
  },
  props: ['index', 'productName'],
  updated () {
    this.setProduct()
  },
  methods: {
    setProduct () {
      this.$emit('getProduct', {index: this.index, total: this.total})
    }
  },
  computed: {
    total () {
      return this.price * this.number
    }
  }
}
</script>