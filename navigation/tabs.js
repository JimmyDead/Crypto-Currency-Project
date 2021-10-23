import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home, Portfolio, Market, Profile } from "../screens"
import { COLORS, icons } from "../constants"
import TabIcon from "../components/TabIcon";
import { StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { setTradeModalVisibility } from "../stores/tab/tabActions";



const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity style={styles.customButton} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

const Tabs = ({ setTradeModalVisibility, isTradeModalVisible }) => {

    const tradeTabButtonOnClickHandler = () => {
        setTradeModalVisibility(!isTradeModalVisible)
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                    height: 100
                }
            })} >

            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon focused={focused} icon={icons.home} label="Home" />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />

            <Tab.Screen name="Portfolio" component={Portfolio}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon focused={focused} icon={icons.briefcase} label="Portfolio" />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />

            <Tab.Screen name="Trade" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon focused={focused} icon={isTradeModalVisible ? icons.close : icons.trade}
                                label="Trade" isTrade={true}
                                iconStyle={isTradeModalVisible ? { width: 15, height: 15 } : null}
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <TabBarCustomButton {...props} onPress={() => tradeTabButtonOnClickHandler()} />
                    )
                }}
            />

            <Tab.Screen name="Market" component={Market}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon focused={focused} icon={icons.market} label="Market" />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />

            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon focused={focused} icon={icons.profile} label="Profile" />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />

        </Tab.Navigator>
    )
}

//export default Tabs;

const mapStateToProps = (state) => {
    return {
        isTradeModalVisible: state.tabReducer.isTradeModalVisible
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTradeModalVisibility: (isVisible) => { return dispatch(setTradeModalVisibility(isVisible)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)

const styles = StyleSheet.create({
    customButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})