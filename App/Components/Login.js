import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Linking, ActivityIndicator } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'

const { width } = Dimensions.get('window')
const Login = () => {
  const { colors } = useTheme()
  const { title, textInput, container, buttonLogin, textSign, buttonSignUp } = styles({ colors, width })
  const dispatch = useDispatch()
  const authFetching = useSelector(state => state.auth?.authFetching)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const Login = () => dispatch(AuthActions.loginRequest({ username, password }))
  return (
    <View style={container}>
      <Text style={title}>Welcome</Text>
      <TextInput
        style={textInput}
        placeholder='Username'
        placeholderTextColor={colors.text}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={textInput}
        placeholder='Password'
        placeholderTextColor={colors.text}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => Login()} style={buttonLogin}>
        {authFetching
          ? <ActivityIndicator size='small' color={colors.text} />
          : <Text style={textSign}>Login</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.themoviedb.org/account/signup')} style={buttonSignUp}>
        <Text style={textSign}>SignUp</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = ({ colors, width }) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: colors.text,
    fontSize: 20
  },
  textInput: {
    color: colors.text,
    borderColor: colors.border,
    borderRadius: 5,
    borderWidth: 1,
    width: width * 0.8,
    paddingLeft: 10,
    marginTop: 15,
    height: 40
  },
  buttonLogin: {
    borderColor: colors.border,
    borderRadius: 5,
    borderWidth: 1,
    width: width * 0.8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 20
  },
  buttonSignUp: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 10
  },
  textSign: {
    color: colors.text,
    fontSize: 18
  }
})
