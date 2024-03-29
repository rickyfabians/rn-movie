import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput, Dimensions } from 'react-native'
import { View as ViewAnimated } from 'react-native-animatable'
import { useTheme, useNavigation } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'
import MoviesActions from '../Redux/MoviesRedux'

import isEmpty from 'lodash/isEmpty'

const { width } = Dimensions.get('screen')
const SearchPage = () => {
  const searchRef = useRef(null)
  const { isFocused, navigate } = useNavigation()
  const { colors } = useTheme()
  const { searchButton, container, titleItem, textItem, textOverviewItem } = styles({ colors })
  const dispatch = useDispatch()
  const movies = useSelector(state => state.movies.listOfMovieData)
  const [data, setData] = useState([])
  const [keyword, onChangeKeyword] = useState('')
  let callOnEndReached

  useEffect(() => {
    if (isFocused) searchRef.current.focus()
    return () => {
    }
  }, [isFocused])

  useEffect(() => {
    if (movies?.results) setData(movies.results)
    return () => {
    }
  }, [movies])

  useEffect(() => {
    if (!isEmpty(keyword)) dispatch(MoviesActions.getListOfMovieRequest({ page: 1, query: keyword }))
    return () => {
    }
  }, [keyword])
  const renderMoreItems = () => dispatch(MoviesActions.getListOfMovieRequest({ page: (data.length / 20) + 1, query: keyword }, (res) => setData([...data, ...res.results])))
  return (
    <View style={container}>
      <TextInput
        ref={searchRef}
        style={searchButton}
        value={keyword}
        onChangeText={onChangeKeyword}
      />
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
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => { callOnEndReached = false }}
      />
    </View>
  )
}

export default SearchPage

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
