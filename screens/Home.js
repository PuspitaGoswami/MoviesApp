import React, {useState, useEffect} from 'react';

import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovie,
  getDocumentary,
} from '../services/Services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';
const dimension = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [movieImages, setMovieImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovie, setFamilyMovie] = useState();
  const [documentary, setDocumentary] = useState();

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovie(),
      getDocumentary(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upComingMovieData,
          pupularMoviesData,
          popularTvData,
          familyMovieData,
          documentaryData,
        ]) => {
          const movieImagesArray = [];
          upComingMovieData.forEach(movie => {
            movieImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });
          setMovieImages(movieImagesArray);
          setPopularMovies(pupularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovie(familyMovieData);
          setDocumentary(documentaryData);
          setLoaded(true);
        },
      )
      .catch(() => setError(true))
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView>
          {movieImages && (
            <View style={styles.container}>
              <SliderBox
                dotStyle={styles.sliderStyle}
                images={movieImages}
                sliderBoxHeight={dimension.height / 1.8}
                autoplay={true}
                circleLoop={true}
              />
            </View>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movie List"
                content={popularMovies}></List>
            </View>
          )}

          {popularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTv}></List>
            </View>
          )}

          {familyMovie && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovie}></List>
            </View>
          )}

          {documentary && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentary"
                content={documentary}></List>
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
