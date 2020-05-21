import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { storage } from "../../firebase/firebase";
import * as actions from "../../store/action";

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

  const handleFireBaseUpload = (e) => {
    const isAllImagesPreviewed = isAllImagesUrlNotNull();
    if (isAllImagesPreviewed) {
      e.preventDefault();
      const promises = [];
      convertedImagesDataUrlList.forEach(async (file) => {
        const src = await blobFromURL(file.url);
        const uploadTask = storage.ref(`/images/${file.name}`).put(src);
        promises.push(uploadTask);
        //initiates the firebase side uploading
        uploadTask.on(
          "state_changed",
          (snapShot) => {
            //takes a snap shot of the process as it is happening
          },
          (err) => {
            //catches the errors
            console.log(err);
          },
          () => {
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            storage
              .ref("images")
              .child(file.name)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                const firebaseImagesUrlListArray = [
                  ...firebaseUrlList,
                  {
                    source: fireBaseUrl,
                  },
                ];

                // setFirebaseUploadedList(firebaseImagesUrlListArray);
                setFirebaseImagesUrlList(firebaseImagesUrlListArray);
              });
          }
        );
      });

      Promise.all(promises)
        .then(() => {
          setSnackbarState({
            state: true,
            message: "All files uploaded",
            mode: "success",
          });
          setFirebaseUploadStatus(true);
        })
        .catch((err) => console.log(err.code));
    } else {
      setSnackbarState({
        state: true,
        message: "Preview all images",
        mode: "info",
      });
    }
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
  firebaseUrlList : PropTypes.array ,
  setSnackbarState: PropTypes.func,
  setFirebaseImagesUrlList: PropTypes.func,
  setFirebaseUploadStatus: PropTypes.func,
  allImagesPreviewedStatus: PropTypes.bool,
  convertedImagesDataUrlList: PropTypes.array,
  resetSnackbarState: PropTypes.func,
};
