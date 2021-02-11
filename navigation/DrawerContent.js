import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Title, Captiom, Drawer, Caption, Avatar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../navigation/AuthProvider';


export function DrawerContent(props) {
    const { logout } = useContext(AuthContext);

    return (

        // Here we are designing the drawer

        <View style={{ flex: 1 }} >
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Image
                                source={require('../assets/Logo.png')}
                                style={styles.logo}
                            />
                            <View style={{ marginLeft: 10, marginTop: 17, flexDirection: 'column' }}>
                                <Title style={styles.title}>EmergencyPlus</Title>
                            </View>
                        </View>
                    </View>
                </View>
                <DrawerItem
                    activeTintColor='red'
                    style={styles.bottomDrawerSection}
                    icon={() => (
                        <AntDesign
                            name="home"
                            size='20'
                        />
                    )}
                    label="Home"
                    onPress={() => { props.navigation.navigate("Home") }}
                />
                <DrawerItem
                    activeTintColor='red'
                    style={styles.bottomDrawerSection2}
                    icon={() => (
                        <AntDesign
                            name="table"
                            size='20'
                        />
                    )}
                    label="Blood requests"
                    onPress={() => { props.navigation.navigate("BloodRequests") }}
                />
            </DrawerContentScrollView>
            <DrawerItem
                style={styles.bottomDrawerSection}
                icon={() => (
                    <AntDesign
                        name="logout"
                        color='red'
                        size='20'
                    />
                )}
                label="Sign Out"
                color='red'
                onPress={() => logout()}
                activeTintColor='red'
                inactiveTintColor='red'
                activeBackgroundColor='red'
                inactiveBackgroundColor='#ffe8e7'
            />
        </View>

    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 13,
    },
    title: {
        fontSize: 15,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        marginTop: 50,
    },
    bottomDrawerSection2: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    logo: {
        height: 70,
        width: 70,
        resizeMode: 'cover',
    },
});