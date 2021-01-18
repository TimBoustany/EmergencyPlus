import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from "firebase";
//import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

var firebaseConfig = {
    apiKey: "AIzaSyBsJmCF-m1yRmfAOyyMiO1TinKhR9lF8Xk",
    authDomain: "emergencyplus-87fb1.firebaseapp.com",
    projectId: "emergencyplus-87fb1",
    storageBucket: "emergencyplus-87fb1.appspot.com",
    messagingSenderId: "1076105772729",
    appId: "1:1076105772729:web:e560a82b34b6652826e568"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Routes = () => {

    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Routes;


/*

import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';


const Routes = () => {

    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    );
};

export default Routes;
*/