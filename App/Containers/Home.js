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
        {/* <CardCategory action='getTrendingRequest' categoryName='trending' categoryTitle='' /> */}
        <CardCategory categoryParam='popular' categoryTitle='Popular' />
        <CardCategory categoryParam='topRated' categoryTitle='Top Rated' />
        <CardCategory categoryParam='upComing' categoryTitle='Up Coming' />
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
