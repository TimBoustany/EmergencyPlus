import React from 'react';
import { useState, useContext } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Form, Label, Item, Picker } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../navigation/AuthProvider';


const RegisterDonorScreen = () => {

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [BloodType, setBloodType] = useState();
    const [LocationArea, setArea] = useState();
    const [age, setAge] = useState();
    const [lastdonation, setLastDonation] = useState();


    const { user } = useContext(AuthContext);
    const { requestBlood } = useContext(AuthContext);

    return (
        <ScrollView>
            <View style={styles.container}>

                <Text style={styles.text}>Register as a Donor:</Text>

                <FormInput
                    labelValue={name}
                    onChangeText={(userName) => setName(userName)}
                    placeholderText="Full name"
                    iconType="user"
                    keyboardType="email-address"
                    autoCorrect={false}
                />


                <FormInput
                    labelValue={phone}
                    onChangeText={(userPhone) => setPhone(userPhone)}
                    placeholderText="Phone number"
                    iconType="number"
                    keyboardType="email-address"
                    autoCorrect={false}
                />

                <FormInput
                    labelValue={age}
                    onChangeText={(userAge) => setAge(userAge)}
                    placeholderText="Age"
                    iconType="number"
                    keyboardType="email-address"
                    autoCorrect={false}
                />


                <FormInput
                    labelValue={lastdonation}
                    onChangeText={(userLastDonation) => setLastDonation(userLastDonation)}
                    placeholderText="Last blood donation date"
                    iconType="number"
                    keyboardType="email-address"
                    autoCorrect={false}
                />



                <Item>
                    <Label>LocationArea:</Label>
                    <Form>
                        <Picker mode="dropdown" iosHeader="Location/ Area:" iosIcon={<AntDesign name="down" size={25} color="#666" />} style={{ width: undefined }} selectedValue={LocationArea}
                            onValueChange={(userArea) => { setArea(userArea) }}>
                            <Picker.Item label="Beirut" value="Beirut"></Picker.Item>
                            <Picker.Item label="Akkar" value="Akkar"></Picker.Item>
                            <Picker.Item label="Mount Lebanon" value="Mount Lebanon"></Picker.Item>
                            <Picker.Item label="Beqaa" value="Beqaa"></Picker.Item>
                            <Picker.Item label="Nabatieh" value="Nabatieh"></Picker.Item>
                            <Picker.Item label="North Governate" value="North Governate"></Picker.Item>
                            <Picker.Item label="South Governate" value="South Governate"></Picker.Item>


                        </Picker>
                    </Form>
                </Item>



                <Item>
                    <Label>Blood Type:</Label>
                    <Form>
                        <Picker mode="dropdown" iosHeader="Blood Type:" iosIcon={<AntDesign name="down" size={25} color="#666" />} style={{ width: undefined }} selectedValue={BloodType}
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
                    onPress={() => { requestBlood(user.email, name, phone, age, lastdonation, LocationArea, BloodType) }}
                />
            </View>
        </ScrollView>

    );
}

export default RegisterDonorScreen;

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