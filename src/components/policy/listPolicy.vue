<template>
  <!--列出policy-->
  <div class="policy">
    <el-row>
      <el-col :span="4" :offset="14">
        <el-input v-model="policyName" placeholder="请输入策略"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="getPolicy">查询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData"
                style="width:100%"
                v-loading="loading"
      >
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="policy" label="策略">
        </el-table-column>
        <el-table-column prop="desc" label="名字">
        </el-table-column>
        <el-table-column prop="task_type" label="去重标志">
        </el-table-column>
        <el-table-column label="repeat">
          <template slot-scope="scope">
            {{scope.row.repeat}}
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="创建者">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" v-if="scope.row.id">
            <el-button @click="handleRow(scope.row)" type="text" size="small">修改</el-button>
            <el-popover
              placement="top"
              width="445"
              trigger="click"
            >
              <div>
                <el-table :data="taskDetail">
                  <el-table-column label="list">
                    <el-table-column label="total" prop="list.total"></el-table-column>
                    <el-table-column label="success" prop="list.success"></el-table-column>
                    <el-table-column label="%">
                      <template slot-scope="scope">
                        {{(scope.row.list.success / (scope.row.list.total || 1)).toFixed(2)}}
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="data">
                    <el-table-column label="total" prop="data.total">success</el-table-column>
                    <el-table-column label="success" prop="data.success"></el-table-column>
                    <el-table-column label="%">
                      <template slot-scope="scope">
                        {{(scope.row.data.success / (scope.row.data.total || 1)).toFixed(2)}}
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </div>
              <el-button slot="reference" type="text" size="small" @click="renderTask(scope.row)">任务</el-button>
            </el-popover>
            <!--<el-button @click="getTask(scope.row)" type="text" size="small">任务</el-button>-->
          </template>

        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="rowCenter">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper"
        :total="policyCount">
      </el-pagination>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form" :model="selectRow">
        <el-form-item label="desc">
          <el-input v-model="selectRow.desc"></el-input>
        </el-form-item>
        <el-form-item label="repeat">
          <el-switch v-model="selectRow.repeat" active-color="#13ce66"
                     inactive-color="#ff4949"></el-switch>
          <!--<el-input v-model="selectRow.repeat"></el-input>-->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyPolicy">确 定</el-button>
      </span>
    </el-dialog>
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
        token: sessionStorage.getItem('spider-token'),
        tableData: [{
          id: '',
          policy: '',
          desc: '',
          task_type: '',
          repeat: '',
          creator: ''
        }],
        policyCount: 0,
        policyName: 'all',
        loading: true,
        dialogVisible: false,
        selectRow: {},
        taskDetail: [{
          data: {
            success: 0,
            total: 1
          },
          list: {
            success: 0,
            total: 2
          }
        }]
      }
    },
    methods: {
      renderTable(data, count) {
        this.tableData = data
        this.policyCount = count
        this.loading = false
      },
      listPolicy(page) {
        this.$http.get('/api/v1/policy?policy=all&page=' + page, {headers: {'Authorization': 'Bearer ' + this.token}}).then(
          response => {
            this.renderTable(response.body.result.policies, response.body.result.count)
          }
        )
      },
      handleCurrentChange(page) {
        this.listPolicy(page)
      },
      getPolicy() {
        this.$http.get('/api/v1/policy?policy=' + this.policyName, {headers: {'Authorization': 'Bearer ' + this.token}}).then(
          response => {
            let payload = response.body.result

            this.renderTable(payload.policies, payload.count)

          }
        )
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      handleRow(row) {
        this.dialogVisible = true
        this.selectRow = row
      },
      modifyPolicy() {
        this.$http.put('/api/v1/policy', {
            'policy': this.selectRow.policy,
            'desc': this.selectRow.desc,
            'task_type': this.selectRow.task_type,
            'repeat': this.selectRow.repeat
          },
          {
            headers: {'Authorization': 'Bearer ' + this.token}
          }).then(
          response => {
            this.dialogVisible = false
          }
        )
      },
      // getTask (row) {
      //   this.$router.push({path: '/task', query: {'policy': row.policy}})
      // },
      renderTask(row) {
        this.$http.get('/spider/task?policy=' + row.policy, {headers: {'Authorization': 'Bearer ' + this.token}}).then(
          response => {
            this.taskDetail = [response.body]
          }
        )
      }
    },
    mounted() {
      this.listPolicy(1)
    }
  }
</script>
