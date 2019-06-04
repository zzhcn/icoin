<template>
  <div class="wealth_body">
    <div class="head_title">
      我的资产
    </div>
    <div style="text-align: left">
      <div class="wealth_count">
        <div>资产总额(人民币)：</div>
        <div>{{wealth}}</div>
      </div>
      <div class="wealth_count">
        <div>资产总收益：</div>
        <div>23.21%</div>
      </div>
    </div>
    <div class="data_table">
      <div>
        <span class="left">初始资金：</span>
        <span class="right border_right">{{capital.initialCapital}}</span>
      </div>
      <div>
        <span class="left">持仓天数：</span>
        <span class="right">2</span>
      </div>
      <div class="background">
        <span class="left">昨日资产：</span>
        <span class="right">2</span>
      </div>
      <div class="background">
        <span class="left">今日资产：</span>
        <span class="right">2</span>
      </div>
      <div>
        <span class="left">今日资产变动（CNY）：</span>
        <span class="right border_right">2</span>
      </div>
      <div>
        <span class="left">总资产变动（CNY）：</span>
        <span class="right">2</span>
      </div>
      <div class="background">
        <span class="left">当日收益率：</span>
        <span class="right">2</span>
      </div>
      <div class="background">
        <span class="left">累计收益率：</span>
        <span class="right">2</span>
      </div>
      <div>
        <span class="left">平均日受益：</span>
        <span class="right border_right">2</span>
      </div>
      <div>
        <span class="left">开始日期：</span>
        <span class="right">2</span>
      </div>
    </div>
    <div class="ex_list" v-for="(item,index) in listData.exList">
      <div class="table_title">
        <span>
        交易所：{{item.exName}}
        </span>
        <span>人民币估值：{{item.wealth}}</span>
      </div>
      <div class="table_box">
        <div class="table_item"></div>
      </div>
      <template>
        <el-table
          :data="item.coinList"
          style="width: 600px;">
          <el-table-column
            class="list_item"
            prop="coinName"
            label="币种"
            width="180">
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="wealth"
            label="人民币估值">
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        capital:{
          initialCapital:1
        },
        wealth: 99212.92,
        listData: {
          wealth: 99212.92,
          exList: [
            {
              exName: '火币',
              wealth: 34232,
              coinList: [
                {
                  coinName: 'btc',
                  number: 12,
                  wealth: 12313
                },
                {
                  coinName: 'btc',
                  number: 12,
                  wealth: 12313
                },
                {
                  coinName: 'btc',
                  number: 12,
                  wealth: 12313
                },
              ]
            },
            {
              exName: '火币',
              wealth: 34232,
              coinList: [
                {
                  coinName: 'btc',
                  number: 12,
                  wealth: 12313
                },
                {
                  coinName: 'btc',
                  number: 12,
                  wealth: 12313
                },
                {
                  coinName: 'btc',
                  number: 12,
                  wealth: 12313
                },
              ]
            },
            {
              exName: '火币',
              wealth: 34232,
              coinList: [
                {
                  coinName: 'btc',
                  number: 12,
                  wealth: 12313
                },
                {
                  coinName: 'btc',
                  number: 12,
                  wealth: 12313
                },
                {
                  coinName: 'btc',
                  number: 12,
                  wealth: 12313
                },
              ]
            },
          ]
        },
        wealthData:{
          //厨师
        }
      }
    }
  }
</script>

<style scoped>
  .border_right{
    border-right: 1px solid #f1f5fe;
    /*box-sizing: border-box;*/
  }
  .background{
    background-color:#f1f5fe ;
  }
  .left{
    display: inline-block;
    text-align: left;
    font-size: 14px;
    width: 240px;
    padding-left: 10px;
  }
  .right{
    display: inline-block;
    text-align: right;
    font-size: 14px;
    width: 229px;
    padding-right: 20px;
  }
  .data_table div{
    display: inline-block;
    width: 500px;
    line-height: 40px;
  }
  .data_table{
    text-align: left;
    margin-top: 30px;
    width: 1000px;
    font-size: 0;
    box-shadow: 0 0 3px #c3cedd;
  }
  .table_box{
    font-size: 0;
    position: relative;
  }
  .table_title span{
    margin-right: 30px;
    margin-left: 10px;
  }
  .table_title{
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    line-height: 50px;
  }
  .list_item{
    background-color: #f1f5fe;
  }
  .ex_list {
    position: relative;
    margin-top: 10px;
    border-radius: 5px;
    background-color: #f1f5fe;
    color: #3c76e4;
    width: 600px;
    border-bottom: 3px solid #3c76e4;
  }

  .wealth_count {
    text-align: center;
    margin-right: 30px;
    display: inline-block;
    position: relative;
    margin-top: 10px;
    line-height: 50px;
    border-radius: 5px;
    background-color: #f1f5fe;
    width: 300px;
    color: #3c76e4;
    height: 120px;
    border-bottom: 3px solid #3c76e4;
  }

  .head_title {
    width: 100%;
    line-height: 60px;
    border-bottom: 1px solid #eef1f5;
    text-align: left;
    font-size: 24px;
    font-weight: bold;
  }

  .wealth_body {
    position: relative;
    margin: 1%;
    /*background-color: rebeccapurple;*/
    width: 98%;
  }

</style>
