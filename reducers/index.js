import { combineReducers } from 'redux';
import {
  RECEIVE_DECKS,
  RECEIVE_DECK,
  START_QUIZ, INCREASE_SCORE, NEXT_QUESTION,
} from '../actions/types';

function decks(state = [], action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks.map(deck => ([deck[0], JSON.parse(deck[1])]));
    default:
      return state;
  }
}

function openDeck(state = {
  title: '',
  questions: [],
}, action) {
  switch(action.type) {
    case RECEIVE_DECK:
      return JSON.parse(action.deck);
    default:
      return state;
  }
}

function quiz(state = {
  currentQuestionIdx: 0,
  title: '',
  questions: [],
  score: 0,
}, action) {
  switch (action.type) {
    case START_QUIZ:
      return {
        currentQuestionIdx: 0,
        score: 0,
        ...action.quiz,
      };
    case NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIdx: state.currentQuestionIdx + 1,
      };
    case INCREASE_SCORE:
      return {
        ...state,
        score: state.score + 1,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  decks,
  openDeck,
  quiz,
});

export default rootReducer;