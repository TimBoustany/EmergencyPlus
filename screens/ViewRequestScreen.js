import React from 'react';
import { useState, useContext } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Form, Label, Item, Picker } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../navigation/AuthProvider';
import BloodRequestsScreen from '../screens/BloodRequestsScreen';

const RequestInfoScreen = () => {

    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [bloodType, setBloodType] = useState();

    const { user } = useContext(AuthContext);
    const { requestBlood } = useContext(AuthContext);


    function Submit() {
        requestBlood(user.email, name, location, bloodType);
        new BloodRequestsScreen().Refresh();
    }

    return (
        <ScrollView>
            <View style={styles.container}>


            </View>
        </ScrollView>

    );
}

export default RequestInfoScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 150,
    },
    text: {
        //fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 50,
        color: '#051d5f',
    },
});


