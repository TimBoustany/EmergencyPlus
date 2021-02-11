import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const ForgotPasswordScreen = () => {

    const [email, setEmail] = useState();
    const { sendPassReset } = useContext(AuthContext);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>Enter your e-mail:</Text>
                <FormInput
                    labelValue={email}
                    onChangeText={(userEmail) => setEmail(userEmail)}
                    placeholderText="Email"
                    iconType="user"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <FormButton
                    buttonTitle="Send reset link"
                    onPress={() => sendPassReset(email)}
                />
            </View>
        </ScrollView>
    );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },
    text: {
        //fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 50,
        color: '#051d5f',
    },
});