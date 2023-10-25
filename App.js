import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import DashBoardScreen from './screens/DashBoardScreen';
import SettingsScreen from './screens/SettingsScreen';

import DropdownCategory from './components/DropdownCategory';
import { getCollection } from './apis/firebase';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

function App() {
  const [todos, setTodos] = useState([]) // 할 일 목록
  const [loading, setLoading] = useState(true) // 데이터 로딩 여부
  const [caretType, setCaretType] = useState(false)
  const [categoryText, setCategoryText] = useState('카테고리')

  useEffect(() => {
    function onResult(querySnapshot) {
      const list = []
      querySnapshot.forEach(doc => {
        console.log(doc.data())
        list.push({
          ...doc.data(),
          id: doc.id,
        })
      })
      setTodos(list)
      if (loading) setLoading(false)
    }
    function onError(error) {
      console.error(`${error} occured when reading todos`)
    }
    return getCollection('todos', onResult, onError, null, { exists: true, condition: ['createdAt', 'asc'] }, null)
  }, []) // 페이지가 처음 로딩되거나 해당 페이지를 벗어날때 실행된다. 


  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home' screenOptions={{
        tabBarActiveTintColor: '#a8c8ffff'
      }}>
        <Tab.Screen name='Home' children={(props) =>
          <HomeScreen
            {...props}
            caretType={caretType}
            setCaretType={setCaretType}
            categoryText={categoryText}
            setCategoryText={setCategoryText}
            todos={todos}
            setTodos={setTodos}
            loading={loading}
          />}
          options={{
            title: '홈',
            tabBarIcon: ({ color, size }) => <Icon name='home' color={color} size={size} />,
            headerTitle: (props) => <DropdownCategory {...props} caretType={caretType} setCaretType={setCaretType} categoryText={categoryText} />,
            headerStyle: {
              backgroundColor: '#a8c8ffff'
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff'
            }
          }} />
        <Tab.Screen name='Calendar' component={CalendarScreen} options={{
          title: '달력',
          tabBarIcon: ({ color, size }) => <Icon name='calendar-today' color={color} size={size} />
        }} />
        <Tab.Screen name='DashBoard' component={DashBoardScreen} options={{
          title: '통계',
          tabBarIcon: ({ color, size }) => <Icon name='dashboard' color={color} size={size} />
        }} />
        <Tab.Screen name='Settings' component={SettingsScreen} options={{
          title: '설정',
          tabBarIcon: ({ color, size }) => <Icon name='settings' color={color} size={size} />
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  )

}


export default App;