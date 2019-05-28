<template>
  <div class="navbar-top">
    <el-row>
      <!-- <el-col :span="20">
        <el-menu>
          <el-menu-item index="/">首页</el-menu-item>
        </el-menu>
      </el-col> -->
          <!-- :active-text-color="variables.navBarTopTextActive" -->
      <el-col :span="24">
        <el-menu
          :default-active="defaultActiveIndex"
          :router="true"
          :background-color="variables.twoLevelTop"
          :text-color="variables.navBarTopText"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <!-- <el-menu-item index="/">首页</el-menu-item> -->
          <el-menu-item
            style="border:none;"
            v-for="item in navMenu"
            v-if="item.meta"
            :key="item.path"
            :index="item.path" >
            <template slot="title">
              <navitemtwo :title="item.meta.title"/>
            </template>
          </el-menu-item>
          <el-menu-item v-else :index="'dashboard'">

          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Navitemtwo from './Navitem'
import { mapGetters} from 'vuex'
import variables from '@/styles/variables.scss'

export default {
  components: {
    Navitemtwo
  },
  data() {
    return {
      defaultActiveIndex: this.activeIndex(this.$route.path),
      loading: false
    }
  },
  watch: {
    navMenu(){
      console.log(this.$route.path)
      this.defaultActiveIndex = this.activeIndex(this.$route.path)
      console.log(this.defaultActiveIndex)
    }
  },
  computed: {
    ...mapGetters([
      'routerList',
      'navMenu'
    ]),
    variables() {
      return variables
    }
  },
  created() {
    console.log(22222222)
    console.log(this.$route)
    console.log(22222222)
    console.log(this.navMenu)
  },
  methods:{
    handleSelect(index) {
       console.log(this.$route.path)
      this.defaultActiveIndex = index
      const routers = this.routerList // 获取路由对象
      for (var i = 0; i < routers.length; i++) {
        if (routers[i].path === index) {
          console.log(routers[i].children)
          this.$store.commit('CHANGE_NAVMENU', routers[i].children)
        }
      }
      console.log(this.$store.getters.navMenu)
    },
    activeIndex(route){
      return route.split('/')[2] ? route.split('/')[2] : '/'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/variables.scss";
.navbar-top {
  height: 40px;
  line-height: 40px;
  transition: margin-left .18s;
  z-index: 1002;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  .el-menu.el-menu--horizontal {  // 这里两个类名连接的作用是当元素同时拥有这两个类，此规则才生效
    border-bottom: solid 0 #e6e6e6;
  }
  .el-menu--horizontal > .el-menu-item {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
  }
  .el-menu-item.is-active {
      color: #009dc7 !important;
      background: #fff !important;
      border-bottom: none;
  }
}


</style>

