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
    const { updateBlood } = useContext(AuthContext);


    function Edit() {
        updateBlood(user.email, name, location, bloodType);
        new BloodRequestsScreen().Refresh();
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <Text style={styles.text}>Fill the form:</Text>

                <FormInput
                    labelValue={name}
                    onChangeText={(userName) => setName(userName)}
                    placeholderText="Patient's name"
                    iconType="user"
                    keyboardType="email-address"
                    autoCorrect={false}
                />
                <FormInput
                    labelValue={location}
                    onChangeText={(hospitalLocation) => setLocation(hospitalLocation)}
                    placeholderText="Hospital/Center adress"
                    iconType="address"
                    keyboardType="email-address"
                    autoCorrect={false}
                />

                <Item>
                    <Label>Blood Type:</Label>
                    <Form>
                        <Picker mode="dropdown" iosHeader="Blood Type:" iosIcon={<AntDesign name="down" size={25} color="#666" />} style={{ width: undefined }} selectedValue={bloodType}
                            onValueChange={(userBloodType) => { setBloodType(userBloodType) }}>
                            <Picker.Item label="A+" value="A+"></Picker.Item>
                            <Picker.Item label="A-" value="A-"></Picker.Item>
                            <Picker.Item label="B+" value="B+"></Picker.Item>
                            <Picker.Item label="B-" value="B-"></Picker.Item>
                            <Picker.Item label="AB+" value="AB+"></Picker.Item>
                            <Picker.Item label="AB-" value="AB-"></Picker.Item>
                            <Picker.Item label="O+" value="O+"></Picker.Item>
                            <Picker.Item label="O-" value="O-"></Picker.Item>


                        </Picker>
                    </Form>
                </Item>

                <FormButton
                    buttonTitle="Confirm"
                    onPress={() => { Edit() }}
                />
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


