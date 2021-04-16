import React, { createContext, useState } from 'react';
import * as firebase from 'firebase/app';
import '@firebase/firestore';

// Here we have all the functions we will use (login, logout, ...)

export const AuthContext = createContext();




export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await firebase.auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                        var f = e;
                        alert(f);
                    }
                },
                register: async (email, password) => {
                    try {
                        await firebase.auth().createUserWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                        var l = e;
                        alert(l);
                    }
                },
                logout: async () => {
                    try {
                        await firebase.auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                },
                check: async (Email, password, confirmPassword) => {
                    if (password != confirmPassword) { alert("Password do not match. Please Try again.") }
                    else {
                        try {
                            await firebase.auth().createUserWithEmailAndPassword(Email, password);
                            try {
                                await firebase.firestore()
                                    .collection('users')
                                    .doc(Email)
                                    .set({ firstName: "--", lastName: "--", dateOfBirth: "--", phoneNumber: "--", gender: "--", bloodType: "--", profileSet: "0", email: Email })
                            } catch (e) {
                                console.log(e);
                                var ff = e;
                                alert(ff);
                            }

                        } catch (e) {
                            console.log(e);
                            var k = e;
                            alert(k);
                        }


                    }
                },
                sendVerificationEmail: async () => {
                    try {
                        var d = firebase.auth().currentUser;
                        d.sendEmailVerification();
                    } catch (e) {
                        console.log(e);
                        var b = e;
                        alert(b);
                    }

                },
                sendPassReset: async (email) => {
                    try {
                        await firebase.auth().sendPasswordResetEmail(email);
                    } catch (e) {
                        console.log(e);
                        var a = e;
                        alert(a);
                    }

                },
                userInfoUpdate: async (Email, FirstName, LastName, DateOfBirth, PhoneNumber, Gender, BloodType) => {
                    try {
                        await firebase.firestore()
                            .collection('users')
                            .doc(Email)
                            .set({ firstName: FirstName, lastName: LastName, dateOfBirth: DateOfBirth, phoneNumber: PhoneNumber, gender: Gender, bloodType: BloodType, profileSet: "1", email: Email })
                    } catch (e) {
                        console.log(e);
                        var fgf = e;
                        alert(fgf);
                    }
                },
                requestBlood: async (Email, Name, Location, BloodType, PhoneNumber, Mode) => {
                    try {
                        await firebase.firestore()
                            .collection('requests')
                            .doc(Email)
                            .set({ name: Name, location: Location, bloodType: BloodType, userEmail: Email, createdAt: firebase.firestore.FieldValue.serverTimestamp(), filledBy: '-', phoneNumber: PhoneNumber, mode: Mode })
                    } catch (e) {
                        console.log(e);
                        var fgfr = e;
                        alert(fgfr);
                    }
                    try {
                        await firebase.firestore()
                            .collection('history')
                            .add({ name: Name, location: Location, bloodType: BloodType, userEmail: Email, createdAt: firebase.firestore.FieldValue.serverTimestamp(), phoneNumber: PhoneNumber, mode: Mode })
                    } catch (e) {
                        console.log(e);
                        var fgfr = e;
                        alert(fgfr);
                    }

                },
                updateBlood: async (Email, Name, Location, BloodType) => {
                    try {
                        await firebase.firestore()
                            .collection('requests')
                            .doc(Email)
                            .set({ name: Name, location: Location, bloodType: BloodType, userEmail: Email, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
                    } catch (e) {
                        console.log(e);
                        var fgfr = e;
                        alert(fgfr);
                    }
                },
                deleteBlood: async (Email, Name, Location, BloodType) => {
                    try {
                        await firebase.firestore()
                            .collection('requests')
                            .doc(Email)
                            .delete();
                    } catch (e) {
                        console.log(e);
                        var fgfr = e;
                        alert(fgfr);
                    }
                },




            }}>
            {children}
        </AuthContext.Provider>
    );
};
