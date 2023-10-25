import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Button } from 'react-native'

function CalendarScreen({navigation}){
    const testDate = '2023-09-25'
    const getTodoForDate = () => {
        navigation.navigate('Home', {
            date: testDate
        })
    }
    return(
        <SafeAreaView style={StyleSheet.block}>
            <StatusBar backgroundColor='#a8c8ffff'></StatusBar>
            <View>
                <Text>캘린더</Text>
                <Button title='날짜선택' onPress={getTodoForDate}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    block: {
        flex : 1
    }
})

export default CalendarScreen