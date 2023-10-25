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

import { addData,  getCurrentTime } from '../apis/firebase'
import { getToday, getTommorrow} from '../utils/time'

function HomeScreen({navigation, caretType, setCaretType, categoryText, setCategoryText, todos, loading, route}){ // navigation은 props로 전달되어야 한다.
    const categories = ['자기계발', '업무', '오락', '여행', '연애', 'IT', '취미'] // 카테고리 배열 (추가)
    const [todoText, setTodoText] = useState('') // 할 일 텍스트
    const [incorrect, setIncorrect] = useState('') // 오류테스트저장 
    const [warning, setWarning] = useState(false) 
    
    const category = useRef('') // 카테고리 변수
    const date = (route.params && route.params.date) ? new Date(route.params.date) : new Date() // route.params.date가 있으면 해당 날짜로, 없으면 오늘 날짜로 설정
    const today = getToday(date) 
    const tomorrow = getTommorrow((getToday(date)))
    const todosToday = todos.filter(todo => todo.createdAt?.toDate() >= today && todo.createdAt?.toDate() < tomorrow)
    const todosTodayLatest = [...todosToday] // 원본복사
    todosTodayLatest.sort((a, b)=> b.createdAt.seconds - a.createdAt.seconds) // 최신순으로 정렬

    console.log('현재 선택날짜:', date)
    console.log('날짜비교: ', date.getTime(), today.getTime() != getToday(new Date()).getTime())


    const onInsertTodo = async (trimedText) => {
        if(!category.current){ // 카테고리를 선택하지 않은 경우
            setTodoText('카테고리를 먼저 선택해주세요!')
            setWarning(true)
            return 
          }
          if(trimedText && trimedText.length > 3){ // 최소 글자수 제한
            if(todos.filter(todo => todo.title === trimedText).length > 0){
              setTodoText('중복된 할일입니다.')
              setWarning(true)
            }else{
              const newTodo = {
                title: trimedText,
                category: category.current || '자기계발', // 선택한 카테고리 설정 (수정)
                isDone: false,
                createdAt: getCurrentTime(), // 클라이언트 기준이 아니라 서버기준 저장시각
              }
              await addData('todos', newTodo)
              Keyboard.dismiss() // 추가버튼 클릭시 키보드 감추기 
              setTodoText('') // 입력창 초기화
              category.current = '' // 카테고리 초기화 (추가)
            }
          }else{
            console.log('3자 이상 입력하세요!')
            setTodoText('3자 이상 입력하세요!')
            setWarning(true)
          }

        // if(!category.current){ // 카테고리를 선택하지 않은 경우
        //     setTodoText('카테고리를 먼저 선택하세요')
        //     // Keyboard.dismiss()
        //     setWarning(true)
        //     // setTodoText('')
        //     // setIncorrect('카테고리를 먼저 선택하세요')
        //     return // return을 안쓰면 아래 로직이 실행되어 trimedText가 undefined가 되어 오류가 발생한다.
        // }
        // if(trimedText && trimedText.length > 3){ // 최소 글자수 제한
        //     // const nextId = todos.length + 1
        //     // const todoContents = trimedText.split(',')
        //     // const createdTime = new Date()
            
        //     const newTodo = {
        //         title: trimedText,
        //         category: category.current || '자기계발', // 선택한 카테고리 설정
        //         isDone : false,
        //         createdAt: getCurrentTime(), // 클라이언트 기준이 아니라 서버기준 저장시각
        //         // createdAt: `${createdTime.getFullYear()}-${(createdTime.getMonth()+1)}-${createdTime.getDate()}`, // 템플릿 리터럴 미사용
        //     }
        //     await addData('todos', newTodo) // firestore에 데이터 추가')
          
        //     if(todos.filter(todo => todo.title === trimedText).length > 0){
        //         setTodoText('중복된 할 일 입니다')
        //        setWarning(true)
        //     //    setTodoText('')
        //     //    setIncorrect('중복된 할 일 입니다')
        //     }else{
        //         setTodos([newTodo, ...todos])
        //         Keyboard.dismiss()
        //         setTodoText('')
        //         category.current='' // 카테고리 초기화
        //         setCategoryText('카테고리')
        //     }
        // }else{
        //     console.log('3자 이상 입력하세요!')
        //     setTodoText('3자 이상 입력하세요!')
        //     setWarning(true)
        //     // setTodoText('')
        //     // setIncorrect('3자 이상 입력하세요!')
        //     // Keyboard.dismiss()
        // }
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

    if(loading){ // 로딩화면
        return(
            <View>
                <Text>로딩중...</Text>
            </View>
        )
    }

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
            {/* 해당날짜 기준 최신순으로 정렬된 할일목록 */}
            {todosTodayLatest.length === 0 ? 
                <Default/> : <TodoList todos={todosTodayLatest}/>}
                <TodoInsert 
                    onInsertTodo={onInsertTodo} 
                    todoText={todoText} 
                    setTodoText={setTodoText} 
                    warning={warning}
                    setWarning={setWarning}
                    setCategoryText={setCategoryText}
                    incorrect={incorrect}
                    setIncorrect={setIncorrect}
                    disabled={today.getTime() !== getToday(new Date()).getTime()}
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