import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// import { storage } from "../../config/firebase";
import * as actions from "../../../store/action";
import firebaseservice from "../../../services/firebaseService";

const UploadFirebaseAndPreviewButton = (props) => {
  const {
    firebaseUploadStatus,
    firebaseUrlList,
    setSnackbarState,
    setFirebaseImagesUrlList,
    setFirebaseUploadStatus,
    allImagesPreviewedStatus,
    convertedImagesDataUrlList,
  } = props;

  const blobFromURL = async (url) => {
    const blob = await fetch(url).then((r) => r.blob());
    return blob;
  };

  const isAllImagesUrlNotNull = () => {
    return !firebaseUrlList.some((url) => url.source === null);
  };

  const handleFireBaseUpload = async (e) => {
    convertedImagesDataUrlList.forEach(async (file) => {
      const src = await blobFromURL(file.url);
      await firebaseservice
        .uploadFile(file.name, src)
        .then((res) => {
          if (res.success) {
            console.log(res);
            setFirebaseImagesUrlList([
              ...firebaseUrlList,
              {
                source: res.url,
              },
            ]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });

    setSnackbarState({
      state: true,
      message: "All files uploaded",
      mode: "success",
    });
    setFirebaseUploadStatus(true);
  };

  const renderUploadFirebaseAndPreviewButton = () => {
    if (!firebaseUploadStatus) {
      return (
        <button
          onClick={handleFireBaseUpload}
          disabled={!allImagesPreviewedStatus}
          className="btn btn-primary"
        >
          Upload to Server
        </button>
      );
    } else {
      return (
        <Link to="/list">
          <button className="btn btn-primary">See Preview</button>
        </Link>
      );
    }
  };

  return <Fragment>{renderUploadFirebaseAndPreviewButton()}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    src: state.imageSource,
    validImageStatus: state.validImageStatus,
    firebaseUploadStatus: state.firebaseUploadStatus,
    firebaseUrlList: state.firebaseUrlList,
    allImagesPreviewedStatus: state.allImagesPreviewedStatus,
    convertedImagesDataUrlList: state.convertedImagesDataUrlList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSnackbarState: (snackbarObj) =>
      dispatch(actions.setSnackbarState(snackbarObj)),
    setFirebaseImagesUrlList: (value) =>
      dispatch(actions.addToFirebaseUrlList(value)),
    setFirebaseUploadStatus: (value) =>
      dispatch(actions.setFirebaseUploadStatus(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(UploadFirebaseAndPreviewButton));

UploadFirebaseAndPreviewButton.propTypes = {
  firebaseUploadStatus: PropTypes.bool,
  firebaseUrlList: PropTypes.array,
  setSnackbarState: PropTypes.func,
  setFirebaseImagesUrlList: PropTypes.func,
  setFirebaseUploadStatus: PropTypes.func,
  allImagesPreviewedStatus: PropTypes.bool,
  convertedImagesDataUrlList: PropTypes.array,
  resetSnackbarState: PropTypes.func,
};
