import { AsyncStorage } from 'react-native';

export const getDecks = async () => {
  let keys = await AsyncStorage.getAllKeys();

  if (keys.length === 0) {
    keys = await AsyncStorage.multiSet([
      [
        'react',
        JSON.stringify({
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event'
            },
          ],
        }),
      ],
      [
        'javascript',
        JSON.stringify({
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            },
          ],
        }),
      ],
    ]);
  }

  return AsyncStorage.multiGet(keys);
};

export const getDeck = key => {
  return AsyncStorage.getItem(key);
};

export const saveDeckTitle = title => {
  const key = title.replace(/\s/g, '').toLowerCase();
  return AsyncStorage.setItem(key, JSON.stringify({
    title,
    questions: [],
  }));
};

export const addCardToDeck = (key, card) => {
  return getDeck(key).then(deck => {
    const modifiedDeck = JSON.parse(deck);
    modifiedDeck.questions.push(card)

    return AsyncStorage.setItem(key, JSON.stringify(modifiedDeck));
  });
};