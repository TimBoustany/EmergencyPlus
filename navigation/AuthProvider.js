import React, { createContext, useState } from 'react';
import * as firebase from 'firebase/app';

// here we have all the functions we will use (login, logout, ...)

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
                check: async (email, password, confirmPassword) => {
                    if (password != confirmPassword) { alert("Password do not match. Please Try again.") }
                    else {
                        try {
                            await firebase.auth().createUserWithEmailAndPassword(email, password);
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

            }}>
            {children}
        </AuthContext.Provider>
    );
};
