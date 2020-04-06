import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const TimeForm = ({ updateTime, label, values }) => {
  const [mins, setMins] = useState(values[0]);
  const [secs, setSecs] = useState(values[1]);

  const onChangeMin = value => {
    setMins(value);
  };
  const onChangeSec = value => {
    setSecs(value);
  };

  useEffect(() => {
    updateTime(mins, secs);
  }, [secs, mins]);

  return (
    <View style={styles.rowContainer}>
      <View style={styles.leftTitleContainer}>
        <Text style={styles.leftTitleText}>{label}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.formLabel}>Mins</Text>
        <TextInput
          style={styles.textInput}
          value={mins.toString()}
          onChangeText={val => {
            onChangeMin(val);
          }}
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Secs</Text>
        <TextInput
          style={styles.textInput}
          value={secs.toString()}
          onChangeText={val => {
            onChangeSec(val);
          }}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default TimeForm;

const styles = StyleSheet.create({
  rowContainer: {
    marginTop: 6,
    paddingTop: 6,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    width: 45,
    marginLeft: -30,
    paddingLeft: 10
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 7,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  leftTitleContainer: {
    flex: 4
  },
  leftTitleText: {
    fontWeight: 'bold',
    fontSize: 15
  },
  formLabel: {
    marginRight: 0
  }
});
