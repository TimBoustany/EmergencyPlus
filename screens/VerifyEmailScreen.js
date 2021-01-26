import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const VerifyEmailScreen = () => {

    const { logout } = useContext(AuthContext); // we take the function logout from AuthContext in <AuthProvider>
    const { sendVerificationEmail } = useContext(AuthContext);


    return (
        <View style={styles.container}>
            <Text>Please verify your e-mail.</Text>
            <FormButton
                buttonTitle="Send e-mail verification"
                onPress={() => sendVerificationEmail()}
            />
            <FormButton
                buttonTitle="Back to Log In"
                onPress={() => logout()}
            />
        </View>
    );


}

export default VerifyEmailScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 200,
    },
});