import * as React from 'react'

import { View } from 'react-native'
import Home from '../Containers/Home'
import SearchPage from '../Containers/SearchPage'
import MovieDetails from '../Containers/MovieDetails'

import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createStackNavigator()
const Empty = () => <View />
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ title: 'Movie DB', headerTitleStyle: { alignSelf: 'center' } }} name='Home' component={BottomNavigator} />
    <Stack.Screen name='MovieDetails' component={MovieDetails} options={{ ...TransitionPresets.SlideFromRightIOS }} />
  </Stack.Navigator>
)

const Bottom = createBottomTabNavigator()

const BottomNavigator = () => {
  return (
    <Bottom.Navigator shifting={false}>
      <Bottom.Screen name='Home' component={Home} />
      <Bottom.Screen name='Search' component={SearchPage} />
      <Bottom.Screen name='Profile' component={Empty} />
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
