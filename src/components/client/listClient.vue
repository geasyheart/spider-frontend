<template>
  <!--列出client-->
  <div class="client">
    <el-row>
      <el-col :span="4" :offset="14">
        <el-input v-model="info" placeholder="请输入用户名"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="listClient">查询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="client"
                style="width:100%"
                v-loading="loading"
      >
        <el-table-column prop="client_id" label="客户端ID">
        </el-table-column>
        <el-table-column prop="client_ip" label="IP地址">
        </el-table-column>
        <el-table-column prop="name" label="用户名">
        </el-table-column>
        <el-table-column prop="policy" label="策略">
        </el-table-column>
        <el-table-column label="online">
          <template slot-scope="scope"> {{scope.row.online? '1':'0'}}</template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="rowCenter">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper"
        :total="clientCount">
      </el-pagination>
    </el-row>
  </div>

</template>

<style scoped>
  .rowCenter{
    text-align: center;
  }

</style>

<script>
  export default {
    data () {
      return {
        token: sessionStorage.getItem('spider-token'),
        loading: false,
        info: 'all',
        client: [{
          client_id: '',
          client_ip: '',
          name: '',
          policy: '',
          online: ''
        }],
        clientCount: 0
      }
    },
    methods: {
      listClient (page = 1) {
        this.$http.get('/api/v1/client/show?info=' + this.info, {headers: {'Authorization': 'Bearer ' + this.token}}).then(
          response => {
            this.renderPage(response.body.result)
          }
        )
      },
      renderPage (data) {
        this.client = data
      },
      handleCurrentChange (page) {
        this.listClient(page)
      }
    },
    mounted () {
      this.listClient(1)
    }
  }
</script>
