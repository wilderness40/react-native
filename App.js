import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import DashBoardScreen from './screens/DashBoardScreen';
import SettingsScreen from './screens/SettingsScreen';

import DropdownCategory from './components/DropdownCategory';
import {getCollection} from './apis/firebase';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App({navigation}) {
  const [todos, setTodos] = useState([]); // 할 일 목록
  const [loading, setLoading] = useState(true); // 데이터 로딩 여부
  const [caretType, setCaretType] = useState(false);
  const [categoryText, setCategoryText] = useState('카테고리');

  const [yearCaret, setYearCaret] = useState(false);
  const [monthCaret, setMonthCaret] = useState(false);

  useEffect(() => {
    function onResult(querySnapshot) {
      const list = [];
      querySnapshot.forEach(doc => {
        console.log(doc.data());
        list.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setTodos(list);
      setLoading(false);
    }
    function onError(error) {
      console.error(`${error} occured when reading todos`);
    }
    return getCollection(
      'todos',
      onResult,
      onError,
      null,
      {exists: true, condition: ['createdAt', 'asc']},
      null,
    );
  }, []); // 페이지가 처음 로딩되거나 해당 페이지를 벗어날때 실행된다.

  if(loading){
    return(
      <View style={styles.block}>
        <ActivityIndicator size='large' color='#0047AB'/>
        <Text style={styles.loadingText}>Loading ...</Text>
      </View>
    )
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#a8c8ffff',
        }}>
        <Tab.Screen
          name="Home"
          children={props => (
            <HomeScreen
              {...props}
              caretType={caretType}
              setCaretType={setCaretType}
              categoryText={categoryText}
              setCategoryText={setCategoryText}
              todos={todos}
              setTodos={setTodos}
              loading={loading}
            />
          )}
          options={{
            title: '홈',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
            headerTitle: props => (
              <DropdownCategory
                {...props}
                caretType={caretType}
                setCaretType={setCaretType}
                categoryText={categoryText}
                categoryTitle="카테고리"
              />
            ),
            headerStyle: {
              backgroundColor: '#a8c8ffff',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
            },
          }}
        />
        <Tab.Screen
          name="Calendar"
          children={props => (
            <CalendarScreen
              {...props}
              yearCaret={yearCaret}
              setYearCaret={setYearCaret}
              monthCaret={monthCaret}
              setMonthCaret={setMonthCaret}
            />
          )}
          options={{
            title: '달력',
            tabBarIcon: ({color, size}) => (
              <Icon name="calendar-today" color={color} size={size} />
            ),
            headerTitle: props => (
              <View style={{flexDirection: 'row'}}>
                <DropdownCategory
                  {...props}
                  caretType={yearCaret}
                  setCaretType={setYearCaret}
                  categoryText="Year"
                />
                <DropdownCategory
                  {...props}
                  caretType={monthCaret}
                  setCaretType={setMonthCaret}
                  categoryText="Month"
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: '#a8c8ffff',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
            },
          }}
        />
        <Tab.Screen
          name="DashBoard"
          children={props => <DashBoardScreen todos={todos} />}
          options={{
            title: '통계',
            tabBarIcon: ({color, size}) => (
              <Icon name="dashboard" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: '설정',
            tabBarIcon: ({color, size}) => (
              <Icon name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  block:{
    flex:1,
    backgroundColor: '#a8c8ffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center'
  }
})