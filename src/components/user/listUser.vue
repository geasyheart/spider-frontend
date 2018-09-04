<template>
  <!--列出用户-->
  <div class="user">
    <el-row>
      <el-table
        :data="tableData"
        v-loading="loading"
        style="width:100%">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="public_id" label="PublicID">
        </el-table-column>
        <el-table-column prop="name" label="用户名">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column label="管理员">
          <template slot-scope="scope">
            {{scope.row.role == 1}}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="rowCenter">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper"
        :total="userCount">
      </el-pagination>
    </el-row>
  </div>
</template>

<style scoped>
  .rowCenter {
    text-align: center;
  }

</style>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '',
          role: '',
          email: '',
          public_id: '',
          name: ''
        }],
        userCount: 0,
        loading: true
      }
    },
    methods: {
      listUser(page = 1) {
        let token = sessionStorage.getItem('spider-token')
        let authHeaders = {'Authorization': 'Bearer ' + token}
        this.$http.get('/api/v1/user/show?page=' + page, {headers: authHeaders}).then(response => {
          this.tableData = response.body.result.users
          this.userCount = response.body.result.count
          this.loading = false
        }, response => {
          this.loading = true
          alert('request error.')
        })
      },
      handleCurrentChange(page) {
        this.listUser(page)
      }
    },
    mounted() {
      this.listUser()
    }
  }
</script>
