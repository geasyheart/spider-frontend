<template>
    <div class="login">
      <div class="loginForm">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
          <el-form-item label="姓名/邮箱">
            <el-input v-model="ruleForm.email" type="email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="6" :offset="6">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-col>
            <!--<el-button @click="resetForm('ruleForm')">清空</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<style scoped>
  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #48576a;
  }
  .loginForm {
    padding: 35px 95px 15px 58px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
  }

</style>

<script>
  export default {
    data () {
      return {
        ruleForm: {
          name: '',
          password: '',
          email: ''
        },
        rules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      storeUserInfo (data) {
        sessionStorage.setItem('spider-token', data.result)
        sessionStorage.setItem('spider-username', this.ruleForm.name)
      },
      validateEmail (email) {
        let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        return re.test(String(email).toLowerCase())
      },
      submitForm (ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            let isEmail = this.validateEmail(this.ruleForm.email)
            if (!isEmail) {
              this.ruleForm.name = this.ruleForm.email
              this.ruleForm.email = ''
            } else {
              this.ruleForm.name = ''
            }
            this.$http.post('/api/v1/user/login', {
              'name': this.ruleForm.name,
              'email': this.ruleForm.email,
              'password': this.ruleForm.password

            }).then(response => {
              let resp = response.body
              if (resp.code !== 0) {
                this.$message(resp.result)
              } else {
                this.storeUserInfo(resp)
                this.$router.push('/')
              }
            }, response => {
                console.log(response.body)
                alert('request error.')
              })
          } else {
            return false
          }
        })
      },
      resetForm (ruleForm) {
        this.$refs[ruleForm].resetFields()
      }
    }
  }
</script>
