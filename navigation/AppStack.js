import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import * as firebase from "firebase";
import VerifyEmailScreen from '../screens/VerifyEmailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserInfoScreen from '../screens/UserInfoScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Once logged in, automatically it will display <AppStack> (because of our listener).
const AppStack = () => {

    var f = firebase.auth().currentUser;
    var is = f.emailVerified;

    let routeName;


    // Here, it will see if the user verified his email or not. If yes, it will go to login screen. If no, it will go to verify email. 
    // However, in both case, the user IS logged in. but in the first case, the account is just blocked until he verifies his email.
    if (is == false) { routeName = "Verify"; }
    else {
        routeName = "Home";
    }


    return (

        /*
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Personal Informations" component={UserInfoScreen} />
            <Stack.Screen name="Verify" component={DrawerRoutes} />
        </Stack.Navigator>
        */



        <Drawer.Navigator initialRouteName={routeName} drawerContentOptions={{
            activeTintColor: '#2e64e5',
            itemStyle: { marginVertical: 5 },
        }}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Build" component={UserInfoScreen} />
            <Drawer.Screen name="Verify" component={VerifyEmailScreen} options={({ route, navigation }) => {
                return {
                    swipeEnabled: false,
                };
            }}
            />
        </Drawer.Navigator>


        /*


        <Tab.Navigator initialRouteName={routeName} activeColor="#2e64e5"
            inactiveColor="grey"
            barStyle={{ backgroundColor: 'white' }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarLabel: 'Home',
                tabBarColor: '#2e64e5',
                tabBarIcon: () => (
                    <AntDesign name="home" size={25} color="#2e64e5" />
                ),

            }}
            />
            <Tab.Screen name="Build" component={UserInfoScreen} options={{
                tabBarLabel: 'Edit Profile',
                tabBarColor: '#2e64e5',
                tabBarIcon: () => (
                    <AntDesign name="edit" size={25} color="#2e64e5" />
                ),

            }}
            />
            <Tab.Screen name="Verify" component={VerifyEmailScreen} options={{
                tabBarLabel: 'Verify e-mail',
                tabBarColor: '#2e64e5',
                tabBarIcon: () => (
                    <AntDesign name="mail" size={25} color="#2e64e5" />
                ),

            }}
            />
        </Tab.Navigator >

*/



    );

}

export default AppStack;