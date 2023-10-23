import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment'

function TodoItem({id, title, category, createdAt, isDone}){
    return(
        // 아이템 각각의 뷰 화면
        <View style={styles.item}>
        <View style={styles.titleMargin}>
            <Text style={styles.title}>{title}</Text>
        </View>
        <View>
            <Text>{category} ({isDone ? '종료': '진행중'})</Text>
            {/* 시간저장이 예물레이터 내 핸드폰 시간으로 저장이 된다, firebase의 시간이 저장되어야 한다, firebase DB상 시간은 정상적으로 저장된다 .utcOffset('+09:00') 붙여서 해결함*/}
            <Text style={styles.dataText}>{createdAt && createdAt.toDate !== undefined && moment(createdAt.toDate()).utcOffset('+09:00').format('hh:mm:ss')}</Text> 
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
export default React.memo(TodoItem)