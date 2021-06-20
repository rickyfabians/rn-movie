import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme, useNavigation } from '@react-navigation/native'

// import { useDispatch, useSelector } from 'react-redux'
// import AuthActions from '../Redux/AuthRedux'

const { width } = Dimensions.get('window')
const User = () => {
  const { colors } = useTheme()
  const { navigate } = useNavigation()
  const { title, container, button, avatar } = styles({ colors })
  return (
    <View style={container}>
      <View style={avatar} />
      <TouchableOpacity onPress={() => navigate('More', { categoryParam: 'watchList' })} style={button}>
        <Text style={title}>Watchlist</Text>
      </TouchableOpacity>
      <TouchableOpacity style={button}>
        <Text style={title}>Favorite</Text>
      </TouchableOpacity>
    </View>
  )
}

export default User

const styles = ({ colors }) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  avatar: {
    height: width * 0.5,
    width: width * 0.5,
    backgroundColor: colors.text,
    borderRadius: (width * 0.5) / 2,
    marginVertical: 20
  },
  title: {
    color: colors.text,
    fontSize: 20
  },
  button: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: width * 0.9,
    backgroundColor: colors.primary
  }
})
