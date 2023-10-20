import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native'

function SettingsScreen({navigation}){
    return(
        <SafeAreaView style={StyleSheet.block}>
            <StatusBar backgroundColor='#a8c8ffff'></StatusBar>
            <View>
                <Text>설정</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    block: {
        flex : 1
    }
})

export default SettingsScreen