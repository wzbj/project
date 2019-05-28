<template>
  <div class="navbar-top">
    <el-row>
      <!-- <el-col :span="20">
        <el-menu>
          <el-menu-item index="/">首页</el-menu-item>
        </el-menu>
      </el-col> -->
      <el-col :span="20">
        <el-menu
          :default-active="defaultActiveIndex"
          :router="true"
          :background-color="variables.navBarTopBg"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <!-- <el-menu-item index="/">首页</el-menu-item> -->
          <el-menu-item
            v-for="item in routerList"
            v-if="!item.hidden&&item.children"
            :key="item.path"
            style="border:none;"
            :index="item.path" >
            <template slot="title">
              <navitem :icon="item.meta.icon||item.meta.icon" 
              :title="item.meta.title"/>
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item>Home</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">LogOut</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Navitem from './Navitem'
import { mapGetters} from 'vuex'
import variables from '@/styles/variables.scss'

export default {
  components: {
    Navitem
  },
  data() {
    return {
      // defaultActiveIndex: this.$route.fullPath.split('/')[1].split('/')[0] == 'dashboard' ? '/' : '/'+this.$route.fullPath.split('/')[1].split('/')[0],
      defaultActiveIndex: this.activeIndex(this.$route),
      // defaultActiveIndex: '/',
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'routerList',
      'avatar'
    ]),
    variables() {
      return variables
    }
  },
  created() {
    const index = this.activeIndex(this.$route);
    this.handleSelect(index)
    const url = window.location.href
    console.log(111111)
    console.log(this.$route.fullPath.split('/')[1].split('/')[0])
    console.log(this.defaultActiveIndex)
    console.log(this.$route)
    console.log(111111)
    // console.log(this.routerList)
  },
  methods:{
     handleSelect(index) {
       console.log(index)
      this.defaultActiveIndex = index
      const routers = this.routerList // 获取路由对象
      for (var i = 0; i < routers.length; i++) {
        if (routers[i].path === index) {
          // console.log(routers[i].children)
          this.$store.commit('CHANGE_NAVMENU', routers[i].children)
        }
      }
      console.log(this.$store.getters.navMenu)
    },
    activeIndex(route){
      return route.fullPath.split('/')[1].split('/')[0] == 'dashboard' ? '/' : '/'+route.fullPath.split('/')[1].split('/')[0]
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/variables.scss";
.navbar-top {
  height: 60px;
  line-height: 60px;
  background: #222;
  transition: margin-left .18s;
  z-index: 1002;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  .el-menu.el-menu--horizontal {  // 这里两个类名连接的作用是当元素同时拥有这两个类，此规则才生效
    border-bottom: solid 0 #e6e6e6;
  }
  .el-menu--horizontal > .el-menu-item {
    height: 60px;
    line-height: 60px;
  }
  
  .el-menu-item.is-active {
      color: #fff !important;
      // background: #1C2B36 !important;
      border-bottom: none;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}


</style>

