import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import { VictoryPie, VictoryLabel } from 'victory-native'

const ChartPie = (myHoldingsData) => {

    const myHoldings = myHoldingsData['myHoldings']

    /*myHoldings.sort(function (a, b) {
        if (a.total > b.total) {
            return 1;
        }
        if (a.total < b.total) {
            return -1;
        }
        return 0;
    })*/

    //TODO CASO TENHA O MESMO TOTAL VAI DAR RUIM
    const data = myHoldings.map((elem, index) => (
        {
            y: elem.total,
            label: elem.id,
        }
    ));

    return (
        <View
            style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <VictoryPie
                height={220}
                width={Dimensions.get("window").width}
                colorScale={["#CA3E47", "#414141", "#313131", "#263859", "#AF0404"]}
                padAngle={({ datum }) => 2}
                //labelRadius={({ innerRadius }) => innerRadius + 5}
                //radius={({ datum }) => 20 + datum.position * 20}
                innerRadius={50}
                data={data}
                labelComponent={<VictoryLabel /*angle={35}*/ style={[{ fill: "white", fontSize: 15 }]} />}
            />
            <View style={{ position: 'absolute' }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Total Ativos</Text>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>{data.length}</Text>
            </View>
        </View>
    )
}

export default ChartPie