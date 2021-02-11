import React, { Component } from 'react';
import { Text, View } from 'react-native';
import FormButton from '../components/FormButton';


class BloodRequestsScreen extends Component {

    render() {
        return (

            <View>
                <Text>Test</Text>

                <FormButton
                    buttonTitle="Add"
                    onPress={() => { this.props.navigation.navigate("RequestInfo") }}
                />

            </View>


        );
    }

}

export default BloodRequestsScreen;