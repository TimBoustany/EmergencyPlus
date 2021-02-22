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



class HomeScreen extends Component {

    state = {
        user: {},
        loading: true,
    }

    unsubscribe = null;

    // componentDidMount is a fucntion that executes once the class is called.
    componentDidMount() {

        // Here we are subscribing to the database's file of user, in order to update in real time the screen
        this.unsubscribe = firebase.firestore().collection("users").doc("tim-boustany@hotmail.com").onSnapshot(doc => {
            this.setState({ user: doc.data(), loading: false });
            this.set(this.state.user.profileSet);

        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    set(bt) {
        if (bt == "0") {
            this.props.navigation.navigate("EditProfile2");
        }
    }



    render() {
        if (this.state.loading) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )
        }

        return (

            < ScrollView >
                <View style={styles.container}>
                    <View style={styles.container2}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text3}>{this.state.user.bloodType}</Text>
                            <View>
                                <Text style={styles.text}>{this.state.user.firstName}</Text>
                                <Text style={styles.text}>{this.state.user.lastName}</Text>
                                <Text style={styles.text2}>{this.state.user.dateOfBirth}</Text>
                                <Text style={styles.text2}>{this.state.user.gender}</Text>
                                <Text style={styles.text2}>{this.state.user.phoneNumber}</Text>
                            </View>
                        </View>
                        <FormButton buttonTitle='Edit card' onPress={() => { this.props.navigation.navigate("EditProfile") }} />

                    </View>
                    <Title>My stats:</Title>
                    <View>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Units donated:</Text>
                            <Text style={styles.text4}>0</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >


        );
    }

}
export default HomeScreen;

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
        fontSize: 38,
        marginBottom: 10,
        marginLeft: 20,
        color: 'white',
    },
    text2: {
        //fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 25,
        color: 'white',
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

/*import React, { useContext, useEffect } from 'react';


import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { createStackNavigator } from '@react-navigation/stack';
import UserInfoScreen from '../screens/UserInfoScreen';
import * as firebase from 'firebase/app';
import '@firebase/firestore'

function HomeScreen({ navigation }) {

    const { user } = useContext(AuthContext);
    var info;
    let firstName, bloodType;

    getInfo = async () => {
        info = await firebase.firestore().collection("users").doc(user.email).get();
        firstName = info.data().firstName;
        bloodType = info.data().bloodType;
        console.log(bloodType);
    }

    useEffect(() => {
        getInfo();
    }, []);


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.container2}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text3}>{bloodType}</Text>
                        <View>
                            <Text style={styles.text}>Tim Boustany</Text>
                            <Text style={styles.text2}>21 years old, Male</Text>
                        </View>
                    </View>
                    <FormButton buttonTitle='Edit card' onPress={() => navigation.navigate("EditProfile")} />
                    <FormButton buttonTitle='Edit ' onPress={() => getInfo()} />

                </View>
            </View>
        </ScrollView>


    );

}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        paddingTop: 30,
        paddingBottom: 600,
        backgroundColor: 'white',
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
        fontSize: 38,
        marginBottom: 10,
        marginLeft: 20,
        color: 'white',
    },
    text2: {
        //fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 25,
        color: 'white',
    },
    text3: {
        //fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 88,
        marginBottom: 10,
        marginLeft: 0,
        color: 'white',
    },

    logo: {
        height: 100,
        width: 100,
        resizeMode: 'cover',
        marginBottom: 0,
    },
});

*/