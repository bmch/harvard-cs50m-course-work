import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dashboard from './components/Dashboard';
import { NavigationContainer, BaseRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MovieDetails from './components/MovieDetails';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

type RootStackParamList = {
  Dashboard: undefined;
  Details: { movieResult: movie; title: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export type DashboardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

export type Props = {
  navigation: DashboardNavigationProp;
};

export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="Details"
          component={MovieDetails}
          options={({ route }) => ({ title: route.params.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
