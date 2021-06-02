import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native'
import { View as ViewAnimated } from 'react-native-animatable'
import { useTheme } from '@react-navigation/native'
import isEmpty from 'lodash/isEmpty'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import MoviesActions from '../Redux/MoviesRedux'

const { width, height } = Dimensions.get('window')
const MovieDetails = ({ route }) => {
  const movieId = route?.params?.id ?? null
  const { colors } = useTheme()
  const { text, textScore, title, container, subTitle, box, body } = styles({ colors })
  const dispatch = useDispatch()
  const movie = useSelector(state => state.movies.movieDetailsData)

  useEffect(() => {
    dispatch(MoviesActions.getMovieDetailsRequest({ movieId }))
    return () => {
    }
  }, [movieId])
  if (isEmpty(movie)) return null
  return (
    <View style={container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height }}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={{ width: width, height: height * 0.75, resizeMode: 'contain' }} />
        </View>
        <ViewAnimated style={body} useNativeDriver animation='fadeInUpBig' easing='ease-out-expo'>
          <Text style={title}>{movie.title}</Text>
          <Text style={textScore}>Rating: {movie.vote_average} ({movie.vote_count})</Text>
          <View style={box}>
            <Text style={subTitle}>Overview</Text>
            <Text style={text}>{movie.overview}</Text>
          </View>
        </ViewAnimated>
      </ScrollView>
    </View>
  )
}

export default MovieDetails

const styles = ({ colors }) => StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    backgroundColor: colors.background,
    borderRadius: 15,
    paddingTop: 15,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    minHeight: width
  },
  box: {
    marginVertical: 10
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
  title: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold'
  },
  subTitle: {
    color: colors.text,
    fontSize: 20
  },
  textScore: {
    color: colors.notification
  },
  text: {
    color: colors.text
  }

})
