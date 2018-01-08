import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';

import { white, lightGray, darkGray, indigo, green, red } from '../util/colors';
import { getDeck } from '../util/storage';
import { startQuiz, increaseScore, nextQuestion } from '../actions';

class Quiz extends Component {
  state = {
    mode: 'question',
  };

  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    const { navigation, onStartQuiz } = this.props;

    getDeck(navigation.state.params.title).then(deck => onStartQuiz(JSON.parse(deck)));
  };

  handleModeChange = () => {
    const { mode } = this.state;

    if (mode === 'question') {
      this.setState({ mode: 'answer' });
    } else {
      this.setState({ mode: 'question' });
    }
  };

  handleCorrect = () => {
    const { onIncreaseScore, onNextScore } = this.props;

    onIncreaseScore();
    onNextScore();
  };

  render() {
    const { mode } = this.state;
    const { navigation, quiz, onNextScore } = this.props;

    return (
      <View style={styles.container}>
        {quiz.questions.length > 0 && quiz.currentQuestionIdx < quiz.questions.length &&
          <View>
            <Text h5 style={styles.h5}>{`${quiz.currentQuestionIdx + 1} / ${quiz.questions.length}`}</Text>
            <View>
              <View style={styles.cardWrapper}>
                <Card
                  title={`${mode.charAt(0).toUpperCase() + mode.slice(1)}:`}>
                    <Text style={{marginBottom: 10}}>
                      {quiz.questions[quiz.currentQuestionIdx][mode]}
                    </Text>
                    <Button
                      backgroundColor={white}
                      color={indigo}
                      title={`${mode === 'question' ? 'Show' : 'Hide'} Answer`}
                      onPress={this.handleModeChange}/>
                </Card>
              </View>
              <View>
                <Button
                  backgroundColor={green}
                  style={styles.button}
                  title='Correct'
                  onPress={this.handleCorrect}/>
                <Button
                  backgroundColor={red}
                  style={styles.button}
                  title='Incorrect'
                  onPress={() => onNextScore()}/>
              </View>
            </View>
          </View>
        }
        {quiz.currentQuestionIdx === quiz.questions.length &&
          <View style={styles.resultsWrapper}>
            <Text h4 style={styles.h4}>You answered {quiz.score} out of {quiz.questions.length} questions correct.</Text>
            <Button
              backgroundColor={indigo}
              style={styles.button}
              title='Restart Deck'
              onPress={() => this.initialize()}/>
            <Button
              backgroundColor={darkGray}
              style={styles.button}
              title='Back to Deck'
              onPress={() => navigation.goBack()}/>
          </View>
        }
        {quiz.questions.length === 0 &&
          <Text h5 style={styles.h5}>You need to add cards to this deck before you can play it.</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: lightGray,
  },
  resultsWrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  h4: {
    margin: 10,
    textAlign: 'center',
  },
  h5: {
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  cardWrapper: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const mapStateToProps = state => {
  const { quiz } = state;

  return {
    quiz
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartQuiz: quiz => dispatch(startQuiz(quiz)),
    onIncreaseScore: () => dispatch(increaseScore()),
    onNextScore: () => dispatch(nextQuestion()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);