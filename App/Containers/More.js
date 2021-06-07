import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import { View as ViewAnimated } from 'react-native-animatable'
import { useTheme, useNavigation } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'
import MoviesActions from '../Redux/MoviesRedux'

const { width } = Dimensions.get('screen')
const categoryAction = {
  popular: MoviesActions.getPopularRequest,
  topRated: MoviesActions.getTopRatedRequest,
  upComing: MoviesActions.getUpComingRequest
}
const More = ({ route }) => {
  const categoryParam = route.params?.categoryParam ?? ''
  const { navigate } = useNavigation()
  const { colors } = useTheme()
  const { container, titleItem, textItem, textOverviewItem } = styles({ colors })
  const dispatch = useDispatch()
  const movies = useSelector(state => state.movies[`${categoryParam}Data`])
  const isFetching = useSelector(state => state.movies[`${categoryParam}Fetching`])
  const [data, setData] = useState([])
  let callOnEndReached
  useEffect(() => {
    if (movies?.results) setData(movies.results)
    else dispatch(categoryAction[categoryParam]({ page: 1 }))
    return () => {
    }
  }, [movies])
  const renderMoreItems = () => dispatch(categoryAction[categoryParam]({ page: (data.length / 20) + 1 }, (res) => setData([...data, ...res.results])))
  return (
    <View style={container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `search ${index}`}
        renderItem={({ item, index }) => (
          <ViewAnimated key={index} delay={index / 100} useNativeDriver animation='fadeInUpBig' easing='ease-out-expo'>
            <TouchableOpacity onPress={() => navigate('MovieDetails', { id: item.id })} style={{ padding: 5, flexDirection: 'row' }}>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={{ width: width * 0.3, height: width * 0.45 }} />
              <View style={{ paddingLeft: 10, width }}>
                <Text style={titleItem}>{item.title}</Text>
                <Text style={textItem}>Rating: {item.vote_average}</Text>
                <Text style={textOverviewItem} numberOfLines={7}>{item.overview}</Text>
              </View>
            </TouchableOpacity>
          </ViewAnimated>
        )}
        initialNumToRender={20}
        updateCellsBatchingPeriod={20}
        maxToRenderPerBatch={20}
        onEndReached={() => {
          if (callOnEndReached === false) {
            renderMoreItems()
            callOnEndReached = true
          }
        }}
        ListFooterComponent={() => (isFetching && <ActivityIndicator size='large' color={colors.text} style={{ alignSelf: 'center' }} />)}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => { callOnEndReached = false }}
      />
    </View>
  )
}

export default More

const styles = ({ colors }) => StyleSheet.create({
  container: {
    flex: 1
  },
  searchButton: {
    height: 50,
    margin: 8,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    borderColor: colors.card,
    backgroundColor: colors.text
  },
  titleItem: {
    color: colors.primary,
    fontSize: 15
  },
  textItem: {
    color: colors.notification,
    marginBottom: 10
  },
  textOverviewItem: {
    width: '65%',
    color: colors.text
  }
})
