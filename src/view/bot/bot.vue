<template>
  <div class="log_box">
    <div class="log_user_capital">
      <div class="table_name">机器人列表</div>
      <div class="table_item_row table_head" v-for="(item,index) in tableData" >
        <div class="table_item_col">{{item.name}}</div>
        <div class="table_item_col"><el-button type="success">开启</el-button></div>
        <div class="table_item_col"><el-button type="danger">停止</el-button></div>
        <div class="table_item_col"><el-button type="primary">重启</el-button></div>
        <div class="table_item_col"><el-button type="info" @click="toLog(item.id)">日志</el-button></div>
        <div class="table_item_col" v-if="item.state==0">运行中</div>
        <div class="table_item_col" v-if="item.state==1">已停止</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bot",
    data(){
      return {
        tableData:[
          {
            name:'统计一号',
            id:1
          }
        ]
      }
    },
    methods:{
      toLog(id){
        localStorage.setItem('botId',id);
        this.$router.push('/botlog')
      },
      getList(){
        let that=this;
        let url='/robots/list/';
        let callback=function (res) {
          that.tableData=res.data.robots;
          console.log(res)
        };
        this.httpGet(url,callback)
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style scoped>

  .table_name {
    margin-left: 20px;
    line-height: 40px;
    font-size: 20px;
    font-weight: bold;
    border-left: 3px solid #0a76a4;
    padding-left: 10px;
    /*color: #b11409;*/
  }
  .log_box {
    padding: 10px;
    width: 1300px;
    height: auto;
    margin: 20px auto;
    border: 1px solid #d8dce5;
    border-radius: 5px;
  }
  .table_head {
    background-color: #f5f5f5;
    font-weight: bold;
  }
  .table_item_col {
    display: inline-block;
    padding: 5px;
    width: 130px;
    text-align: center;
  }

  .table_item_col span{
    display: inline-block;
    background-color: #337ab7;
    color: whitesmoke;
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
  }
  .table_item_row {
    line-height: 100%;
    text-align: left;
    border-top: 1px solid #d8dce5;
  }

  .table_head {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  .log_user_capital {
    border: 1px solid #d8dce5;
    border-radius: 5px;
    text-align: left;
    margin-bottom: 20px;
  }

</style>
