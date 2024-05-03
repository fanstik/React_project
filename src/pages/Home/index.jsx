import BarChart from "../../components/BarChart"

const Home = () => {
    const option = {
        title:'Echart',//标题
        xdata:['vue', 'react', 'java', 'c'],//横坐标
        ydata:[5, 20, 36, 10, 10, 20],//纵坐标
        width:500,//图表宽度
        height:400,//图表高度
    };
    return (
        <div>
            <BarChart {...option}/>
        </div>
    )
}

export default Home