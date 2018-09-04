<template>
    <el-container class="fillContain">
        <el-menu background-color="rgb(50, 64, 87)"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router
                 class="el-menu-vertical-demo"
        >
          <el-menu-item index="/"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-location"></i>用户管理</template>
            <el-menu-item index="/users">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>策略管理</template>
            <el-menu-item index="/policies">策略列表</el-menu-item>
            <el-menu-item index="/policy">创建策略</el-menu-item>
          </el-submenu>
          <!--<el-submenu index="3">-->
            <!--<template slot="title"><i class="el-icon-edit"></i>任务管理</template>-->
            <!--<el-menu-item index="/task">任务列表</el-menu-item>-->
          <!--</el-submenu>-->
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-arrow-down"></i>客户端</template>
            <el-menu-item index="/client">客户端列表</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>设置</template>
            <el-menu-item index="/admin">管理员设置</el-menu-item>
          </el-submenu>
        </el-menu>

      <el-container>
        <el-header style="text-align: right; font-size: 12px; line-height: 60px;background-color:#EFF2F7">
          <el-dropdown @command="handleCommand">
            <i style="margin-right: 15px">
              <span>{{username}}</span>
            </i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-header>

        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>

    </el-container>
</template>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 300px;
    /*min-height: 1400px;*/
  }

</style>

<script>
export default {
  computed: {

  },
  data () {
    return {
      token: sessionStorage.getItem('spider-token'),
      username: sessionStorage.getItem('spider-username')
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        this.logout()
      }
    },
    checkLogin () {
      if (sessionStorage.getItem('spider-token') == null || sessionStorage.getItem('spider-username') == null) {
        this.$router.push('/login')
      }
    },
    logout () {
      sessionStorage.removeItem('spider-token')
      sessionStorage.removeItem('spider-username')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
