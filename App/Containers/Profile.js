import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import Login from '../Components/Login'
import User from '../Components/User'

import { useSelector } from 'react-redux'

const Profile = () => {
  const { container } = styles()
  const isLogin = useSelector(state => state.auth?.authData?.success)
  const state = useSelector(state => state)
  useEffect(() => {
    return () => {
    }
  }, [])
  return (
    <View style={container}>
      {isLogin
        ? <User />
        : <Login />}
    </View>
  )
}

export default Profile

const styles = () => StyleSheet.create({
  container: {
    flex: 1
  }
})
