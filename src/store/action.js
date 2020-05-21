import * as actionTypes from "./actionTypes";

export const addToFirebaseUrlList = (list) => {
  return {
    type: actionTypes.UPDATE_FIREBASE_URL_LIST,
    value: list,
  };
};

export const resetFirebaseUrlList = () => {
  return {
    type: actionTypes.RESET_FIREBASE_URL_LIST,
  };
};

export const setImageSource = (imageSource) => {
  return {
    type: actionTypes.SET_IMAGE_SOURCE,
    value: imageSource,
  };
};

export const setSnackbarState = (state) => {
  return {
    type: actionTypes.SET_SNACKBAR_STATE,
    value: state,
  };
};

export const resetSnackbarState = () => {
  return {
    type: actionTypes.RESET_SNACKBAR_STATE,
  };
};

export const setValidImageStatus = (value) => {
  return {
    type: actionTypes.VALID_IMAGE_STATUS,
    value,
  };
};

export const setFirebaseUploadStatus = (value) => {
  return {
    type: actionTypes.FIREBASE_UPLOAD_STATUS,
    value,
  };
};

export const setAllImagesPreviewedStatus = (value) => {
  return {
    type: actionTypes.ALL_IMAGES_PREVIEWED_STATUS,
    value,
  };
};

export const updateConvertedImagesDataUrlList = (index, value) => {
  return {
    type: actionTypes.UPDATE_CONVERTED_IMAGES_DATA_URL_LIST,
    index,
    value,
  };
};

export const resetConvertedImagesDataUrlList = () => {
  return {
    type: actionTypes.RESET_CONVERTED_IMAGES_DATA_URL_LIST,
  };
};

export const resetState = () => {
  return {
    type: actionTypes.RESET_STATE,
  };
};
