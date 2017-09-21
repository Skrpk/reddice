
import shortid from 'shortid';
import constants from '../constants/flashMessages';
import findIndex from 'lodash/findIndex';

export default (store = [], action = {}) => {
  switch(action.type) {
    case constants.ADD_FLASH_MESSAGE: {
      return [
        ...store,
        {
          id: shortid.generate(),
          type: action.payload.type,
          text: action.payload.text,
        }
      ];
    }
    case constants.DELETE_FLASH_MESSAGE: {
      const index = findIndex(store, { id: action.payload });

      if (index >= 0) {
        return [
          ...store.slice(0, index),
          ...store.slice(index + 1),
        ]
      }
      return store;
    }
    default: {
      return store;
    }
  }
}
