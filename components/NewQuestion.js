import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

import { lightGray, indigo } from '../util/colors';
import { addCardToDeck } from '../util/storage';

class NewQuestion extends Component {
  state = {
    question: '',
    answer: '',
  };

  handleQuestionChange = (question) => {
    this.setState({ question });
  };

  handleAnswerChange = (answer) => {
    this.setState({ answer });
  };

  handleFormSubmit = () => {
    const { navigation } = this.props;
    const { refresh, refreshRoot } = navigation.state.params;
    const { question, answer } = this.state;

    addCardToDeck(navigation.state.params.title, { question, answer })
      .then(() => {
        refresh();
        refreshRoot();
        navigation.goBack();
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Question</FormLabel>
        <FormInput inputStyle={styles.input} onChangeText={(val) => this.handleQuestionChange(val)}/>

        <FormLabel>Answer</FormLabel>
        <FormInput inputStyle={styles.input} onChangeText={(val) => this.handleAnswerChange(val)}/>

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

export default NewQuestion;