<template>
  <div>
    <div class="log_box">
      <div class="log_user_capital" v-for="(item,index) in tableData">
        <div class="table_name">{{item.name}}</div>
        <div class="table_item_row" v-for="(item1,index1) in item.data" :class="{'table_head':index1==0}">
          <div class="table_item_col" v-for="(item2,index2) in item1">{{item2}}</div>
        </div>
      </div>
      <div class="chart_box">
      </div>
      <div class="log_text_box">
        <div class="table_head log_head">
          <div class="log_time_head">时间</div>
          <div class="log_type_head">类型</div>
          <div class="log_content_ex">平台</div>
          <div class="log_content_price">价格</div>
          <div class="log_content_number">数量</div>
          <div class="log_content_message">信息</div>
        </div>
        <div v-for="(item,index) in logData" class="log_item">
          <div class="log_time">{{changeTime(item.timestamp)}}</div>
          <div class="log_type_head2">
            <div class="log_type_error" v-if="item.info_type=='-1'">错误</div>
            <div class="log_type_trade" v-if="item.info_type=='1'">买入</div>
            <div class="log_type_trade" v-if="item.info_type=='2'">卖出</div>
            <div class="log_type_text" v-if="item.info_type=='0'">信息</div>
            <div class="log_type_balance" v-if="item.info_type=='3'">撤销</div>
          </div>
          <!--<div class="log_type_trade">{{item.type}}</div>-->
          <!--<div class="log_type_text">{{item.type}}</div>-->

          <div class="log_content">
            <div class="log_content_ex" v-if="item.exchange!=null&&item.exchange!=''">{{item.exchange}}</div>
            <div class="log_content_price" v-if="item.exchange!=null&&item.exchange!=''">{{item.price}}</div>
            <div class="log_content_number" v-if="item.exchange!=null&&item.exchange!=''">{{item.amount}}</div>
            <div class="log_content_message">{{item.msg}}</div>
          </div>
        </div>
        <div class="page_size_box">
          <div class="block">
            <el-pagination
              @current-change="pageChange"
              :current-page.sync="logNowPage"
              layout="prev, pager, next, jumper"
              background
              :page-count="logPages">
            </el-pagination>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>

  import echarts from 'echarts'

  export default {
    name: 'botlog',
    data() {
      return {
        logPages: 0,
        logNowPage: 1,
        tableData: [
        ],
        logData:[],
        id: 'chart_box',
        chart: null,
        chartData: [],

      }
    },
    methods: {
      changeTime(time){
        let times=new Date(time);
        return times.getFullYear()+'.'+(times.getMonth()+1)+'.'+times.getDate()+'--'+times.getHours()+':'+times.getMinutes()+':'+times.getSeconds()
      },
      initChart(id,index) {
        let that=this;
        let myChart = echarts.init(document.getElementById(id));
        let option = that.chartData[index];
        myChart.setOption(option);
        setInterval(function() {
          myChart.setOption(that.chartData[index])
        }, 3000)
      },
      getBot(){
        let that=this;
        let url='/robots/charts/'+localStorage.getItem('botId')+'/'+'graph';
        let callback=function (res) {
          that.chartData=res;
          for (let i = 0; i < that.chartData.length; i++) {
            that.createChart(i)
          }
        };
        this.httpGet(url,callback)
      },
      getBotData(){
        let that=this;
        let url='/robots/charts/'+localStorage.getItem('botId')+'/'+'graph';
        let callback=function (res) {
          // console.log(res);
          that.chartData=res;
        };
        this.httpGet(url,callback)
      },
      getLogData(){
        let that=this;
        let url='/robots/logs/'+localStorage.getItem('botId')+'/?page='+that.logNowPage+'&size=20';
        let callback=function (res) {
          if(res.code==0){
            that.logData=res.data.logs;
            that.logPages=res.data.total_pages
          }
          console.log(res);
        };
        this.httpGet(url,callback)
      },
      getTableData(){
        let that=this;
        let url='/robots/charts/'+localStorage.getItem('botId')+'/'+'table';
        let callback=function (res) {
          that.tableData=res;
          // console.log(res)
        };
        this.httpGet(url,callback)
      },

      createChart(i) {
        let domFather = document.getElementsByClassName('chart_box')[0];
        let dom = document.createElement('div');
        dom.setAttribute('id', 'chart' + i);
        dom.classList.add('chart_item');
        dom.style.height = '400px';
        domFather.appendChild(dom);
        this.initChart('chart' + i,i)
      },
      pageChange(data) {
        console.log(data)
      }
    },
    mounted() {
      let that=this;
      setInterval(function () {
        that.getBotData();
        that.getTableData();
        that.getLogData();
      },3000);
      this.getBot();
      this.getTableData();
      this.getLogData();
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

  .chart_box {
    width: 100%;
    /*width: 1px;*/
    /*height: 400px;*/
    margin: 30px auto;
  }

  /*#chart_box{*/
  /*width: 100%;*/
  /*height: 400px;*/
  /*margin:  30px auto;*/
  /*}*/
  .chart_item {
    width: 100%;
    height: 400px !important;
    margin: 30px auto;
  }

  .page_size_box {
    width: 550px;
    margin: 10px auto;
  }
  .log_item div{
    text-align: left;
  }
  .log_item {
    position: relative;
    /*height: 40px;*/
    text-align: left;
    margin-top: 10px;
    height: 50px;
    border-bottom: 1px solid #c3cedd;

  }

  .log_type_balance {
    background-color: #42b983;
    position: absolute;
    top: 0;
    left: 165px;
    padding: 5px;
    border-radius: 5px;
    color: white;
    height: 30px;
  }

  .log_type_text {
    background-color: #5bc0de;
    position: absolute;
    top: 0;
    left: 165px;
    padding: 5px;
    border-radius: 5px;
    color: white;
    height: 30px;
  }

  .log_type_trade {
    background-color: #337ab7;
    position: absolute;
    top: 0;
    left: 165px;
    padding: 5px;
    border-radius: 5px;
    color: white;
    height: 30px;
  }

  .log_type_error {
    background-color: #d9534f;
    position: absolute;
    top: 0;
    left: 165px;
    padding: 5px;
    border-radius: 5px;
    color: white;
    height: 30px;
  }

  .log_head {
    height: 30px;
    line-height: 30px;
    padding-left: 5px;
    border-bottom: 1px solid #d8dce5;
  }

  .log_type_head {
    display: inline-block;
    width: 100px;
    line-height: 30px;
    text-align: center;
  }
  .log_type_head2 {
    display: inline-block;
    width: 50px;
    text-align: center;
    line-height: 30px;
  }
  .log_type_head2 div{
    margin-left: 25px;
  }

  .log_content_head {
    display: inline-block;
    width: 1040px;
    line-height: 30px;
  }
  .log_content_ex{
    display: inline-block;
    width: 60px;
    line-height: 30px;
  }
  .log_content_price{
    display: inline-block;
    width: 60px;
    line-height: 30px;
  }
  .log_content_number{
    display: inline-block;
    width: 60px;
    line-height: 30px;
  }
  .log_content_message{
    display: inline-block;
    /*width: 60px;*/
    line-height: 30px;
    margin-left: 14px;
  }


  .log_time_head {
    display: inline-block;
    width: 160px;
    line-height: 30px;
  }

  .log_type {
    position: absolute;
    top: 0;
    left: 165px;
    width: 50px;
  }

  .log_content {
    position: relative;
    margin-top: -14px;
    margin-left: 255px;
    width: 1040px;
    overflow: auto;
  }
  .log_content div{
    text-align: center;
  }

  .log_time {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 160px;
  }

  .log_text_box {
    width: 100%;
    margin-top: 30px;
    border: 1px solid #d8dce5;
    border-radius: 5px;
  }

  .table_item_col {
    display: inline-block;
    padding: 5px;
    width: 130px;
    text-align: center;
  }

  .table_item_row {
    line-height: 100%;
    text-align: left;
  }

  .table_head {
    background-color: #f5f5f5;
    font-weight: bold;
    text-align: left;
  }

  .log_user_capital {
    border: 1px solid #d8dce5;
    border-radius: 5px;
    text-align: left;
    margin-bottom: 20px;
  }

  .log_box {
    padding: 10px;
    width: 1300px;
    height: auto;
    margin: 20px auto;
    border: 1px solid #d8dce5;
    border-radius: 5px;
  }
</style>
