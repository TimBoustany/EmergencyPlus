import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Button, TouchableOpacity, Pressable } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { createStackNavigator } from '@react-navigation/stack';
import UserInfoScreen from '../screens/UserInfoScreen';



const HomeScreen = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text>Welcome {user.uid}</Text>
            <FormButton buttonTitle='Logout' onPress={() => logout()} />
            <FormButton buttonTitle='Edit Profile' onPress={() => alert('g')} />
        </View>

    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 200,
    },
    container2: {
        flex: 1,
        backgroundColor: "#fff"
    },
});