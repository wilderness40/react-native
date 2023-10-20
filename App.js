import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import DashBoardScreen from './screens/DashBoardScreen';
import SettingsScreen from './screens/SettingsScreen';

import DropdownCategory from './components/DropdownCategory';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

function App() {
  const [caretType, setCaretType] = useState(false)
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName = 'Home' screenOptions={{
        tabBarActiveTintColor: '#a8c8ffff'
      }}>
        <Tab.Screen name='Home' children={(props) => <HomeScreen {...props} caretType={caretType} setCaretType={setCaretType}/>}       
         options={{
          title: '홈',
          tabBarIcon: ({color, size}) => <Icon name='home' color={color} size={size}/>,
          headerTitle: (props)=> <DropdownCategory {...props} caretType={caretType} setCaretType={setCaretType}/>,
          headerStyle: {
            backgroundColor: '#a8c8ffff'
          },
          headerTitleStyle: {
            fontWeight:'bold',
            color: '#fff'
          }
        }}/>
        <Tab.Screen name='Calendar' component={CalendarScreen} options={{
          title: '달력',
          tabBarIcon: ({color, size}) => <Icon name='calendar-today' color={color} size={size}/>
        }}/>
        <Tab.Screen name='DashBoard' component={DashBoardScreen} options={{
          title: '통계',
          tabBarIcon: ({color, size}) => <Icon name='dashboard' color={color} size={size}/>
        }}/>
        <Tab.Screen name='Settings' component={SettingsScreen} options={{
          title: '설정',
          tabBarIcon: ({color, size}) => <Icon name='settings' color={color} size={size}/>
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )

}


export default App;