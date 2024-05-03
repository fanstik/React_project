import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts';

const BarChart = (props) => {
    const chartRef = useRef(null);
    const {title,xdata,ydata,width,height} = props;
    useEffect(() => {
        const chartDom = chartRef.current;
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(chartDom);
        //图表信息
        const option = {
            title: {
            text: title
            },
            tooltip: {},
            xAxis: {
            data: xdata
            },
            yAxis: {
                type:'value'
            },
            series: [
            {
                type: 'bar',
                data: ydata
            }
            ]
        }
        // 绘制图表
        myChart.setOption(option);
    })
    return (
        <div ref={chartRef} style={{width:width, height:height}}></div>
    )
}

export default BarChart