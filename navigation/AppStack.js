import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import * as firebase from "firebase";
import VerifyEmailScreen from '../screens/VerifyEmailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import UserInfoScreen from '../screens/UserInfoScreen';
import UserInfoScreen2 from '../screens/UserInfoScreen2';
import AsyncStorage from '@react-native-community/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DrawerContent } from '../navigation/DrawerContent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BloodRequestsScreen from '../screens/BloodRequestsScreen';
import RequestInfoScreen from '../screens/RequestInfoScreen';
import RegisterDonorScreen from '../screens/RegisterDonorScreen';
import ViewRequestScreen from '../screens/ViewRequestScreen';
import PatientScreen from '../screens/PatientScreen';
import EditRequestScreen from '../screens/EditRequestScreen';
import HistoryScreen from '../screens/HistoryScreen';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Stack2 = createStackNavigator();
const Stack3 = createStackNavigator();
const Stack4 = createStackNavigator();
const Stack5 = createStackNavigator();

const VerifyAcc = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Verify" component={VerifyEmailScreen} />
        </Stack.Navigator>
    );
}
const HomeS = () => {
    return (
        <Stack2.Navigator>
            <Stack2.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
                title: '',
                headerStyle: {
                    backgroundColor: '#f9fafd',
                    shadowColor: '#f9fafd',
                    elevation: 0,
                },
                headerLeft: () => (
                    <TouchableOpacity style={{ alignItems: 'flex-end', margin: 6 }}
                        onPress={() => navigation.openDrawer()}>
                        <FontAwesome name='bars' size={30} color='red' />

                    </TouchableOpacity>
                ),
            })} />
            <Stack2.Screen name="EditProfile" component={UserInfoScreen} />
        </Stack2.Navigator>
    );
}

const BloodRequestS = () => {
    return (
        <Stack3.Navigator>
            <Stack3.Screen name="BloodRequests" component={BloodRequestsScreen} options={({ navigation }) => ({
                title: '',
                headerStyle: {
                    backgroundColor: '#f9fafd',
                    shadowColor: '#f9fafd',
                    elevation: 0,
                },
                headerLeft: () => (
                    <TouchableOpacity style={{ alignItems: 'flex-end', margin: 6 }}
                        onPress={() => navigation.openDrawer()}>
                        <FontAwesome name='bars' size={30} color='red' />

                    </TouchableOpacity>
                ),
            })} />
            <Stack3.Screen name="RequestInfo" component={RequestInfoScreen} />
            <Stack3.Screen name="ViewRequest" component={ViewRequestScreen} />
            <Stack3.Screen name="Patient" component={PatientScreen} />
            <Stack3.Screen name="Edit" component={EditRequestScreen} />


        </Stack3.Navigator>
    );
}

const DonorS = () => {
    return (
        <Stack4.Navigator>
            <Stack4.Screen name="RegisterDonor" component={RegisterDonorScreen} options={({ navigation }) => ({
                title: '',
                headerStyle: {
                    backgroundColor: '#f9fafd',
                    shadowColor: '#f9fafd',
                    elevation: 0,
                },
                headerLeft: () => (
                    <TouchableOpacity style={{ alignItems: 'flex-end', margin: 6 }}
                        onPress={() => navigation.openDrawer()}>
                        <FontAwesome name='bars' size={30} color='red' />

                    </TouchableOpacity>
                ),
            })} />
            <Stack4.Screen name="RequestInfo" component={RequestInfoScreen} />
        </Stack4.Navigator>
    );
}

const HistoryS = () => {
    return (
        <Stack5.Navigator>
            <Stack5.Screen name="History" component={HistoryScreen} options={({ navigation }) => ({
                title: '',
                headerStyle: {
                    backgroundColor: '#f9fafd',
                    shadowColor: '#f9fafd',
                    elevation: 0,
                },
                headerLeft: () => (
                    <TouchableOpacity style={{ alignItems: 'flex-end', margin: 6 }}
                        onPress={() => navigation.openDrawer()}>
                        <FontAwesome name='bars' size={30} color='red' />

                    </TouchableOpacity>
                ),
            })} />
            <Stack5.Screen name="Patient" component={PatientScreen} />
        </Stack5.Navigator>
    );
}

// Once logged in, automatically it will display <AppStack> (because of our listener).
const AppStack = () => {


    // Here, Once the user logged in, it checks if the email is verified.
    var f = firebase.auth().currentUser;
    var is = f.emailVerified;



    // Here, it will see if the user verified his email or not. If yes, it will go to Home screen. If no, it will go to verify email. 
    // However, in both case, the user IS logged in. but in the "verify" case, the account is just blocked until he verifies his email.
    if (is == false) { return VerifyAcc(); }

    else {


        return (


            // Now, we are using a Drawer Navigator (its different than the Stack Navigator used in AuthStack): Its a main menu that we can open by sliding it.
            // Here, for "Home", we are calling the function HomeS that contains a stack.
            // For the design of the drawer, we are calling <DrawerContent>
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} drawerContentOptions={{
                activeTintColor: 'red',
                itemStyle: { marginVertical: 5 },
            }} >
                <Drawer.Screen name="Home" component={HomeS} />
                <Drawer.Screen name="EditProfile2" component={UserInfoScreen2} options={({ navigation }) => ({
                    gestureEnabled: false,
                })} />
                <Drawer.Screen name="BloodRequests" component={BloodRequestS} />
                <Drawer.Screen name="RegisterDonor" component={DonorS} />
                <Drawer.Screen name="History" component={HistoryS} />


            </Drawer.Navigator>





        );
    }
}

export default AppStack;
