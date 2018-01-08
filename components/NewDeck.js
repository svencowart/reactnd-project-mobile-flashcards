import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

import { lightGray, indigo } from '../util/colors';
import { saveDeckTitle } from '../util/storage';

class NewDeck extends Component {
  state = {
    title: '',
  };

  handleTitleChange = (title) => {
    this.setState({ title });
  };

  handleFormSubmit = () => {
    const { navigation } = this.props;
    const { refreshRoot } = navigation.state.params;
    const { title } = this.state;

    saveDeckTitle(title)
      .then(() => {
        refreshRoot();
        navigation.navigate('Deck', {
          title: title.replace(/\s/g, '').toLowerCase(),
          refreshRoot,
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Deck Title</FormLabel>
        <FormInput inputStyle={styles.input} onChangeText={(val) => this.handleTitleChange(val)}/>

        <Button
          backgroundColor={indigo}
          style={styles.button}
          title='Submit'
          onPress={this.handleFormSubmit}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
  },
  input: {
    width: '100%',
  },
  button: {
    marginTop: 20,
  },
});

export default NewDeck;