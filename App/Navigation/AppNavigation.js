import * as React from 'react'

// import { View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Home from '../Containers/Home'
import SearchPage from '../Containers/SearchPage'
import Profile from '../Containers/Profile'
import MovieDetails from '../Containers/MovieDetails'
import More from '../Containers/More'

import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createStackNavigator()
// const Empty = () => <View />
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ title: 'Movie DB', headerTitleStyle: { alignSelf: 'center' } }} name='Home' component={BottomNavigator} />
    <Stack.Screen name='MovieDetails' component={MovieDetails} options={{ ...TransitionPresets.SlideFromRightIOS }} />
    <Stack.Screen name='More' component={More} options={{ ...TransitionPresets.SlideFromRightIOS }} />
  </Stack.Navigator>
)

const Bottom = createBottomTabNavigator()

const BottomNavigator = () => {
  return (
    <Bottom.Navigator initialRouteName='home'>
      <Bottom.Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='home' color={color} size={size} />
          )
        }}
      />
      <Bottom.Screen
        name='search'
        component={SearchPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='search' color={color} size={size} />
          )
        }}
      />
      <Bottom.Screen
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='smile' color={color} size={size} />
          )
        }}
      />
    </Bottom.Navigator>
  )
}

function App () {
  return (
    <NavigationContainer theme={DarkTheme}>
      {StackNavigator()}
    </NavigationContainer>
  )
}

export default App
