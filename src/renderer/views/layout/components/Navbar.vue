<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
		
				
		<div style="    display: inline-block;
    font-size: 14px;     float: left;
    line-height: 50px;
    margin-left: 10px; margin-right: 20px;">您好! {{name}}</div>
		
		<div class="right-menu">
		
		<screenfull class="right-menu-item hover-effect"/>
	
    <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
			
		
	
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
		</div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'

export default {
  components: {
    Breadcrumb,
    Hamburger,
		Screenfull
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
			'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  // .screenfull {
  //   position: absolute;
  //   right: 90px;
  //   top: 16px;
  //   color: red;
  // }
  // .avatar-container {
  //   height: 50px;
  //   display: inline-block;
  //   position: absolute;
  //   right: 35px;
  //   .avatar-wrapper {
  //     cursor: pointer;
  //     margin-top: 5px;
  //     position: relative;
  //     .user-avatar {
  //       width: 40px;
  //       height: 40px;
  //       border-radius: 10px;
  //     }
  //     .el-icon-caret-bottom {
  //       position: absolute;
  //       right: -20px;
  //       top: 25px;
  //       font-size: 12px;
  //     }
  //   }
  // }
	
	 .right-menu {
	  float: right;
	  height: 100%;
	  line-height: 50px;
	
	  &:focus {
	    outline: none;
	  }
	
	  .right-menu-item {
	    display: inline-block;
	    padding: 0 8px;
	    height: 100%;
	    font-size: 18px;
	    color: #5a5e66;
	    vertical-align: text-bottom;
	
	    &.hover-effect {
	      cursor: pointer;
	      transition: background .3s;
	
	      &:hover {
	        background: rgba(0, 0, 0, .025)
	      }
	    }
	  }
	
	  .avatar-container {
	    margin-right: 30px;
	
	    .avatar-wrapper {
	      margin-top: 5px;
	      position: relative;
	
	      .user-avatar {
	        cursor: pointer;
	        width: 40px;
	        height: 40px;
	        border-radius: 10px;
	      }
	
	      .el-icon-caret-bottom {
	        cursor: pointer;
	        position: absolute;
	        right: -20px;
	        top: 25px;
	        font-size: 12px;
	      }
	    }
	  }
	}
	
}
</style>

