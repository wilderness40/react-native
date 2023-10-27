import React, { useState, useCallback } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Button, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native'

import { getFullcalendar } from '../utils/time'
import DropdownList from '../components/DropdownList'

function CalendarScreen({ navigation, yearCaret, setYearCaret, monthCaret, setMonthCaret }) {
    const today = getFullcalendar(new Date())
    const week = ['일', '월', '화', '수', '목', '금', '토'] // 일주일
    const [selectedYear, setSelectedYear] = useState(today.year) // 현재 선택된 연도
    const [selectedMonth, setSelectedMonth] = useState(today.month) // 현재 선택된 달
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const N = 10 // +-10년 범위
    const offset = today.year - N
    const yearsRange = Array(2 * N).fill(0).map((_, id) => `${id + offset}년`)
    const monthRange = Array(12).fill(0).map((_, id) => `${id + 1}월`)

    const daysOfMonth = new Date(selectedYear, selectedMonth, 0).getDate() // 선택된 연도, 달의 마지막 날짜
    const day = new Date(selectedYear, selectedMonth - 1, 1).getDay() // 선택된 연도, 달의 1일의 요일
    const lastDay = new Date(selectedYear, selectedMonth - 1, daysOfMonth).getDay() // 마지막 요일
    const days = [...Array(day).fill(""), ...Array(daysOfMonth).fill(0).map((_, id) => id + 1), ...Array(week.length - (lastDay + 1)).fill('')]

    const prevMonth = useCallback(() => {
        if (selectedMonth === 1) {
            setSelectedMonth(12)
            setSelectedYear(selectedYear - 1)
        } else {
            setSelectedMonth(selectedMonth - 1)
        }
    }, [selectedMonth])

    const nextMonth = useCallback(() => {
        if (selectedMonth === 12) {
            setSelectedMonth(1)
            setSelectedYear(selectedYear + 1)
        }
        else {
            setSelectedMonth(selectedMonth + 1)
        }
    }, [selectedMonth])
    const selectCategory = (item, e) => {
        console.log('날짜:', item)
        const lastChr = item[item.length - 1]
        if (lastChr == '년') {
            setSelectedYear(parseInt(item))
        } else if (lastChr === '월') {
            setSelectedMonth(parseInt(item))
        }
        closeDropdown()
    }
    const closeDropdown = () => {
        yearCaret && setYearCaret(false)
        monthCaret && setMonthCaret(false)
    }

    const handleOutSideOfMenu = (e) => {
        console.log('캘린더 화면을 터치하셨습니다')
        closeDropdown()
    }
    const setDate = (selectedDate) => {
        console.log(`${selectedYear}-${selectedMonth}-${selectedDate}`)
        navigation.navigate('Home', { date: `${selectedYear}-${selectedMonth}-${selectedDate}` })
    }
    return (
        <SafeAreaView
            style={StyleSheet.block}
            onTouchStart={handleOutSideOfMenu}>
            <StatusBar backgroundColor='#a8c8ffff'></StatusBar>
        {yearCaret && <DropdownList categories={yearsRange} top={-15} rate={2/3} selectCategory={selectCategory}/>}
        {monthCaret && <DropdownList categories={monthRange} top={-15} left={70} selectCategory={selectCategory}/>}
        
        <View style={styles.calendarHeader} onTouchStart={(e)=> { // 터치 시작점 설정 : 캡처링 방지(추가)
            console.log('캘린더 이전/다음')
        }}>
         <Button title='◀︎' onPress={prevMonth}></Button>   
         <Text style={styles.calendarHeaderText}>{selectedYear}년 {selectedMonth}월</Text>
         <Button title='▶︎' onPress={nextMonth}></Button>   
        </View>
        <FlatList 
            data={week}
            keyExtractor={item=> item}
            renderItem={({item}) => (
                <View style={styles.day}>
                    <Text>{item}</Text>
                </View>
            )}
            numColumns={7}
            horizontal={false}
        />
        <FlatList 
            data={days}
            keyExtractor={item=>item}
            renderItem={(item)=> (
                <View style={[
                    styles.day, 
                    (selectedYear === today.year && selectedMonth === today.month && item === today.date) 
                    && styles.today]}
                    onTouchStart={(e)=> {
                        console.log('날짜선택 이벤트')
                        setDate(item)
                    }}
                    >
                    <Text
                        style={[
                            styles.weekday,
                            new Date(selectedYear, selectedMonth - 1, item).getDay() === 0 && styles.sunday,
                            new Date(selectedYear, selectedMonth - 1, item).getDay() === 6 && styles.saturday]}
                    >{item}</Text>
                </View>
            )}
            numColumns={7}
            horizontal={false}
            contentContainerStyle={{justifyContent:'flex-start'}}
        />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1
    },
    calendarContainer: {    // 달력 컨테이너 (전체화면 너비의 80% 너비로 설정)
        width: Dimensions.get('window').width * 0.9, // 80%
        backgroundColor: '#777', 
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      calendarHeader: {   // 달력 헤더(상단부분)
        flexDirection: 'row'
      },
      calendarHeaderText: { // 달력 헤더의 텍스트 영역
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#a8c8ffff',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
      },
      day: {   // 요일과 날짜를 표시하는 달력의 한칸
        backgroundColor: '#fff',
        margin: .2,
        flex: 1, // 7칸을 균등하게 분배하기 위함
        alignItems: 'center',
        padding: 3,
      },
      today: {backgroundColor:  '#a8c9ffff'}, // 현재날짜의 배경색 설정
      weekday: {color: '#333'},  // 모든 날짜의 글자색상
      sunday: {color: '#de1738'}, // 일요일에 해당하는 날짜의 글자색상
      saturday: {color: '#4169e1'} // 토요일에 해당하는 날짜의 글자색상
})

export default React.memo(CalendarScreen)