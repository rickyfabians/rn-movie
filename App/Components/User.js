import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

// import { useDispatch, useSelector } from 'react-redux'
// import AuthActions from '../Redux/AuthRedux'

const User = () => {
  const { colors } = useTheme()
  const { title } = styles({ colors })
  return (
    <View>
      <Text style={title}>Playlist</Text>
      <Text style={title}>Watchlist</Text>
    </View>
  )
}

export default User

const styles = ({ colors }) => StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 10
  }
})
