import React, { Component, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { createStackNavigator } from '@react-navigation/stack';
import UserInfoScreen from '../screens/UserInfoScreen';
import * as firebase from 'firebase/app';
import '@firebase/firestore'
import { Title } from 'native-base';
import UserInfoScreen2 from '../screens/UserInfoScreen2';



class PatientScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        userInfo: {},
        loading: true,
    }



    unsubscribe = null;

    // componentDidMount is a fucntion that executes once the class is called.
    componentDidMount() {
        const navigate = this.props.route.params.usrEmail; // Before, we passed parameters to this screen. Now here, we are getting the parameters passed.
        console.log(navigate);

        // Here we are subscribing to the database's file of user, in order to update in real time the screen
        this.unsubscribe = firebase.firestore().collection("requests").doc(navigate).onSnapshot(doc => {
            this.setState({ userInfo: doc.data(), loading: false });

        })
    }

    status = 'Donate';



    componentWillUnmount() {
        this.unsubscribe();
    }

    userEmail = firebase.auth().currentUser.email;


    Edit() {

        if (this.userEmail == this.props.route.params.usrEmail) {
            this.props.navigation.navigate("Edit");
        }
        else {
            alert("Permission required");
        }
    }

    Delete() {
        if (this.userEmail == this.props.route.params.usrEmail) {
            this.unsubscribe();
            this.props.navigation.navigate("BloodRequests");
            firebase.firestore()
                .collection('requests')
                .doc(this.userEmail)
                .delete();


        }
        else {
            alert("Permission required");
        }

    }

    fillReq() {
        if (this.state.userInfo.filledBy == this.userEmail || this.state.userInfo.filledBy == "-") {
            if (this.status == "Donate") {


                try {
                    firebase.firestore()
                        .collection('requests')
                        .doc(this.state.userInfo.userEmail)
                        .update({ filledBy: this.userEmail })
                } catch (e) {
                    console.log(e);
                    var fgfr = e;
                    alert(fgfr);
                }


            }
            if (this.status == "Remove Donation") {
                try {
                    firebase.firestore()
                        .collection('requests')
                        .doc(this.props.route.params.usrEmail)
                        .update({ filledBy: "-" })
                } catch (e) {
                    console.log(e);
                    var fgfr = e;
                    alert(fgfr);
                }
            }
        }
        else { alert("You don't have permission to remove donation") }
    }



    render() {

        if (this.state.loading) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )
        }

        if (this.state.userInfo.filledBy == "-") { this.status = "Donate" } else { this.status = "Remove Donation" }

        return (

            < ScrollView >
                <View style={styles.container}>
                    <View style={styles.container2}>

                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.text}>Name:            {this.state.userInfo.name}</Text>
                                <Text style={styles.text}>Blood type:   {this.state.userInfo.bloodType}</Text>
                                <Text style={styles.text}>Location:       {this.state.userInfo.location}</Text>
                                <Text style={styles.text}>Mode:            {this.state.userInfo.mode}</Text>
                                <Text style={styles.text}>Phone:           {this.state.userInfo.phoneNumber}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.text2}>Filled by:       {this.state.userInfo.filledBy}</Text>

                    <FormButton
                        buttonTitle="Edit"
                        onPress={() => this.Edit()}
                    />
                    <FormButton
                        buttonTitle="Delete"
                        onPress={() => this.Delete()}

                    />
                    <View>
                        <FormButton
                            buttonTitle={this.status}
                            onPress={() => this.fillReq()}

                        />
                    </View>
                </View>
            </ScrollView >

        );
    }

}
export default PatientScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        paddingTop: 30,
        paddingBottom: 600,
    },
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        paddingTop: 30,
        backgroundColor: 'red',
        borderRadius: 25,
    },
    text: {
        //fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 23,
        marginBottom: 10,
        marginLeft: 20,
        color: 'white',
    },
    text2: {
        //fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 25,
        color: 'black',
    },
    text3: {
        //fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 88,
        marginBottom: 10,
        marginLeft: 0,
        color: 'white',
    },
    text4: {
        //fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 88,
        marginBottom: 10,
        marginLeft: 0,
        color: 'red',
    },

    logo: {
        height: 100,
        width: 100,
        resizeMode: 'cover',
        marginBottom: 0,
    },
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        borderColor: 'grey',
        borderWidth: 1.4,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        borderRadius: 17,
    },


});