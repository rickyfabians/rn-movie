import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Image, Dimensions } from 'react-native'
import { View as ViewAnimated } from 'react-native-animatable'
import { useTheme, useNavigation } from '@react-navigation/native'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import MoviesActions from '../Redux/MoviesRedux'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

const { width } = Dimensions.get('screen')
const CardCategory = ({ action, categoryName }) => {
  const { navigate } = useNavigation()
  const { colors } = useTheme()
  const { cardCategory, titleCategory } = styles({ colors })
  const dispatch = useDispatch()
  const movies = useSelector(state => state.movies[`${categoryName}Data`])
  const isFetching = useSelector(state => state.movies[`${categoryName}Fetching`])

  useEffect(() => {
    dispatch(MoviesActions[action]({ page: 1 }))
    return () => {

    }
  }, [])
  return (
    <View style={cardCategory}>
      <Text style={titleCategory}>{categoryName}</Text>
      <ScrollView horizontal>
        {
                    isFetching && isEmpty(movies)
                      ? <ActivityIndicator color={colors.primary} size='large' style={{ height: width * 0.45, alignSelf: 'center' }} />
                      : map(movies?.results, (item, index) => (
                        <ViewAnimated key={index} delay={index / 1000} useNativeDriver animation='slideInRight' easing='ease-out-bounce'>
                          <TouchableOpacity onPress={() => navigate('MovieDetails', { id: item.id })} key={index} style={{ padding: 5 }}>
                            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={{ width: width * 0.3, height: width * 0.45 }} />
                          </TouchableOpacity>
                        </ViewAnimated>
                      ))
                }
      </ScrollView>
    </View>
  )
}

export default CardCategory

const styles = ({ colors }) => StyleSheet.create({
  cardCategory: {
    paddingLeft: 10,
    paddingVertical: 10
  },
  titleCategory: {
    color: colors.text,
    fontSize: 20
  }

})
