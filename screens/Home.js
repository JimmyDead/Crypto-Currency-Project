import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getCoinMarket, getHoldings } from '../stores/market/marketActions'
import { MainLayout } from '.';
import { useFocusEffect } from '@react-navigation/native';
import { SIZES, COLORS, FONTS, dummyData, icons } from '../constants';
import BalanceInfo from '../components/BalanceInfo';
import IconTextButton from '../components/iconTextButton';
import Chart from '../components/Chart';

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
                <Chart containerStyle={{ marginTop: SIZES.padding * 2 }}
                    chartPrices={coins[0]?.sparkline_in_7d?.price}
                />

                {/* TOP CRYPTO*/}
            </View>
        </MainLayout>
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