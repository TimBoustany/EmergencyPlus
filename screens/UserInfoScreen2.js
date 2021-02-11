import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Form, Label, Item, Picker } from 'native-base';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as firebase from "firebase";
import '@firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider';




const UserInfoScreen2 = ({ navigation }) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [gender, setGender] = useState();
    const [bloodType, setBloodType] = useState();

    const { user } = useContext(AuthContext);
    const { userInfoUpdate } = useContext(AuthContext);

    function confirmButton() {
        userInfoUpdate(user.email, firstName, lastName, dateOfBirth, phoneNumber, gender, bloodType);
        navigation.navigate("Home");

    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>Build your profile:</Text>

                <FormInput
                    labelValue={firstName}
                    onChangeText={(userFirstName) => setFirstName(userFirstName)}
                    placeholderText="First Name"
                    iconType="idcard"
                />
                <FormInput
                    labelValue={lastName}
                    onChangeText={(userLastName) => setLastName(userLastName)}
                    placeholderText="Last Name"
                    iconType="idcard"
                />
                <FormInput
                    labelValue={dateOfBirth}
                    onChangeText={(userDateOfBirth) => setDateOfBirth(userDateOfBirth)}
                    placeholderText="Date of Birth"
                    iconType="calendar"
                />
                <FormInput
                    labelValue={phoneNumber}
                    onChangeText={(userPhoneNumber) => setPhoneNumber(userPhoneNumber)}
                    placeholderText="Phone Number ex: 03001002"
                    iconType="phone"
                />


                <Item>
                    <Label>Gender:</Label>
                    <Form>
                        <Picker mode="dropdown" iosHeader="Gender:" iosIcon={<AntDesign name="down" size={25} color="#666" />} style={{ width: undefined }} selectedValue={gender}
                            onValueChange={(userGend) => { setGender(userGend) }}>
                            <Picker.Item label="Male" value="Male"></Picker.Item>
                            <Picker.Item label="Female" value="Female"></Picker.Item>

                        </Picker>
                    </Form>
                </Item>


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
                    onPress={() => confirmButton()}
                />
            </View >
        </ScrollView>






    );
}

export default UserInfoScreen2;

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


