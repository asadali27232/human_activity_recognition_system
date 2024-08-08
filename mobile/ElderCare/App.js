import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text, View } from 'react-native';

import HomeScreen from './HomeScreen';
import AddElderScreen from './AddElderScreen';
import ConnectDeviceScreen from './ConnectDeviceScreen';

const Tab = createBottomTabNavigator();

const tabBarIcon = (route, focused, color, size) => {
    let iconName;

    if (route.name === 'Home') {
        iconName = require('./assets/home.png');
    } else if (route.name === 'Add Elder') {
        iconName = require('./assets/add.png');
    } else if (route.name === 'Connect Device') {
        iconName = require('./assets/device.png');
    }

    return <Image source={iconName} style={{ width: size, height: size }} />;
};

const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) =>
        tabBarIcon(route, focused, color, size),
    tabBarActiveTintColor: '#2D328C',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: {
        height: 60, // Increase height
        paddingBottom: 10, // Adjust padding to give some margin
    },
    tabBarIconStyle: {
        marginBottom: 0, // Adjust icon margin bottom
    },
    tabBarLabelStyle: {
        fontSize: 16, // Default font size
        fontWeight: 'normal', // Default font weight
    },
    tabBarLabel: ({ focused, color }) => (
        <Text
            style={{
                fontSize: focused ? 14 : 12, // Larger font size for selected
                fontWeight: focused ? 'bold' : 'normal', // Bold for selected
                color: color, // Use the color provided by tabBarActiveTintColor or tabBarInactiveTintColor
            }}>
            {route.name}
        </Text>
    ),
    headerTitleAlign: 'left',
    headerTitle: ({ focused }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {tabBarIcon(route, focused, '#2D328C', 25)}
            <Text
                style={{
                    marginLeft: 10,
                    fontSize: 18,
                    color: '#2D328C',
                    fontWeight: 'bold',
                }}>
                {route.name}
            </Text>
        </View>
    ),
});

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={screenOptions}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Add Elder" component={AddElderScreen} />
                <Tab.Screen
                    name="Connect Device"
                    component={ConnectDeviceScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
