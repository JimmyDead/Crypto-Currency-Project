import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { COLORS, FONTS, icons } from '../constants'

const TabIcon = ({ focused, icon, iconStyle, label, isTrade }) => {

    if (isTrade) {
        return (
            <View style={styles.mainIcon}>
                <Image source={icon}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.white,
                        ...iconStyle //operador spread para copiar o resto do style do icon
                    }}
                />
                <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{label}</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.secondaryIcon}>
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? COLORS.white : COLORS.secondary,
                        ...iconStyle
                    }}
                />
                <Text style={{
                    color: focused ? COLORS.white : COLORS.secondary,
                    ...FONTS.h4
                }}>{label}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    mainIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.black
    },
    secondaryIcon: {
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default TabIcon