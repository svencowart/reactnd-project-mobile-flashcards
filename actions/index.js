import {
  RECEIVE_DECKS,
  RECEIVE_DECK,
  START_QUIZ,
  INCREASE_SCORE,
  NEXT_QUESTION,
} from './types';


export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function receiveDeck(deck) {
  return {
    type: RECEIVE_DECK,
    deck,
  };
}

export function startQuiz(quiz) {
  return {
    type: START_QUIZ,
    quiz,
  };
}

export function increaseScore() {
  return {
    type: INCREASE_SCORE,
  };
}

export function nextQuestion() {
  return {
    type: NEXT_QUESTION
  };
}