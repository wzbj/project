<template>
  <div>
    <el-row>
      <el-col class="tableRow" :xs="24" :sm="24" :lg="24">
        <h3>视频卡牌播放完成率</h3>
        <el-table
          :data="videoData"
          border
          style="width: 100%">
          <el-table-column
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
            prop="values"
            label="播放率">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data(){
    return{
      videoData:[{
        videoId:11111,
        values:10000
      },{
        videoId:2222,
        values:10000
      },{
        videoId:333333,
        values:10000
      },{
        videoId:44444,
        values:10000
      }]
    }
  }
}
</script>
