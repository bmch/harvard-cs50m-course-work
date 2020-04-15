import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { DashboardNavigationProp } from '../App';
import { movieResult } from './movieResult';

const Movie: React.FC<{
  movie: movieResult;
  navigation: DashboardNavigationProp;
}> = ({ movie, navigation }) => {
  const showMovieDetails = () => {
    navigation.navigate('Details', { movieResult: movie, title: movie.Title });
  };

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => showMovieDetails()}
    >
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          {movie?.Poster && (
            <Image
              style={styles.image}
              source={{
                uri: movie.Poster,
              }}
            />
          )}
        </View>

        <View style={styles.titleYear}>
          <View>
            <Text style={styles.title}>{movie?.Title && movie.Title}</Text>
          </View>
          <View>
            <Text>
              {movie?.Year && movie.Year} ({movie?.Type && movie.Type})
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default Movie;

const styles = StyleSheet.create({
  item: {
    width: '99%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 4,
    marginBottom: 4,
  },
  imageContainer: {
    width: 66,
    marginRight: 20,
    paddingLeft: 4,
    marginLeft: 4,
    height: 58,
  },
  image: {
    height: 58,
  },
  titleYear: {
    flexDirection: 'column',
    width: 250,
  },
  title: {
    fontWeight: 'bold',
  },
});
