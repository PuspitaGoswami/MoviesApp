import React, {useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Modal,
  Pressable,
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import PlayButton from '../components/PlayButton';
import {getMovieDetail} from '../services/Services';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';

const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const movieId = route.params.movieId;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMovieDetail(movieId).then(
      movieData => {
        setMovieDetail(movieData);
        setLoaded(true);
      },
      [movieId],
    );
  });

  const videoShown = () => {
    console.log('pressed');
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{
                uri:
                  'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path,
              }}
            />

            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePressed={videoShown} />
              </View>
              <Text style={styles.MovieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genres => {
                    return (
                      <Text style={styles.genres} key={genres.id}>
                        {genres.name}
                      </Text>
                    );
                  })}
                </View>
              )}

              <StarRating
                fullStarColor="gold"
                starSize={30}
                maxStars={5}
                rating={movieDetail.vote_average / 2}
                disabled={true}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release_date}>
                {'Release Date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dd, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.container}>
              {/* <VideoPlayer
                video={{
                  uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                }}
              /> */}
            </View>
          </Modal>
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MovieTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    height: height / 2.5,
  },
  genresContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  genres: {
    fontWeight: 'bold',
    marginRight: 10,
    color: 'black',
  },
  overview: {
    color: 'black',
    padding: 15,
  },
  release_date: {
    color: 'black',
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
});

export default Detail;
