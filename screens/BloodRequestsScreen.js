import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator, Item } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import FormButton from '../components/FormButton';
import * as firebase from 'firebase/app';
import '@firebase/firestore'


class BloodRequestsScreen extends Component {
    state = {
        requestList: [],
        loading: true,
    }

    unsubscribe = null;

    // Here, when the screen is mounted, it will execute the following: it goes to our firestore collection, and when something changes (onSnapshot), it will push in reqList the database.
    componentDidMount() {
        let reqList = [];
        this.unsubscribe = firebase.firestore().collection('requests').onSnapshot(querySnapShot => {
            querySnapShot.forEach(doc => {
                reqList.push(doc.data());
            });
            this.setState({ requestList: reqList, loading: false })
        });



    }


    componentWillUnmount() {
        this.unsubscribe();
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
            <ScrollView>
                <View>

                    <FormButton
                        buttonTitle="Add"
                        onPress={() => { this.props.navigation.navigate("RequestInfo") }}
                    />

                    <FlatList
                        data={this.state.requestList}
                        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'red' }} />}
                        renderItem={({ item }) => <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>User Name: {item.name}</Text>
                        </View>}
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
    }
});