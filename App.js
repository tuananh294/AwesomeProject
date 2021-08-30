/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Home, Detail } from './screen'

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle:{
                        backgroundColor: '#E2F0FF',
                    },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center'
                }}
                initialRouteName={'Home'}
            >
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};


export default App;