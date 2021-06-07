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
const categoryAction = {
  popular: MoviesActions.getPopularRequest,
  topRated: MoviesActions.getTopRatedRequest,
  upComing: MoviesActions.getUpComingRequest
}
const CardCategory = ({ categoryParam, categoryTitle }) => {
  const { navigate } = useNavigation()
  const { colors } = useTheme()
  const { cardCategory, titleCategory, headerCategory, moreCategory } = styles({ colors })
  const dispatch = useDispatch()
  const movies = useSelector(state => state.movies[`${categoryParam}Data`])
  const isFetching = useSelector(state => state.movies[`${categoryParam}Fetching`])

  useEffect(() => {
    dispatch(categoryAction[categoryParam]({ page: 1 }))
    return () => {

    }
  }, [])
  return (
    <View style={cardCategory}>
      <View style={headerCategory}>
        <Text style={titleCategory}>{categoryTitle}</Text>
        {movies?.total_results > 20 && (
          <TouchableOpacity onPress={() => navigate('More', { categoryParam })}>
            <Text style={moreCategory}>More ({movies.total_results})</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView horizontal>
        {
                    isFetching && isEmpty(movies)
                      ? <ActivityIndicator color={colors.primary} size='large' style={{ height: width * 0.45, alignSelf: 'center' }} />
                      : map(movies?.results, (item, index) => (
                        <ViewAnimated key={index} delay={index / 1000} useNativeDriver animation='slideInRight' easing='ease-out-quint'>
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
  },
  headerCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  moreCategory: {
    color: colors.primary,
    fontSize: 15
  }

})
