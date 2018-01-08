import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, StyleSheet } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';

import { lightGray, indigo } from '../util/colors';
import { getDecks } from '../util/storage';
import { receiveDecks } from '../actions';

class Decks extends Component {
  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    const { onReceiveDecks } = this.props;
    getDecks().then(decks => onReceiveDecks(decks));
  };

  render() {
    const { decks, navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.listWrapper}>
          <List>
            {decks
              .sort((a, b) => {
                return a[0] > b[0];
              })
              .map((deck, i) => (
                <ListItem
                  key={i}
                  title={deck[1].title}
                  subtitle={`${deck[1].questions.length} cards`}
                  rightIcon={{name: 'chevron-right'}}
                  onPress={() => navigation.navigate('Deck', {
                    title: deck[0],
                    refreshRoot: this.initialize,
                  })}
                />
              ))
            }
          </List>
        </View>
        <Button
          backgroundColor={indigo}
          onPress={() => navigation.navigate('NewDeck', {
            refreshRoot: this.initialize,
          })} title='Add New Quiz'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
  },
  listWrapper: {
    marginBottom: 20,
  },
});

const mapStateToProps = state => {
  const { decks } = state;

  return { decks };
};

const mapDispatchToProps = dispatch => {
  return {
    onReceiveDecks: decks => dispatch(receiveDecks(decks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Decks);