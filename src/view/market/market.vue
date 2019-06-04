<template>
  <div class="app-container">
    <template>
      <el-select v-model="coinName" placeholder="请选择" @change="changeCoin">
        <el-option
          v-for="item in coinList"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </template>
    <div class="block" style="display: inline-block;margin-left: 15px">
      <span class="demonstration">新增A</span>
      <el-cascader
        :options="options"
        v-model="selectedOptionsA">
      </el-cascader>
    </div>
    <div class="block" style="display: inline-block;margin-left: 15px">
      <span class="demonstration">新增B</span>
      <el-cascader
        :options="options"
        v-model="selectedOptionsB">
      </el-cascader>
    </div>
    <div style="display: inline-block;margin-left: 15px" @click="setExample">确认</div>
    <div class="tHead_box">
      <div class="tHead"></div>
    </div>
    <template>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="类型"
          width="200">
          <template slot-scope="scope">
            <!--<span style="margin-left: 10px">{{ scope.row.aName }}</span>-->
            <span style="margin-left: 10px">{{ scope.row.aName }}{{ scope.row.aType }}----{{ scope.row.bName }}{{ scope.row.bType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="A价格"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{priceIsShow(scope.row.aName,scope.row.aType)}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="B价格"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{priceIsShow(scope.row.bName,scope.row.bType)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="价差"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{countPersent(priceIsShow(scope.row.bName,scope.row.bType),priceIsShow(scope.row.aName,scope.row.aType))}}%</span>
          </template>
        </el-table-column>
        <el-table-column
          label="盘口深度"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{countMin(priceIsNum(scope.row.bName,scope.row.bType),priceIsNum(scope.row.aName,scope.row.aType))}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="行情类型"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{countWay(priceIsShow(scope.row.bName,scope.row.bType),priceIsShow(scope.row.aName,scope.row.aType))}}</span>
          </template>
        </el-table-column>

      </el-table>
    </template>
    <template>
      <el-table
        :data="tab"
        style="width: 100%">
        <el-table-column
          label="okEx现货"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ okSpot }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="okEx当周"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ okThis}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="okEx次周"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ okNext }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="okEx季度"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{okQuarter}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="huoBi现货"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ huoBiSpot }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="huoBi当周"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ huoBiThis }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="huoBi次周"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{huoBiNext}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="huoBi季度"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{huoBiQuarter}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="bitMex"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{bitMexSpot}}</span>
          </template>
        </el-table-column>

      </el-table>
    </template>
    <div id="chart" class="echart_box"></div>
  </div>
</template>

<script>

  import echarts from 'echarts'
  import http from 'axios/index'
  export default {
    name: 'market',
    data() {
      return {
        okHttp:null,
        okBaseUrl: 'https://www.okex.com',
        chart: null,
        tab: [1],
        htmlText: null,
        okThis: 0,
        okNext: 0,
        okQuarter: 0,
        okSpot: 0,
        huoBiThis: 0,
        huoBiNext: 0,
        huoBiQuarter: 0,
        huoBiSpot: 0,
        bitMex: 0,
        bitMexSpot:0,
        bitMexThis:0,
        bitMexNext:0,
        bitMexQuarter:0,
        okThisNum: 0,
        okNextNum: 0,
        okQuarterNum: 0,
        okSpotNum: 0,
        huoBiThisNum: 0,
        huoBiNextNum: 0,
        huoBiQuarterNum: 0,
        huoBiSpotNum: 0,
        bitMexNum: 0,
        bitMexSpotNum:0,
        bitMexThisNum:0,
        bitMexNextNum:0,
        bitMexQuarterNum:0,
        selectedOptionsA: null,
        selectedOptionsB: null,
        options: [
          {
            value: 'okEx',
            label: 'okEx',
            children: [
              {
                value: '现货',
                label: '现货'
              },

              {
                value: '当周',
                label: '当周'
              },
              {
                value: '次周',
                label: '次周'
              },
              {
                value: '季度',
                label: '季度'
              }
            ]
          },

          {
            value: 'huoBi',
            label: 'huoBi',
            children: [
              {
                value: '现货',
                label: '现货'
              },

              {
                value: '当周',
                label: '当周'
              },
              {
                value: '次周',
                label: '次周'
              },
              {
                value: '季度',
                label: '季度'
              }
            ]
          },
          {
            value: 'bitMex',
            label: 'bitMex',
            children: [
              {
                value: '现货',
                label: '现货'
              }
            ]
          }
        ],
        ws1: null,
        ws2: null,
        ws3: null,
        ws4: null,
        ws5: null,
        coinName: 'BTC',
        coinList: ['BTC', 'EOS', 'BCH', 'ETH', 'ETC', 'XRP', 'LTC'],
        price: {
          now: 0,
          next: 0,
          quarter: 0
        },
        tableData: [
        ]
      }
    },

    methods: {
      createTable(){
        let data=this.options;
        for(let i=0;i<data.length;i++){
          for(let j=0;j<data[i].children.length;j++){
            for(let k=0;k<data.length;k++){
              for(let l=0;l<data[k].children.length;l++){
                if((k>i&&j==l)||(k==i&&j!=l)){
                  // if(!(data[i].value==data[k].value&&data[i].children[j].value==data[k].children[l].value)){
                  this.tableData.push({
                    aName:data[i].value,
                    aType:data[i].children[j].value,
                    bName: data[k].value,
                    bType: data[k].children[l].value
                  })
                  // }
                }
              }
            }
          }
        }
      },
      priceIsShow(exName,type){
        switch(exName){
          case 'okEx':
            switch (type) {
              case '现货':
                return this.okSpot
              case '当周':
                return this.okThis
              case '次周':
                return this.okNext
              case '季度':
                return this.okQuarter
            }
          case 'huoBi':
            switch (type) {
              case '现货':
                return this.huoBiSpot
              case '当周':
                return this.huoBiThis
              case '次周':
                return this.huoBiNext
              case '季度':
                return this.huoBiQuarter
            }
          case 'bitMex':
            switch (type) {
              case '现货':
                return this.bitMexSpot
              case '当周':
                return this.bitMexThis
              case '次周':
                return this.bitMexNext
              case '季度':
                return this.bitMexQuarter
            }
        }

      },
      priceIsNum(exName,type){
        switch(exName){
          case 'okEx':
            switch (type) {
              case '现货':
                return this.okSpotNum
              case '当周':
                return this.okThisNum
              case '次周':
                return this.okNextNum
              case '季度':
                return this.okQuarterNum
            }
          case 'huoBi':
            switch (type) {
              case '现货':
                return this.huoBiSpotNum
              case '当周':
                return this.huoBiThisNum
              case '次周':
                return this.huoBiNextNum
              case '季度':
                return this.huoBiQuarterNum
            }
          case 'bitMex':
            switch (type) {
              case '现货':
                return this.bitMexSpotNum
              case '当周':
                return this.bitMexThisNum
              case '次周':
                return this.bitMexNextNum
              case '季度':
                return this.bitMexQuarterNum
            }
        }

      },
      getOkKline() {
        let url = this.okBaseUrl + '/api/futures/v3/instruments/EOS-USD-190628/candles?granularity=3600'
        http.get(url, {}).then(function(res) {
          // console.log(res)
          // console.log(res)
          // console.log(res)
        })
          .catch(function(err) {
            // console.log(err)
            // console.log(err)
            // console.log(err)
          })

      },
      creatE() {
        let myChart = echarts.init(document.getElementById('chart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '价差图表' },
          tooltip: {},
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {},
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }, {
            data: [1820, 1932, 1901, 1934, 2290, 2330, 2320],
            type: 'line',
            smooth: true
          }]
        })
      },
      setExample() {
        let data = {
          aName: this.selectedOptionsA[0],
          aType: this.selectedOptionsA[1],
          bName: this.selectedOptionsB[0],
          bType: this.selectedOptionsB[1]
        }
        this.tableData.push(data)
      },
      //币种切换
      changeCoin() {
        let that = this
        this.closeAll()
        that.okThis = 0
        that.okNext = 0
        that.okQuarter = 0
        that.okSpot = 0
        that.huoBiThis = 0
        that.huoBiNext = 0
        that.huoBiQuarter = 0
        that.huoBiSpot = 0
        that.bitMexSpot = 0
        that.okThisNum = 0
        that.okNextNum = 0
        that.okQuarterNum = 0
        that.okSpotNum = 0
        that.huoBiThisNum = 0
        that.huoBiNextNum = 0
        that.huoBiQuarterNum = 0
        that.huoBiSpotNum = 0
        that.bitMexSpotNum = 0
        this.getOk()
        this.getHuobi()
        this.getBitmex()
        this.getHuobiSpot()
        this.getOkSpot()
      },
      //关闭所有soket
      closeAll() {
        this.ws1.close()
        this.ws2.close()
        this.ws3.close()
        this.ws4.close()
        this.ws5.close()
      },
      pingPong() {

      },
      //最小值计算
      countMin(p1, p2) {
        let nP1=parseFloat(p1)
        let nP2=parseFloat(p2)
        if (nP1 >= nP2) {
          return nP1.toFixed(2)
        } else {
          return nP2.toFixed(2)
        }
      },
      //升贴水行情判断
      countWay(p1, p2) {
        if (p1 >= p2) {
          return '贴水行情'
        } else {
          return '升水行情'
        }
      },
      //价差比例
      countPersent(p1, p2) {
        return ((p1 - p2) / p1 * 100).toFixed(2)
      },
      //OK期货soket连接
      getOk() {
        let that = this
        const pako = require('pako')
        this.ws3 = new WebSocket('wss://okexcomreal.bafang.com:10441/websocket')
        // let ws3 = new WebSocket("wss://real.okex.com:10442/ws/v3");
        this.ws3.addEventListener('open', function(e) {
          console.log('send1')
          // let str='{"op": "subscribe", "args": ["futures/ticker:BTC-USD-170310"]}'
          let coinName = that.coinName
          let str = '[{\'event\':\'addChannel\',\'channel\':\'ok_sub_futureusd_' + coinName + '_depth_this_week_5\'},{\'event\':\'addChannel\',\'channel\':\'ok_sub_futureusd_' + coinName + '_depth_next_week_5\'},{\'event\':\'addChannel\',\'channel\':\'ok_sub_futureusd_' + coinName + '_depth_quarter_5\'}]'
          // let str = '{\'event\':\'addChannel\',\'channel\':\'ok_sub_futureusd_btc_depth_this_week\'}'
          that.ws3.send(str)
          setInterval(function() {
            this.ws3.send('ping')
          },10000)
        })
        this.ws3.addEventListener('error', function(error) {
          console.log('错误重连')
          that.getDeep()
        })
        this.ws3.addEventListener('message', function incoming(data) {
          // console.log(data)
          if (data.data instanceof Blob) {
            let blob = data.data
            let result = ''
            let reader = new FileReader()
            reader.readAsBinaryString(blob)
            reader.onload = function() {
              // console.log(blob)
              result = JSON.parse(pako.inflateRaw(reader.result, { to: 'string' }))
              // console.log('okresult', result)
              if(result.length>0){
                let channel = result[0]['channel'].split('_')
                if (channel.length > 1) {
                  let contract_type = channel[5]
                  let asks = result[0]['data']['asks']
                  let bids = result[0]['data']['bids']
                  if (contract_type == 'quarter') {
                    that.okQuarter = bids[0][0]
                    that.okQuarterNum = bids[0][0] * bids[0][3]
                  } else if (contract_type == 'this') {
                    that.okThis = bids[0][0]
                    that.okThisNum = bids[0][0] * bids[0][3]
                  } else if (contract_type == 'next') {
                    that.okNext = bids[0][0]
                    that.okNextNum = bids[0][0] * bids[0][3]
                  }
                }
              }
            }
          }
        })
      },
      okHttpSpot(){
        let that=this;
        this.okHttp=setInterval(function() {
          let url='https://www.okex.com/api/v1/depth.do?symbol='+that.coinName+'_usdt'
          http.get(url,{
            'Access-Control-Allow-Origin':'https://www.okex.com',
            headers:{
              'Content-Type':'application/x-www-form-urlencoded'
            }
          }).then(function(res) {
            console.log(res)
          }).catch(function(err) {
            console.log(err)
          })
        },1000)
      },
      getOkSpot(){
        let that = this
        const pako = require('pako')
        this.ws5 = new WebSocket("wss://okexcomreal.bafang.com:10441/websocket");
        this.ws5.addEventListener('open', function(e) {
          let coinName = that.coinName
          // let str="{'event':'addChannel','channel':'ok_sub_spot_"+coinName+"_usdt_ticker'}}"
          let str='{event:"addChannel",parameters:{"base":"'+coinName+'","binary":"1","product":"spot","quote":"usdt","type":"depth"}}'
          // let str='{"op": "subscribe", "args": ["spot/ticker:'+coinName+'-USD-170310"]}'
          // let str = '[{\'event\':\'addChannel\',\'channel\':\'ok_sub_futureusd_' + coinName + '_depth_this_week_5\'},{\'event\':\'addChannel\',\'channel\':\'ok_sub_futureusd_' + coinName + '_depth_next_week_5\'},{\'event\':\'addChannel\',\'channel\':\'ok_sub_futureusd_' + coinName + '_depth_quarter_5\'}]'
          // let str = '{\'event\':\'addChannel\',\'channel\':\'ok_sub_futureusd_btc_depth_this_week\'}'
          that.ws5.send(str)
          setInterval(function() {
            this.ws5.send('{event: "ping"}')
          },10000)
        })
        this.ws5.addEventListener('error', function(error) {
          console.log('okexSpot错误重连')
        })
        this.ws5.addEventListener('message', function incoming(data) {
          if (data.data instanceof Blob) {
            let blob = data.data
            let result = ''
            let reader = new FileReader()
            reader.readAsBinaryString(blob)
            reader.onload = function() {
              result = JSON.parse(pako.inflateRaw(reader.result, { to: 'string' }))
              // console.log('okspotresult', result)
              let channel = result[0].data.asks
              if (channel.length > 1) {
                that.okSpot = channel[0].price
                that.okSpotNum = channel[0].totalSize*channel[0].price
              }
            }
          }
        })
      },
      //火币期货soket连接
      getHuobi() {
        let that = this
        if ('WebSocket' in window) {
          that.ws1 = new WebSocket('wss://www.hbdm.com/ws')
          that.ws1.addEventListener('open', function(e) {
            console.log('huobi链接成功')
            // console.log("that.coinName",that.coinName)
            let coin_Name = that.coinName.toLocaleUpperCase()
            that.ws1.send(JSON.stringify({ 'sub': 'market.' + coin_Name + '_CQ.depth.percent10', 'id': 'id5' }))
            that.ws1.send(JSON.stringify({ 'sub': 'market.' + coin_Name + '_CW.depth.percent10', 'id': 'id5' }))
            that.ws1.send(JSON.stringify({ 'sub': 'market.' + coin_Name + '_NW.depth.percent10', 'id': 'id5' }))
          })
          that.ws1.addEventListener('message', function incoming(data) {
            // console.log(data)
            that.huobiData(data)

          })
          that.ws1.addEventListener('error', function incoming(e) {
            console.log('发生错误重新启动')
            that.ws1.close()
            that.getHuobi()
          })
          that.ws1.addEventListener('close', function incoming(e) {
            that.getHuobi()
          })
        } else {
          // 浏览器不支持 WebSocket
          alert('您的浏览器不支持 WebSocket!')
        }
      },
      //huobi现货soket连接
      getHuobiSpot() {
        let that = this
        if ('WebSocket' in window) {
          console.log('huobiSpot')
          that.ws4 = new WebSocket('wss://api.huobi.pro/ws')
          that.ws4.addEventListener('open', function(e) {
            console.log('huobiSpot链接成功')
            // console.log("that.coinName",that.coinName)
            let coin_Name = that.coinName.toLocaleLowerCase()
            that.ws4.send(JSON.stringify({ 'req': 'market.' + coin_Name + 'usdt.depth.step1', 'id': 'id5' }))
            // that.ws4.send(JSON.stringify({ 'req': 'market.' + coin_Name + 'usdt.depth.step1', 'id': 'id5' }))
            // that.ws4.send(JSON.stringify({ 'req': 'market.' + coin_Name + 'usdt.depth.step1', 'id': 'id5' }))
          })
          that.ws4.addEventListener('message', function incoming(data) {
            // console.log(data)
            that.huobiSporData(data)

          })
          that.ws4.addEventListener('error', function incoming(e) {
            console.log('发生错误重新启动')
            that.ws4.close()
            that.getHuobi()
          })
          that.ws4.addEventListener('close', function incoming(e) {
            that.getHuobi()
          })
        } else {
          // 浏览器不支持 WebSocket
          alert('您的浏览器不支持 WebSocket!')
        }
      },
      //bitmex期货soket连接
      getBitmex() {
        let that = this
        if ('WebSocket' in window) {
          that.ws2 = new WebSocket('wss://www.bitmex.com/realtime')
          that.ws2.addEventListener('open', function(e) {
            console.log('bitmex链接成功')
            // console.log("that.coinName",that.coinName)
            let coin_Name = that.coinName.toLocaleUpperCase()
            // that.ws2.send('help')
            let coinName=that.coinName
            let baseCoin='USD'
            if(coinName=='BTC'){
              coinName='XBT'
            }else {
              baseCoin='XBT'
            }
            that.ws2.send('{"op": "subscribe", "args": ["orderBook10:' + coinName + baseCoin+'"]}')
            // that.ws.send(JSON.stringify({"sub": "market."+coin_Name+"_CQ.depth.percent10", "id": "id5"}));
            // that.ws.send(JSON.stringify({"sub": "market."+coin_Name+"_CW.depth.percent10", "id": "id5"}));
            // that.ws.send(JSON.stringify({"sub": "market."+coin_Name+"_NW.depth.percent10", "id": "id5"}));
          })
          that.ws2.addEventListener('message', function incoming(data) {
            that.bitmexData(data)
          })
          that.ws2.addEventListener('error', function incoming(e) {
            console.log('发生错误重新启动')
            // that.ws2.close()
            // that.getBitmex()
          })
          that.ws2.addEventListener('close', function incoming(e) {
            // that.ws2.close()
            // that.getBitmex()
          })
        } else {
          // 浏览器不支持 WebSocket
          alert('您的浏览器不支持 WebSocket!')
        }
      },
      //火币现货数据处理
      huobiSporData(data) {
        let that = this
        const pako = require('pako')

        if (data.data instanceof Blob) {
          let blob = data.data
          let result = ''
          let reader = new FileReader()
          reader.readAsBinaryString(blob)
          reader.onload = function() {
            result = JSON.parse(pako.inflate(reader.result, { to: 'string' }))
            // console.log(result)
            if (result.ping) {
              that.ws4.send('{"pong":' + result.ping + '}')
            } else if (result.data) {
              that.huoBiSpot = result.data.asks[0][0]
              that.huoBiSpotNum = result.data[0][0] * asks[0][1]
            }
          }
        }
      },
      //火币期货数据处理
      huobiData(data) {
        let that = this
        const pako = require('pako')
        if (data.data instanceof Blob) {
          let blob = data.data
          let result = ''
          let reader = new FileReader()
          reader.readAsBinaryString(blob)
          reader.onload = function() {
            result = JSON.parse(pako.inflate(reader.result, { to: 'string' }))
            if (!!result['ch']) {
              let contract_type = result['ch'].split('.')[1].substring(4, 6)
              let asks = result['tick']['asks']
              let bids = result['tick']['bids']
              let coin = result['ch'].split('.')[1].substring(0, 3).toUpperCase()
              // console.log(coin)
              if (coin == that.coinName&&asks.length>0) {
                if (contract_type == 'CQ') {
                  that.huoBiQuarter = asks[0][0]
                  that.huoBiQuarterNum = asks[0][0] * asks[0][1]
                }
                if (contract_type == 'CW') {

                  that.huoBiThis = asks[0][0]
                  that.huoBiThisNum = asks[0][0] * asks[0][1]
                }
                if (contract_type == 'NW') {
                  that.huoBiNext = asks[0][0]
                  that.huoBiNextNum = asks[0][0] * asks[0][1]
                }
              }

            }
          }
        }
      },
      //bitmex数据处理
      bitmexData(data) {
        let that = this
        let newData = JSON.parse(data.data)
        newData = newData.data[0]
        that.bitMexSpot = newData.asks[0][0]
        that.bitMexSpotNum = newData.asks[0][1]

      }
    },
    mounted: function() {

      this.htmlText = this.huoBiQuarter
      this.getHuobiSpot()
      this.getOk()
      this.getHuobi()
      this.getBitmex()
      // this.creatE()
      this.getOkSpot()
      this.createTable()
      // this.okHttpSpot()
    }

    ,
    watch: {
      checkboxVal(valArr) {
        this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
        this.key = this.key + 1// 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
      }
    }

  }
</script>

<style scoped>
  .echart_box {
    width: 100%;
    height: 400px;
  }

  .tHead_box {

  }

  .tHead {
    display: inline-block;
    width: 180px;
    height: 40px;
    line-height: 40px;
  }
</style>
