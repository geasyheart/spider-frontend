<template>
  <div class="register">
    <div class="registerForm">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
  a {
    text-decoration: none;
  }

  .register {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #48576a;
  }

  .registerForm {
    padding: 35px 95px 15px 58px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
  }

</style>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          password: '',
          email: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在3到20个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$http.post('/api/v1/user/register', {
              'name': this.ruleForm.name,
              'email': this.ruleForm.email,
              'password': this.ruleForm.password

            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(response => {
              let resp = response.body
              if (resp.code !== 0) {
                this.$message(resp.result)
              } else {
                this.$router.push('/login')
              }
            }, response => {
              alert('request error.')
            })
          } else {
            return false
          }
        })
      },
      resetForm(ruleForm) {
        this.$refs[ruleForm].resetFields()
      }
    }
  }
</script>
