<template>
  <div>
    <div id="zz" @click="hideVideo">
      <video id="big" :src="videosrc" controls="" width="600px" height="600px"></video>
    </div>
    <!-- <el-radio-group v-model="radio">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group> -->
    <InputGroup label="账号" placeholder="请填写邮箱" v-model="user.email"></InputGroup>
    <el-row>
      <el-col class="tableRow" :xs="24" :sm="24" :lg="24">
        <h3>视频卡牌播放完成率</h3>
        <el-table
          :data="videoData"
          border
          @selection-change="changeFun"
          style="width: 100%">

          <el-table-column type="selection">
          </el-table-column>
          <el-table-column
            align="center"
            label="视频Id">
            <template slot-scope="scope">
              <a
                :href="'http://custom.gmugmu.com/view/index-index#/qiNiuUnited?slectVideoId='+scope.row.videoId"
                target="_blank"
                style="color: #46A3FF;"
              >
                {{scope.row.videoId}}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="状态">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.status=='1'">正常</span>
              <span v-else-if="scope.row.status=='2'">屏蔽</span>
              <span v-else-if="scope.row.status=='3'">沉底</span>
              <span v-else></span> -->
              <p style="color:red">{{userStaus[scope.row.status]}}</p>
              <p>哈哈哈</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="标签">
            <template slot-scope="scope">
              <span v-for="(item,index) in scope.row.tags" :key="index">{{item}},</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="values"
            label="播放率">
          </el-table-column>
          <el-table-column
            align="center"
            label="视频">
            <template slot-scope="scope"> 
              <a style="position:relative;float: left;margin-right: 10px;margin-bottom: 10px;">
                <video @click="play(scope.row.video)" :src="scope.row.video" style="width:120px;height:60;float:left;" />
                <img @click="play(scope.row.video)" class="controlIcon" style="position:absolute;top:50%;left:50%;width:20px;height:20px;margin-left:-10px!important;margin-top:-10px!important;" src="@/assets/icon/timg.png" />
              </a>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="图片">
            <template slot-scope="scope"> 
              <img :src="scope.row.img" preview="1" alt="" style="width:120px;height:60;" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="images"
            label="图片">
            <template slot-scope="scope"> 
              <img 
               :src="item" 
               v-for="item in scope.row.images" 
               :key="item"
               preview="1" 
               alt="" 
               style="width:120px;height:60;float:left;" />
            </template>
          </el-table-column>
        </el-table>
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
import InputGroup from '@/components/Form/InputGroup'

export default {
  name: 'Dashboard',
  components: {
    InputGroup
  },
  data(){
    return{
      videosrc:'',
      videoShow:false,
      checkBoxData:[],
      radio:3,
      user:{
        email:''
      },
      userStaus:{
        '1':'正常',
        '2':'屏蔽',
        '3':'沉底'
      },
      tags:['追星','唱歌','跳舞','happy','哈哈哈'],
      videoData:[{
        videoId:11111,
        values:10000,
        status:1,
        img:'http://jimu-cover-new.cdn.bcebos.com/6450629_iiiiii',
        images:[
          'http://jimu-cover-new.cdn.bcebos.com/6450629_iiiiii',
          'http://jimu-cover-new.cdn.bcebos.com/6450628_iiiiii'
        ],
        tags:['追星','唱歌','跳舞','happy','哈哈哈'],
        video:'http://images.gmugmu.com//6435286/0595a57ecb7bd36f8c3cf7fd7588f7a9_video'
      },{
        videoId:2222,
        values:10000,
        status:2,
        img:'http://jimu-cover-new.cdn.bcebos.com/6450628_iiiiii',
        images:[
          'http://jimu-cover-new.cdn.bcebos.com/6450629_iiiiii',
          'http://jimu-cover-new.cdn.bcebos.com/6450628_iiiiii'
        ],
        tags:['追星','唱歌','跳舞','happy','哈哈哈'],
        video:'http://images.gmugmu.com//6464315/a63cfc4c37242e61b883bb9b85b2774a_0'
      },{
        videoId:333333,
        values:10000,
        status:3,
        img:'http://jimu-cover-new.cdn.bcebos.com/6450627_iiiiii',
        images:[
          'http://jimu-cover-new.cdn.bcebos.com/6450629_iiiiii',
          'http://jimu-cover-new.cdn.bcebos.com/6450628_iiiiii'
        ],
        tags:['追星','唱歌','跳舞','happy','哈哈哈'],
        video:'http://images.gmugmu.com//5707188/13dd10b606c414e11a531918a35ce25a_video'
      },{
        videoId:44444,
        values:10000,
        status:4,
        img:'http://jimu-cover-new.cdn.bcebos.com/6450621_iiiiii',
        images:[
          'http://jimu-cover-new.cdn.bcebos.com/6450629_iiiiii',
          'http://jimu-cover-new.cdn.bcebos.com/6450628_iiiiii'
        ],
        tags:['追星','唱歌','跳舞','happy','哈哈哈'],
        video:'http://images.gmugmu.com//1486114/da4050b35c4bacc25295a537cfe7eb26_0'
      }]
    }
  },
  mounted() {

  },
  methods: {
    play(url) {
      console.log(url)
      let list = document.querySelectorAll('video');
		  let big = document.querySelector('#big');
		  let zz = document.querySelector('#zz');
      zz.style.display = 'block';
      big.src = url;
      //播放
      big.play();
    },
    hideVideo() {
      let zz = document.querySelector('#zz')
      let big = document.querySelector('#big');
      zz.style.display = 'none'
      big.pause();
    },
    changeFun(val) {
      this.checkBoxData = []
        val.filter((item,index) => {
          this.checkBoxData.push(item.videoId)
        })
        console.log(this.checkBoxData.join())
    }

  }
}
</script>

<style scoped>
#zz {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .6);
  z-index: 9999;
}

#zz video {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
