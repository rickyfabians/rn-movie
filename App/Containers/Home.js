import React, { useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'

import CardCategory from '../Components/CardCategory'

const Home = () => {
  const { container } = styles()

  useEffect(() => {
    return () => {
    }
  }, [])
  return (
    <View style={container}>
      <ScrollView>
        <CardCategory action='getTrendingRequest' categoryName='trending' />
        <CardCategory action='getPopularRequest' categoryName='popular' />
        <CardCategory action='getTopRatedRequest' categoryName='topRated' />
        <CardCategory action='getUpComingRequest' categoryName='upComing' />
      </ScrollView>
    </View>
  )
}

export default Home

const styles = () => StyleSheet.create({
  container: {
    flex: 1
  }
})
