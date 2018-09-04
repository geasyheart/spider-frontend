<template>
  <div class="createPolicy">
    <el-row>
      <el-col :span="14" :offset="4">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form">
          <el-form-item label="policy" prop="policy">
            <el-input v-model="form.policy"></el-input>
          </el-form-item>
          <el-form-item label="name" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="任务类型">
            <el-checkbox-group v-model="form.task_type">
              <el-checkbox label="list" name="type"></el-checkbox>
              <el-checkbox label="data" name="type"></el-checkbox>
            </el-checkbox-group>
            <!--<el-radio-group v-model="form.task_type">-->
              <!--<el-radio label="list"></el-radio>-->
              <!--<el-radio label="data"></el-radio>-->
            <!--</el-radio-group>-->
          </el-form-item>
          <el-form-item label="repeat">
            <el-switch v-model="form.repeat"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  .form {
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
    border-radius: 6px;
    transition: all 400ms;
    padding: 10px
  }
</style>

<script>
  export default {
    data () {
      return {
        token: sessionStorage.getItem('spider-token'),
        form: {
          name: '',
          policy: '',
          task_type: [],
          repeat: true
        },
        rules: {
          name: [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 1, max: 120, message: '长度在1到120个字符', trigger: 'blur' }
          ],
          policy: [
            { required: true, message: '请输入policy', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在1到50个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            let tt = this.form.task_type.join('|')
            this.$http.post('/api/v1/policy', {'desc': this.form.name, 'policy': this.form.policy, 'task_type': tt, 'repeat': this.form.repeat}, {headers: {'Authorization': 'Bearer ' + this.token}}).then(
              response => {
                this.$message(response.body.result)
              }
            )
          } else {
            return false
          }
        })
      }
    }
  }
</script>
