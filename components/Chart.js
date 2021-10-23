import React, { useEffect, useState } from "react";
import { Text, View, Dimensions } from 'react-native'
import { LineChart } from "react-native-chart-kit";

const ChartCreate = ({ containerStyle }) => {

    const initialState = [0]
    const [data, setData] = useState(initialState)
    const [timeUpdate, setTimeUpdate] = useState([])
    const cacheDatas = []

    const getCurrentHour = () => {
        var date = new Date;
        date.setTime(date.getTime());
        var seconds = date.getSeconds();
        var minutes = date.getMinutes();
        var hour = date.getHours();
        return `${hour}:${minutes}:${seconds}`
    }

    const setHourInChart = (setTimeUpdate, cacheDatas) => {
        cacheDatas.push(getCurrentHour())
        if (cacheDatas.length === 5) {
            cacheDatas.shift()
        }
        setTimeUpdate(cacheDatas)
    }

    const setValuesInChart = (setData, setTimeUpdate, cacheDatas) => {
        const numberData = Math.random() * 10
        const newData = [numberData]
        setHourInChart(setTimeUpdate, cacheDatas)
        setData(oldArray => [...oldArray, newData])
    }

    useEffect(
        () => {
            setInterval(() => {
                setValuesInChart(setData, setTimeUpdate, cacheDatas)
            }, 10 * 1000)
        }, []
    )

    return (
        <View style={{ /*...containerStyle,*/ marginTop: 25 }}>
            <LineChart
                data={{
                    labels: timeUpdate,
                    datasets: [{
                        data: data
                    }]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={180}
                yAxisLabel="$"
                yAxisSuffix="k"
                /*renderDotContent={({ x, y, index }) => <Text key={index} style={{
                    position: 'absolute',
                    paddingTop: y - 20,
                    paddingLeft: x - 15,
                    color: 'white'
                }}>{(Math.round(parseFloat(data[index]) * 100) / 100).toFixed(2)}</Text>}*/
                //yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    // backgroundColor: "#fff",
                    backgroundGradientFrom: "#000000",
                    backgroundGradientTo: "#000000",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        // borderRadius: 4
                    },
                    propsForDots: {
                        r: "2",
                        strokeWidth: "2",
                        stroke: "#fff"//1E5128 54E346
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 8
                }}
            />
        </View>
    )
}

export default ChartCreate;

//export default Chart;