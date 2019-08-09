import React from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';

import logo from '../assets/logo.png';

export default function Login(){
    return (
        <View style={styles.container}>
            <Image source={logo} />

            <TextInput
            placeholder="Digite o seu usuario no Github"
            placeholderTextColor="#999"
            style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },
});