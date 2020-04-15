import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { fetchById } from '../services/ApiService';
import { DetailsScreenRouteProp } from '../App';

type Props = {
  route: DetailsScreenRouteProp;
};

const MovieDetails = ({ route }: Props) => {
  const { Title, Year, imdbID } = route.params.movieResult;
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    fetchById(imdbID).then((info) => {
      setMovieInfo(info);
    });
  }, []);
  if (movieInfo) {
    console.log(movieInfo);
  }

  return (
    <ScrollView style={styles.giantContainer}>
      {movieInfo && (
        <View style={styles.conditionalContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: movieInfo.Poster,
              }}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.headLine}>
              <Text style={styles.title}>{Title}</Text>
              <Text>({Year})</Text>
            </View>

            <View style={styles.filmRating}>
              <Text>
                {movieInfo.Rated}, {movieInfo.Runtime}
              </Text>
            </View>

            <View>
              <Text style={styles.plot}>{movieInfo.Plot}</Text>
            </View>

            <View style={styles.ratings}>
              {movieInfo.Ratings.map((rating) => {
                let result, outOf;
                if (rating.Value.includes('/')) {
                  result = rating.Value.split('/')[0];
                  outOf = rating.Value.split('/')[1];
                } else {
                  result = rating.Value.split('%')[0];
                  outOf = 100;
                }
                if (outOf == 100) result = parseInt(result);
                if (outOf == 10) result = result * 10;
                return (
                  <View key={Math.floor(Math.random() * Math.floor(99999))}>
                    <Text>
                      {rating.Source} ({rating.Value})
                    </Text>
                    <View
                      style={{
                        backgroundColor: 'purple',
                        width: result + '%',
                        height: 20,
                        paddingTop: 2,
                        paddingBottom: 2,
                      }}
                    ></View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  ratings: {
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
  },
  plot: {
    fontStyle: 'italic',
    paddingTop: 5,
    paddingBottom: 5,
  },
  filmRating: {
    paddingTop: 7,
    paddingBottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingLeft: 1,
    paddingRight: 5,
  },
  infoContainer: {
    padding: 15,
    width: '100%',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  giantContainer: {
    flex: 1,
  },
  conditionalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 350,
    padding: 0,
    margin: 0,
    paddingTop: 10,
    marginTop: 10,
  },
  image: {
    height: 500,
    width: '100%',
  },
});
