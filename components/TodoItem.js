import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function TodoItem({item}){
    return(
        // 아이템 각각의 뷰 화면
        <View style={styles.item}>
        <View style={styles.titleMargin}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
        <View>
            <Text>{item.category}</Text>
            <Text style={styles.dataText}>{item.createdAt}</Text>
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems :'flex-start',
        paddingLeft : 10,
        paddingVertical : 10
    },
    titleMargin: {
        marginRight: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    dataText: {
        fontSize: 12
    }
})
export default TodoItem