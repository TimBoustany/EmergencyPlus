import React, { Component, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import FormButton from '../components/FormButton';
import * as firebase from 'firebase/app';
import '@firebase/firestore'


class BloodRequestsScreen extends Component {

    constructor(props) {
        super(props);
    }
    userE = firebase.auth().currentUser.email;


    state = {
        requestList: [],
        loading: true,
        isFetching: false,
    }

    unsubscribe = null;

    // Here, when the screen is mounted, it will execute the following: it goes to our firestore collection, and when something changes (onSnapshot), it will push in reqList the database.
    componentDidMount() {
        let reqList = [];
        this.unsubscribe = firebase.firestore().collection('history').onSnapshot(querySnapShot => {
            querySnapShot.forEach(doc => {
                if (doc.data().userEmail == this.userE) {
                    reqList.push(doc.data());
                }

            });
            this.setState({ requestList: reqList, loading: false })
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    Refresh() {
        this.state.isFetching = true;
        let reqList = [];
        this.unsubscribe = firebase.firestore().collection('history').onSnapshot(querySnapShot => {
            querySnapShot.forEach(doc => {
                if (doc.data().userEmail == this.userE) {

                    reqList.push(doc.data());
                }
            });
            this.setState({ requestList: reqList, loading: false, isFetching: false })
        });

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
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.state.isFetching}
                    onRefresh={() => this.Refresh()}
                />
            } >
                <View>


                    <View style={{ flex: 1, marginTop: 40 }}>
                        <FlatList
                            data={this.state.requestList}
                            ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'white' }} />}
                            renderItem={({ item }) => <View style={{ height: 100, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <FormButton
                                    style={styles.button3}
                                    buttonTitle={'Name:           ' + item.name + '\n' + 'Blood Type: ' + item.bloodType + '\n' + 'Location:      ' + item.location}
                                    onPress={() => { this.props.navigation.navigate("Patient", { usrEmail: item.userEmail }) }}
                                />
                                <Text>{item.userEmail}</Text>
                            </View>}

                            keyExtractor={(i, k) => k.toString()}
                            refreshing={this.state.isLoad}
                            onRefresh={this.Refresh}
                        />
                    </View>
                    <FormButton
                        buttonTitle="Add"
                        onPress={() => { this.props.navigation.navigate("RequestInfo") }}
                    />

                </View>
            </ScrollView>


        );
    }

}

export default BloodRequestsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listItem: {
        marginTop: 8,
        marginBottom: 8
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 30
    },
    subtitleStyle: {
        fontSize: 18
    },
    emptyTitle: {
        fontSize: 32,
        marginBottom: 16
    },
    emptySubtitle: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    button3: {
        backgroundColor: 'red',
        borderRadius: 6,
        borderColor: 'red',
        borderWidth: 1,
        height: 70,
        width: 400
    }
});