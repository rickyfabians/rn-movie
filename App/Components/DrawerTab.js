import React from 'react'
import { View, Text } from 'react-native'
// import { View as ViewAnimated } from 'react-native-animatable'
import { useTheme } from '@react-navigation/native'

// redux

const Tracker = ({ navigation }) => {
  const { colors } = useTheme()
  return (
    <View style={{ padding: 10, flex: 1 }}>
      <Text style={{ color: colors.text }}>testing</Text>
    </View>
  )
}

export default Tracker
