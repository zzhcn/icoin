<template>
  <div>
    <el-container style=" border: 1px solid #eee">
      <el-aside width="150px" height="100vh" style="background-color: rgb(26,25,24)">
        <div class="nav_left_box" style="height: 100vh">
          <div v-for="(item,index) in menuData" :class="{'menu_active':activeIndex==index}">
            <span slot="title" @click="menuClick(index)"><i :class="item.icon"></i>
              <span style="display:inline-block;width: 60px;line-height: 60px;cursor: pointer">{{item.title}}</span></span>
          </div>
        </div>
      </el-aside>
      <el-container class="content_box">
        <el-header style="text-align: left; font-size: 12px;position: relative" class="header_box">
          <div class="login_state_box">
            <span>{{userName}}</span>
            <span @click="loginOut">退出</span>
          </div>
          <div class="icon_item" v-for="(item,index) in activeMenu" :class="{'icon_item_select':item.isActive==1}">
            <div class="is_active" v-if="item.isActive==1"></div>
            <span @click="activeClick(index)">{{item.title}}</span>
            <div class="close_icon el-icon-close" v-if="index!=0" @click="deleteActiveMenu(index)"></div>
          </div>
        </el-header>
        <router-view class="child_content_box"></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'index',
    components:{
    },
    data() {
      return {
        routerList:this.$router.options.routes[0].children,
        menuData:[],
        activeMenu:[],
        activeIndex:0,
        userName:''
      }
    },
    methods:{
      getUserInfo(){
        let that=this;
        let url='/usercenter/overview/';
        let callback=function (res) {
          that.userName=res.data.user_account;
        };
        this.httpGet(url,callback)
      },
      loginOut(){
        let that=this;
        const h = this.$createElement;
        let url='/user/logout/';
        let callback=function (res) {
          if(res.code==0){
            localStorage.removeItem('token');
            location.reload();
          }
        };
        this.httpGet(url,callback)
      },
      activeClick(index){
        this.$router.push(this.activeMenu[index].url);
        let activeData=this.activeMenu;
        for(let i=0; i<activeData.length;i++) {
          this.activeMenu[i].isActive = 0;
        }
        this.activeMenu[index].isActive = 1;
      },
      menuClick(index1){
        this.activeIndex=index1;
        let activeData=this.activeMenu;
        let isList=0;
        for(let i=0; i<activeData.length;i++){
          this.activeMenu[i].isActive=0;
          if((index1+1)==activeData[i].id){
            this.activeMenu[i].isActive=1;
            this.$router.push(activeData[i].url);
            isList=1;
          }
        }
        let data={
            title:this.menuData[index1].title,
            url:this.menuData[index1].path,
            isActive: 1,
            id:index1+1
          };
        if(!isList){
          this.activeMenu.push(data);
          this.$router.push(data.url)
        }

      },
      creatMenu(){
        let that=this;
        let menu=this.routerList;
        for(let i=0;i<menu.length;i++){
          if(menu[i].show==true){
            that.menuData.push(menu[i])
          }
        }
        let data={
          title:that.routerList[0].title,
          url:that.routerList[0].path,
          isActive:1,
          id:1
        };
        that.activeMenu.push(data);
      },
      deleteActiveMenu(index){
        if(this.activeMenu[index].isActive){
          this.activeMenu[index-1].isActive=1
        }
        this.activeMenu.splice(index,1);
        let len=this.activeMenu.length;
        this.$router.push(this.activeMenu[len-1].url)
      },
      searchToken(){
        let token=localStorage.getItem('token');
        if(!token){
          this.$router.push('/login')
        }
      }
    },
    mounted() {
      this.getUserInfo();
      this.creatMenu();
      this.searchToken()
    }
  };
</script>
<style scoped>
  .login_state_box span{
    position: relative;
    display: inline-block;
    line-height: 60px;
    margin-right: 30px;
    cursor: pointer;
  }
  .login_state_box{
    position: absolute;
    top: 0;
    right: 0;
    /*width: 100px;*/
    /*height: 30px;*/
    /*background-color: rebeccapurple;*/
  }
  .child_content_box{
    width: 1200px;
  }
  .content_box{
    position: relative;
    overflow: hidden;
  }
  .header_box{
    background-color: #e6e6e6 !important;
  }
  .menu_active{
    background-color: #55b737 !important;
  }
  .nav_left_box{
    position: relative;
    color: whitesmoke;
  }
  .is_active{
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 5px;
  }
  .close_icon{
    cursor: pointer;
  }
  .icon_item_select{
    background-color: #55b737!important;
    color: white;
  }
  .icon_item{
    display: inline-block;
    margin-left: 5px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    padding-right: 8px;
    padding-left: 8px;
    background-color: white;
  }
  .font_right{
    text-align: right;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
</style>

