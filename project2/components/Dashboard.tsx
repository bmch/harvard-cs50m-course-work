import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import { fetchService } from '../services/ApiService';
import SearchForm from './SearchForm';
import Movie from './Movie';
import { Props } from '../App';

interface movieResult {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

const Dashboard = ({ navigation }: Props) => {
  const initialState = {
    data: [],
    page: 0,
    loading: false,
    loadingMore: false,
    error: null,
  };
  const [results, setResults] = useState(initialState);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTextChange = (text: string) => {
    setSearchTerm(text);
    text.length >= 3 && fetchMovies(text);
  };

  const fetchMovies = (term: string) => {
    fetchService(term).then((res) => {
      setResults({
        data: res.Search,
        page: 1,
        loading: false,
        loadingMore: false,
        error: null,
      });
    });
  };

  const handleLoadMore = () => {
    const { page } = results;
    if (!page) return fetchMovies(searchTerm);
    fetchService(searchTerm, page + 1).then((res) => {
      if (!res.Search) {
        return true;
      }
      const newData = res.Search;
      setResults((prevState) => {
        return {
          data: prevState.data.concat(newData),
          page: prevState.page + 1,
          loading: false,
          loadingMore: false,
          error: null,
        };
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchForm handleTextChange={handleTextChange} searchTerm={searchTerm} />
      {!results.data?.length && <Text>No results</Text>}

      <FlatList
        data={results.data}
        renderItem={({ item }: { item: movieResult }) => (
          <Movie movie={item} navigation={navigation} />
        )}
        keyExtractor={(item) =>
          Math.floor(Math.random() * Math.floor(99999999)).toString()
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        initialNumToRender={10}
      />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
