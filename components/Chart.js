import React, { useEffect, useState } from "react";
import { Text, View, Dimensions } from 'react-native'
import { LineChart } from "react-native-chart-kit";
import { COLORS, FONTS, SIZES } from '../constants'
import moment from 'moment'

const Chart = ({ containerStyle, chartPrices }) => {

    //COLORS.lightGreen

    let startUnixTimestamp = moment().subtract(7, 'day').unix()

    let data = chartPrices ? chartPrices?.map((item, index) => {
        return {
            x: startUnixTimestamp + (index + 1) * 3600,
            y: item
        }
    }) : []

    let points = monotoneCubicInterpolation({ data, range: 40 })

    return (
        <>
        </>
    )
}


const ChartCreate = () => {

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
        const newData = [Math.random() * 10]
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
        <View style={{ marginTop: 25 }}>
            <LineChart
                data={{
                    labels: timeUpdate,
                    datasets: [{
                        data: data
                    }]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
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