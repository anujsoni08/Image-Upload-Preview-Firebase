import * as actionTypes from "./actionTypes";
import { updateObject } from "./utility";

const initialState = {
  firebaseUrlList: [],
  snackbar: {
    state: false,
    mode: "",
    message: "",
  },
  imageSource: null,
  validImageStatus: false,
  firebaseUploadStatus: false,
  allImagesPreviewedStatus: false,
  convertedImagesBlobUrlList: Array(4).fill({ url: null, name: "" }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FIREBASE_URL_LIST:
      return updateObject(state, {
        firebaseUrlList: state.firebaseUrlList.concat(action.value),
      });
    case actionTypes.RESET_FIREBASE_URL_LIST:
      return updateObject(state, { firebaseUrlList: [] });
    case actionTypes.SET_IMAGE_SOURCE:
      return updateObject(state, { imageSource: action.value });
    case actionTypes.SET_SNACKBAR_STATE:
      return updateObject(state, { snackbar: action.value });
    case actionTypes.RESET_SNACKBAR_STATE:
      return updateObject(state, {
        snackbar: {
          ...state.snackbar,
          state: false,
        },
      });
    case actionTypes.VALID_IMAGE_STATUS:
      return updateObject(state, {
        validImageStatus: action.value,
      });
    case actionTypes.FIREBASE_UPLOAD_STATUS:
      return updateObject(state, {
        firebaseUploadStatus: action.value,
      });
    case actionTypes.ALL_IMAGES_PREVIEWED_STATUS:
      return updateObject(state, {
        allImagesPreviewedStatus: action.value,
      });
    case actionTypes.UPDATE_CONVERTED_IMAGES_DATA_URL_LIST:
      const newConvertedImagesBlobUrlList = [
        ...state.convertedImagesBlobUrlList,
      ];
      newConvertedImagesBlobUrlList[action.index] = action.value;
      return updateObject({
        ...state,
        convertedImagesBlobUrlList: newConvertedImagesBlobUrlList,
      });
    case actionTypes.RESET_CONVERTED_IMAGES_DATA_URL_LIST:
      return updateObject(state, {
        convertedImagesBlobUrlList: initialState.convertedImagesBlobUrlList,
      });
    case actionTypes.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
