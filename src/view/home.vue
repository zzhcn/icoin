<template>
  <div class="body_box">
    <div class="user_states_box">
      <div class="head_title">账户总览</div>
      <div class="states_item">
        <span class="states_item_content">{{botNum}}</span>
        <span class="states_item_title">运行机器人数量</span>
      </div>
      <div class="states_item">
        <span class="states_item_content">{{quantNum}}</span>
        <span class="states_item_title">托管者数量</span>
      </div>
      <div class="states_item">
        <span class="states_item_content">32156.65</span>
        <span class="states_item_title">资产总值（USDT）</span>
      </div>
      <div class="states_item">
        <span class="states_item_content">43.75%</span>
        <span class="states_item_title">累计收益</span>
      </div>
    </div>
    <div class="user_states_box">
      <div class="head_title">账户收益走势图</div>
      <div id="balance" class="chart_box"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'home',
    data() {
      return {
        botNum:null,
        quantNum:null
      }
    },
    methods: {
      initChart(id) {
        let base = +new Date(1968, 9, 3)
        let oneDay = 24 * 3600 * 1000
        let date = []
        let data = [Math.random() * 300]
        for (let i = 1; i < 20000; i++) {
          let now = new Date(base += oneDay)
          date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
          data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
        }
        let myChart = echarts.init(document.getElementById(id))
        let option = {
          tooltip: {
            trigger: 'axis',
            position: function(pt) {
              return [pt[0], '10%']
            }
          },
          title: {
            left: 'center',
            text: '账户收益走势图'
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
          },
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
          }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }],
          series: [
            {
              name: '模拟数据',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: 'rgb(255, 70, 131)'
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgb(255,255,255)'
                }, {
                  offset: 1,
                  color: 'rgb(255,255,255)'
                }])
              },
              data: data
            }
          ]
        }
        myChart.setOption(option)
        setInterval(function() {
          let base = +new Date(1968, 9, 3)
          let oneDay = 24 * 3600 * 1000
          let date = []
          let data = [Math.random() * 300]
          for (let i = 1; i < 20000; i++) {
            let now = new Date(base += oneDay)
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
          }
          let option = {
            tooltip: {
              trigger: 'axis',
              position: function(pt) {
                return [pt[0], '10%']
              }
            },
            title: {
              left: 'center',
              text: '大数据量面积图'
            },
            toolbox: {
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: date
            },
            yAxis: {
              type: 'value',
              boundaryGap: [0, '100%']
            },
            dataZoom: [{
              type: 'inside',
              start: 0,
              end: 10
            }, {
              start: 0,
              end: 10,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%',
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }],
            series: [
              {
                name: '模拟数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                  color: 'rgb(255, 70, 131)'
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255,255,255)'
                  }, {
                    offset: 1,
                    color: 'rgb(255,255,255)'
                  }])
                },
                data: data
              }
            ]
          }
          myChart.setOption(option)
        }, 5000)
      },
      getUserInfo(){
        let that=this;
        let url='/usercenter/overview/';
        let callback=function (res) {
          that.botNum=res.data.robots_number;
          that.quantNum=res.data.managers_number;
        };
        this.httpGet(url,callback)
      },
    },
    mounted() {
      this.initChart('balance');
      this.getUserInfo()
    },
    created() {


    }
  }
</script>

<style scoped>
  .chart_box {
    width: 100%;
    height: 400px;
  }

  .head_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #f5f5f5;
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 18px;
    padding-left: 15px;
  }

  .states_item_content {
    position: absolute;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    color: #2d2f33;
    top: 45px;
    left: 0;
  }

  .states_item_title {
    position: absolute;
    display: inline-block;
    width: 100%;
    text-align: center;
    bottom: 25px;
    color: #2d2f33;
    left: 0;
  }

  .states_item {
    position: relative;
    border: 1px solid #d8dce5;
    display: inline-block;
    width: 270px;
    height: 150px;
    margin-right: 19px;
    font-size: 14px;
    text-align: center;
    box-shadow: 8px 12px rgba(66, 185, 131, 0.1);
  }

  .user_states_box {
    font-size: 0;
    width: 1200px;
    margin: 20px auto;
    border: 1px solid #d8dce5;
    border-radius: 5px;
    overflow: hidden;
    padding-bottom: 30px;
  }

  .body_box {
    position: relative;
    padding: 10px;
    width: 1300px;
    height: auto;
    margin: 20px auto;
    border: 1px solid #d8dce5;
    border-radius: 5px;
  }
</style>
