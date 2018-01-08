import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo';

import reducer from './reducers';
import Decks from './components/Decks';
import Deck from './components/Deck';
import NewDeck from './components/NewDeck';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';
import { indigo } from './util/colors';
import { setLocalNotification } from './util/notifications';

const defaultHeaderOptions = {
  headerTintColor: '#FFFFFF',
  headerStyle: {
    backgroundColor: indigo,
  },
};

const MainNavigator = StackNavigator({
  Home: {
    screen: Decks,
    navigationOptions: {
      title: 'Home',
      ...defaultHeaderOptions,
    },
  },
  Deck: {
    screen: Deck,
    path: 'deck/:title',
    navigationOptions: ({navigation}) => ({
      title: `Deck`,
      ...defaultHeaderOptions,
    }),
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'New Deck',
      ...defaultHeaderOptions,
    },
  },
  NewQuestion: {
    screen: NewQuestion,
    path: 'new-question/:title',
    navigationOptions: {
      title: 'Add Card',
      ...defaultHeaderOptions,
    },
  },
  Quiz: {
    screen: Quiz,
    path: 'quiz/:title',
    navigationOptions: ({navigation}) => ({
      title: `Quiz`,
      ...defaultHeaderOptions,
    }),
  },
});

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <View style={{ backgroundColor: indigo, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor='#3F51B5' barStyle='light-content'/>
          </View>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}
