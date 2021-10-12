import React, { useEffect, useRef } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import IconTextButton from '../components/iconTextButton'
import { COLORS, SIZES, icons } from '../constants'


const MainLayout = ({ children, isTradeModalVisible }) => {

    const modalAnimatedValue = useRef(new Animated.Value(0)).current

    const animatedTime = (toValue, duration, useNativeDriver) => {
        return Animated.timing(modalAnimatedValue, {
            toValue: toValue, duration: duration, useNativeDriver: useNativeDriver
        }).start()
    }

    useEffect(() => {
        if (isTradeModalVisible) {
            Animated.timing(modalAnimatedValue, {
                toValue: 1, duration: 500, useNativeDriver: false
            }).start()
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0, duration: 500, useNativeDriver: false
            }).start()
            //animatedTime(0, 500, false)
        }
    }, [isTradeModalVisible])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 350]
    })

    return (
        <View style={{ flex: 1 }}>
            {children}

            {/* TELA DE FUNDO ESCURA QUANDO O MODAL SUBIR */}
            {isTradeModalVisible &&
                <Animated.View style={styles.dimBackground} opacity={modalAnimatedValue} />
            }

            {/* AQUI É UM MODAL */}
            <Animated.View style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                top: modalY
            }}>
                <IconTextButton label="Transferir" icon={icons.send} onPress={() => console.warn('teste')} />
                <IconTextButton label="Retirar" icon={icons.withdraw}
                    containerStyle={{ marginTop: SIZES.base }} onPress={() => console.warn('teste2')} />
            </Animated.View>

        </View>
    )
}

//export default MainLayout

const mapStateToProps = (state) => {
    return {
        isTradeModalVisible: state.tabReducer.isTradeModalVisible
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)

const styles = StyleSheet.create({
    dimBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.transparentBlack
    }
})