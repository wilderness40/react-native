import React, {useState, useEffect, useRef} from 'react'
import { 
    SafeAreaView, 
    View, Text, 
    StyleSheet, 
    StatusBar, 
    Keyboard,
    FlatList,
    TouchableHighlight 
} from 'react-native'

import DateHeader from '../components/DateHeader'
import Default from '../components/Default';
import TodoInsert from '../components/TodoInsert';
import TodoList from '../components/TodoList';

import DropdownItem from '../components/DropdownItem';


function HomeScreen({navigation, caretType, setCaretType, categoryText, setCategoryText}){
    const date = new Date()
    const categories = ['자기계발', '업무', '오락', '여행', '연애', 'IT', '취미'] // 카테고리 배열 (추가)
    const [todos, setTodos] = useState([
        {id: 1, title: '공원에 산책가기', category: '여행', createdAt: '2023-08-22', isDone: false},
        {id: 2, title: '보고서 작성하기', category: '업무', createdAt: '2023-08-22', isDone: true},
        {id: 3, title: '자기전에 책읽기', category: '자기계발', createdAt: '2023-08-22', isDone: false},
    ])
    const [todoText, setTodoText] = useState('')
    const [warning, setWarning] = useState(false)
    const category = useRef('') // 카테고리 변수

    const onInsertTodo = (trimedText) => {
        if(!category.current){ // 카테고리를 선택하지 않은 경우
            setTodoText('카테고리를 먼저 선택하세요')
            setWarning(true)
            return // return을 안쓰면 아래 로직이 실행되어 trimedText가 undefined가 되어 오류가 발생한다.
        }
        if(trimedText && trimedText.length > 3){ // 최소 글자수 제한
            const nextId = todos.length + 1
            const todoContents = trimedText.split(',')
            const createdTime = new Date()
            
            const newTodo = {
                id: todos.length + 1,
                title: todoContents[0],
                category: category.current || '자기계발', // 선택한 카테고리 설정
                createdAt: `${createdTime.getFullYear()}-${(createdTime.getMonth()+1)}-${createdTime.getDate()}`, // 템플릿 리터럴 미사용
            }
          
            if(todos.filter(todo => todo.title === newTodo.title).length > 0){
                setTodoText('중복된 할 일 입니다')
                setWarning(true)
            }else{
                setTodos([newTodo, ...todos])
                Keyboard.dismiss()
                setTodoText('')
                category.current='' // 카테고리 초기화
            }
        }else{
            console.log('3자 이상 입력하세요!')
            setTodoText('3자 이상 입력하세요!')
            setWarning(true)
        }
    }

    const closeDropdown = () => { //드롭다운 숨기기
        caretType && setCaretType(false)
    }
    const selectCategory = (item, e) => { // 드롭다운 메뉴에서 카테고리 선택시
        console.log('selectCategory')
        closeDropdown()
        category.current = item
        setCategoryText(category.current) // 선택한 카테고리 텍스트 설정
        console.log(categoryText)
    }
    const handleOutSideOfMenu = () => { // 드롭다운 메뉴 이외 영역 터치시 드롭다운 숨기기
        console.log('handleOutSideOfMenu')
        closeDropdown()
    }

    useEffect(() => navigation.addListener('focus', () => console.log('페이지 로딩')), []) // 페이지가 처음 로딩되거나 해당 페이지를 벗어날때 실행된다. 
    useEffect(() => navigation.addListener('blur', () => console.log('페이지 벗어남')), []) // 페이지가 처음 로딩되거나 해당 페이지를 벗어날때 실행된다. 

    return(
        <SafeAreaView 
            style={styles.block}
            onTouchStart={handleOutSideOfMenu} // 홈화면 터치시
        >
            <StatusBar backgroundColor='#a8c8ffff'></StatusBar>

            {caretType 
            && 
            <View 
                style={styles.dropdownShadow}
                onTouchStart={(e)=> { // 드롭다운 메뉴 터치시
                    console.log('여기를 지나침')
                    e.stopPropagation() // 드롭다운 메뉴 터치시 이벤트 버블링 방지
                }}
            >
                <FlatList
                    data={categories}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <DropdownItem // 드롭다운 메뉴 컴포넌트
                            category={item} 
                            closeDropdown={closeDropdown} 
                            selectCategory={(e)=> selectCategory(item, e)} // 카테고리 선택시 이벤트핸들러 함수 등록
                        />
                    )}
                    style={styles.dropdownList}
                />
            </View>
                }

            <DateHeader date={date}/>
            {todos.length !==0 ? <TodoList todos={todos}/> : <Default/>}
            <TodoInsert 
                onInsertTodo={onInsertTodo} 
                todoText={todoText} 
                setTodoText={setTodoText} 
                warning={warning}
                setWarning={setWarning}
                setCategoryText={setCategoryText}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    block: {
        flex : 1
    },
    dropdownList:{
        padding: 5
    },
    dropdownShadow: {
        shadowOffset: {width:0, height:20},
        shadowColor: '#000',
        shadowOpacity: 0.25,
        backgroundColor: '#fff',
        zIndex: 1,
        elevation: 1, // 안드로이드에서만 적용
        position: 'absolute',
        top: -15,
        borderRadius: 5,
        margin: 15
    }
})

export default HomeScreen