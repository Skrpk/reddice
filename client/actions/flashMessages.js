import constants from '../constants/flashMessages';

const addFlashMessage = message => ({
  type: constants.ADD_FLASH_MESSAGE,
  payload: message,
});

const deleteFlashMessage = id => ({
  type: constants.DELETE_FLASH_MESSAGE,
  payload: id,
})

export default {
  addFlashMessage,
  deleteFlashMessage,
};
