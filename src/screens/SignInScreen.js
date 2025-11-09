import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebase_auth } from '../utils/FireBaseConfig';

export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(firebase_auth, email.trim(), password);
            Alert.alert('Account created!');
        } catch (e) {
            Alert.alert('Sign up failed', e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async () => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(firebase_auth, email.trim(), password);
        } catch (e) {
            Alert.alert('Sign in failed', e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>

            
                <Text style={styles.title}>Sign in or create an account</Text>

                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />

                <TouchableOpacity
                    onPress={handleSignIn}
                    disabled={loading}
                    style={[styles.button, styles.signInButton]}
                >
                    <Text style={styles.buttonText}>{loading ? 'Working�' : 'Sign In'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSignUp}
                    disabled={loading}
                    style={[styles.button, styles.signUpButton]}
                >
                    <Text style={styles.buttonText}>{loading ? 'Working�' : 'Create Account'}</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: "center",
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    button: {
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
    },
    signInButton: {
        backgroundColor: '#111827',
    },
    signUpButton: {
        backgroundColor: '#2563eb',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
});
