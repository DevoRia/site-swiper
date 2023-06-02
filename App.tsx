import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import ListScreen from './screens/ListScreen';
import DetailsScreen from './screens/DetailsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import sites from './sites.json';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                    >
                        {props => <ListScreen {...props} sites={sites} />}
                    </Stack.Screen>
                    <Stack.Screen
                        // disabled default gestures
                        options={{ gestureEnabled: false }}
                        name="Details"
                    >
                        {props => <DetailsScreen {...props} sites={sites} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
