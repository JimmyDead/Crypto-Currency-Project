import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { MainLayout } from '.';
import BalanceInfo from '../components/BalanceInfo';
import ChartCreate from '../components/Chart';
import { COLORS, dummyData, FONTS, icons, SIZES } from '../constants';
import { getHoldings } from '../stores/market/marketActions';


const Portfolio = ({ getHoldings, myHoldings }) => {

    useFocusEffect(
        useCallback(() => {
            getHoldings(holdings = dummyData.holdings)
        }, [])
    )

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0)

    let valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)

    let perChange = valueChange / (totalWallet - valueChange) * 100


    const renderCurrentBalanceSection = () => {
        return (
            <View style={{
                paddingHorizontal: SIZES.padding,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: COLORS.gray
            }}>
                <Text style={{ marginTop: 20, color: COLORS.white, ...FONTS.largeTitle }}>
                    Portfolio
                </Text>

                <BalanceInfo title="Cotação Atual" displayAmount={totalWallet}
                    changePct={perChange} containerStyle={{ marginTop: SIZES.radius, marginBottom: SIZES.padding }}
                />
            </View>
        )
    }

    return (
        <MainLayout>
            <View style={{ flex: 1, backgroundColor: COLORS.black }}>

                {renderCurrentBalanceSection()}

                {/* adicionar grafico aqui */}

                <FlatList
                    data={myHoldings}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}
                    ListHeaderComponent={
                        <View>
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Seus Crypto Ativos</Text>

                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
                                <Text style={{ flex: 1, color: COLORS.lightGray3 }}>
                                    Ativos
                                </Text>
                                <Text style={{ flex: 1, color: COLORS.lightGray3, textAlign: 'right' }}>
                                    Preço
                                </Text>
                                <Text style={{ flex: 1, color: COLORS.lightGray3, textAlign: 'right' }}>
                                    Custódia
                                </Text>
                            </View>
                        </View>
                    }
                    renderItem={({ item }) => {

                        let priceColor = (item.price_change_percentage_7d_in_currency == 0)
                            ? COLORS.lightGray3 : (item.price_change_percentage_7d_in_currency > 0)
                                ? COLORS.lightGreen : COLORS.red

                        return (
                            <TouchableOpacity style={{ flexDirection: 'row', height: 55 }}>

                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={{ uri: item.image }} style={{ width: 20, height: 20 }} />

                                    <Text style={{ marginLeft: SIZES.radius, color: COLORS.white, ...FONTS.h4 }}>
                                        {item.name}
                                    </Text>
                                </View>

                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{
                                        textAlign: 'right',
                                        color: COLORS.white,
                                        ...FONTS.h4,
                                        lineHeight: 15
                                    }}>${item.current_price.toLocaleString()}</Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        {
                                            item.price_change_percentage_7d_in_currency != 0 &&
                                            <Image source={icons.upArrow} style={{
                                                height: 10,
                                                width: 10,
                                                tintColor: priceColor,
                                                transform: item.price_change_percentage_7d_in_currency > 0
                                                    ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }]
                                            }} />
                                        }

                                        <Text style={{
                                            marginLeft: 5,
                                            color: priceColor,
                                            ...FONTS.body5,
                                            lineHeight: 15
                                        }}>
                                            {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{
                                        textAlign: 'right',
                                        color: COLORS.white,
                                        ...FONTS.h4,
                                        lineHeight: 15
                                    }}>
                                        $ {(Math.round(item.total * 100) / 100).toFixed(2).toLocaleString()}
                                    </Text>

                                    <Text style={{
                                        textAlign: 'right', color: COLORS.lightGray3,
                                        ...FONTS.body5, lineHeight: 15
                                    }}>
                                        {item.qty} {item.symbol.toUpperCase()}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />

            </View>
        </MainLayout>
    )
}

//export default Portfolio;

const mapStateToProps = (state) => {
    return {
        myHoldings: state.marketReducer.myHoldings,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHoldings: (holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)