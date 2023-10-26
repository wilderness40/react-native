import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import TodoItem from './TodoItem'


function TodoList({todos, removeTodo}){
    return(
        <FlatList
            data={todos}
            style={styles.container}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={()=><View style={styles.line}/>}
            renderItem={({item})=> (
                <TodoItem {...item} removeTodo={removeTodo}/>
            )}  
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    line: {
        backgroundColor: '#ddd',
        height: 1
    }
})

export default TodoList