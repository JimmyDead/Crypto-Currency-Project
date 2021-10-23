import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { getCoinMarket, getHoldings } from '../stores/market/marketActions'
import { MainLayout } from '.';
import { useFocusEffect } from '@react-navigation/native';
import { SIZES, COLORS, FONTS, dummyData, icons } from '../constants';
import BalanceInfo from '../components/BalanceInfo';
import IconTextButton from '../components/iconTextButton';
import ChartCreate from '../components/Chart';
import { transform } from '@babel/core';

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {

    useFocusEffect(
        useCallback(() => {
            getHoldings(holdings = dummyData.holdings)
            getCoinMarket()
        }, [])
    )

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0)

    let valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)

    let perChange = valueChange / (totalWallet - valueChange) * 100

    const renderWalletInfoSection = () => {
        return (
            <View style={styles.walletInfo}>

                {/* INFORMACOES DE BALANÇO */}
                <BalanceInfo title="Sua Carteira" displayAmount={totalWallet} changePct={perChange}
                    containerStyle={{ marginTop: 20 }} />

                <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: -15, paddingHorizontal: SIZES.radius }}>

                    <IconTextButton label="Tranferir" icon={icons.send}
                        containerStyle={{ flex: 1, height: 40, marginRight: SIZES.radius }}
                        onPress={() => console.warn('Tranferindo')}
                    />

                    <IconTextButton label="Retirar" icon={icons.withdraw}
                        containerStyle={{ flex: 1, height: 40 }}
                        onPress={() => console.warn('Retirando')}
                    />

                </View>

            </View>
        )
    }

    return (
        <MainLayout>
            <View style={{ flex: 1, backgroundColor: COLORS.black }}>

                {/* CABEÇALHO COM INFO DE CRYPTO */}
                {renderWalletInfoSection()}

                {/* GRAFICO */}
                {/*<Chart chartPrices={coins[0]?.sparkline_in_7d?.price}/>*/}
                <ChartCreate />

                {/* TOP CRYPTO*/}
                <FlatList
                    data={coins}
                    keyExtractor={item => item.id}
                    containerStyle={{
                        marginTop: 30,
                        paddingHorizontal: SIZES.padding
                    }}
                    ListHeaderComponent={
                        <View style={{ marginBottom: SIZES.radius }}>
                            <Text style={{
                                color: COLORS.white,
                                ...FONTS.h3,
                                fontSize: 18,
                                textAlign: 'center'
                            }}>Melhores Cryptos</Text>
                        </View>
                    }
                    renderItem={({ item }) => {

                        let priceColor = (item.price_change_percentage_7d_in_currency == 0)
                            ? COLORS.lightGray3 : (item.price_change_percentage_7d_in_currency > 0)
                                ? COLORS.lightGreen : COLORS.red

                        return (
                            <TouchableOpacity style={{
                                height: 55,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            //onPress //TODO, PODEMOS FAZER QUE QUANDO CLICAR EM UM ATIVO A GENTE PEGA
                            // A DATA DO ATIVO E PASSARMOS PARA O GRAFICO PARA REDENRIZAR COM ESSES VALORES
                            >
                                <View style={{ width: 35 }}>
                                    <Image source={{ uri: item.image }}
                                        style={{ height: 20, width: 20 }}
                                    />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{item.name}</Text>
                                </View>

                                <View>

                                    <Text style={{
                                        textAlign: 'right',
                                        color: COLORS.white, ...FONTS.h4
                                    }}>$ {item.current_price} </Text>

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
                                        }}>{item.price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
                                    </View>

                                </View>

                            </TouchableOpacity>
                        )
                    }}
                    ListFooterComponent={
                        <View style={{ marginBottom: 50 }} />
                    }
                />

            </View>
        </MainLayout >
    )
}

//export default Home;

const mapStateToProps = (state) => {
    return {
        myHoldings: state.marketReducer.myHoldings,
        coins: state.marketReducer.coins
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHoldings: (holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page))
        },
        getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
    walletInfo: {
        paddingHorizontal: SIZES.padding,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: COLORS.gray
    }
})