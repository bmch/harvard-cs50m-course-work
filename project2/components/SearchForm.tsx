import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const SearchForm = ({ handleTextChange, searchTerm }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleTextChange(text)}
        value={searchTerm}
        placeholder="Search ..."
      />
    </View>
  );
};

export default SearchForm;

const styles = StyleSheet.create({
  input: {
    width: '96%',
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 4,
    paddingLeft: 4,
  },
});
