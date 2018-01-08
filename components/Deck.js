import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { darkGray, lightGray, indigo } from '../util/colors';
import { getDeck } from '../util/storage';
import { receiveDeck } from '../actions';

class Deck extends Component {
  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    const { onReceiveDeck, navigation } = this.props;
    getDeck(navigation.state.params.title).then(deck => onReceiveDeck(deck));
  };

  render() {
    const { openDeck, navigation } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Text h3 style={styles.h3}>{openDeck.title}</Text>
          <Text h4 style={styles.h4}>{`${openDeck.questions.length} cards`}</Text>
        </View>
        <View>
          <Button
            backgroundColor={darkGray}
            style={styles.button}
            title='Add Card'
            onPress={() => navigation.navigate('NewQuestion', {
              title: navigation.state.params.title,
              refresh: this.initialize,
              refreshRoot: navigation.state.params.refreshRoot,
            })}/>
          <Button
            backgroundColor={indigo}
            style={styles.button}
            title='Start Quiz'
            onPress={() => navigation.navigate('Quiz', { title: navigation.state.params.title })}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: lightGray,
  },
  h3: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  h4: {
    color: '#777777',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const mapStateToProps = state => {
  const { openDeck } = state;

  return { openDeck };
};

const mapDispatchToProps = dispatch => {
  return {
    onReceiveDeck: deck => dispatch(receiveDeck(deck)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);