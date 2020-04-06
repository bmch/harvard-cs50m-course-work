import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import TimerMoving from './components/TimerMoving';
import TimeForm from './components/TimeForm';
import { vibrate } from './utils';

export default function App() {
  // work time setup
  const initialWorkTime = [25, 0];
  const [workTimer, setWorkTimer] = useState(
    new Date(initialWorkTime[1] * 1000 + initialWorkTime[0] * 60 * 1000)
  );
  const workTimerRef = useRef(workTimer);
  const [workTime, setWorkTime] = useState([initialWorkTime[0]]);
  workTimerRef.current = workTimer;

  // break time setup
  const initialBreakTime = [5, 0];
  const [breakTimer, setBreakTimer] = useState(
    new Date(initialBreakTime[1] * 1000 + initialBreakTime[0] * 60 * 1000)
  );
  const breakTimerRef = useRef(breakTimer);
  const [breakTime, setBreakTime] = useState([initialBreakTime[0]]);
  breakTimerRef.current = breakTimer;

  // timer status
  const [timerRunning, setTimerRunning] = useState(false);
  const [onWork, setOnWork] = useState(true);
  const onWorkRef = useRef(onWork);
  onWorkRef.current = onWork;

  // timer interval id
  const intervalID = useRef(false);

  const updateWorkTime = (min, sec) => {
    setWorkTime([min, sec]);
  };
  const updateBreakTime = (min, sec) => {
    setBreakTime([min, sec]);
  };

  useEffect(() => {
    stopAndUpdateWorkTimer();
  }, [workTime]);

  useEffect(() => {
    stopAndUpdateBreakTimer();
  }, [breakTime]);

  const stopAndUpdateWorkTimer = () => {
    if (onWork) {
      clearInterval(intervalID.current);
      setTimerRunning(false);
    }
    setWorkTimer(() => new Date(workTime[1] * 1000 + workTime[0] * 60 * 1000));
  };

  const stopAndUpdateBreakTimer = () => {
    if (!onWork) {
      clearInterval(intervalID.current);
      setTimerRunning(false);
    }
    setBreakTimer(
      () => new Date(breakTime[1] * 1000 + breakTime[0] * 60 * 1000)
    );
  };

  const startStopTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      intervalID.current = setInterval(() => {
        if (workTimerRef.current.getTime() === 0) {
          vibrate();
          setOnWork(false);
          setWorkTimer(
            () => new Date(workTime[1] * 1000 + workTime[0] * 60 * 1000)
          );
        }
        if (breakTimerRef.current.getTime() === 0) {
          vibrate();
          setOnWork(true);
          setBreakTimer(
            () => new Date(breakTime[1] * 1000 + breakTime[0] * 60 * 1000)
          );
        }
        if (onWorkRef.current) {
          setWorkTimer((prevState) => new Date(prevState.getTime() - 1000));
        } else {
          setBreakTimer((prevState) => new Date(prevState.getTime() - 1000));
        }
      }, 1000);
    } else {
      clearInterval(intervalID.current);
      setTimerRunning(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{onWork ? 'Work Timer' : 'Break Timer'}</Text>
      <TimerMoving timer={onWork ? workTimer : breakTimer} />
      <View style={styles.buttonContainer}>
        <Button
          title={timerRunning ? 'PAUSE' : 'START'}
          onPress={() => startStopTimer()}
        />
        <Button
          title="RESET"
          onPress={() => {
            onWork ? stopAndUpdateWorkTimer() : stopAndUpdateBreakTimer();
          }}
        />
      </View>

      <TimeForm
        label="Work Time"
        updateTime={updateWorkTime}
        values={initialWorkTime}
      />
      <TimeForm
        label="Break Time"
        updateTime={updateBreakTime}
        values={initialBreakTime}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
