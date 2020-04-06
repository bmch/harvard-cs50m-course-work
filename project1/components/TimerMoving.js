import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimerMoving = ({ timer }) => {
  return (
    <View>
      <Text style={styles.timerText}>
        {timer.getMinutes()}:
        {timer
          .getSeconds()
          .toString()
          .padStart(2, '0')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerText: {
    fontSize: 90
  }
});

export default TimerMoving;
