import React, { useContext, useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from "firebase";
import { AuthContext } from './AuthProvider';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

// Here, we put our API key for firebase:
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

const Routes = ({ navigation }) => {



    const { user, setUser } = useContext(AuthContext); // we are importing user and setUser from AuthProvider
    const [initializing, setInitializing] = useState(true); // we are creating "initializing"

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    // This is a listener: we are subscribing to our firebase user and listening to it.
    // UseEffect() is a function  that executes only once when we open the screen and everything loads (its like a constructor but runs only one time).
    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing)  //Here is to display a loading panel (instead of "null", navigate to loading)
    {
        return null;
    }
    // Here: if user is not null, <AppStack> will display. Else, <AuthStack> will display.
    // When we are loged in (after loggin in OR creating new acc), without re calling the listner, it will know that user is not null and will display <AppStack> automatically.
    // But once we logout, it will also automatically know that it should display <AuthStack>
    return (

        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>

    );


};

export default Routes;

