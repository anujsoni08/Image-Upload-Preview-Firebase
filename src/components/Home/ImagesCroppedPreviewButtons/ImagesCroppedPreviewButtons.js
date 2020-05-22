import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../../store/action";

import { IMAGE_SIZE_CONST } from "../../../utils/constant";
import ImageCropper from "../ImageCropper/ImageCropper";

const ImagesCroppedPreviewButton = (props) => {
  const [modalState, setModalState] = useState(Array(4).fill(false));

  const {
    setAllImagesPreviewedStatus,
    updateConvertedImagesBlobUrlList,
    convertedImagesBlobUrlList,
  } = props;

  const croppedUrlHandler = (index, url, imageName) => {
    const urlObj = {
      url,
      name: imageName.split(".").join(`_${index}.`),
    };

    updateConvertedImagesBlobUrlList(index, urlObj);

    const allImagesPreviewedStatus = !convertedImagesBlobUrlList.some(
      (image) => image.url === null
    );
    setAllImagesPreviewedStatus(allImagesPreviewedStatus);
  };

  const handlePreview = (index) => {
    const modalStateArray = [...modalState];
    modalStateArray[index] = true;
    setModalState(modalStateArray);
  };

  const handleModalClose = (index) => {
    const modalStateArray = [...modalState];
    modalStateArray[index] = false;
    setModalState(modalStateArray);
  };

  return (
    <Fragment>
      <div className="d-flex my-3 justify-content-around">
        {Array.apply(null, Array(4)).map((_, index) => (
          <Fragment key={index}>
            <button
              onClick={() => handlePreview(index)}
              type="button"
              className="btn btn-primary"
            >
              See Preview Image {index + 1}
            </button>
            <ImageCropper
              modalState={modalState[index]}
              modalCloseHandler={() => handleModalClose(index)}
              imageIndex={index + 1}
              imageName={`image_${index}`}
              dimensions={IMAGE_SIZE_CONST[index]}
              croppedUrlHandler={(url) =>
                croppedUrlHandler(index, url, `image_${index}`)
              }
            />
          </Fragment>
        ))}
      </div>
      <p className="text-center font-weight-bold">
        Note : Please preview all the images before upload.
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    src: state.imageSource,
    validImageStatus: state.validImageStatus,
    firebaseUploadStatus: state.firebaseUploadStatus,
    firebaseUrlList: state.firebaseUrlList,
    allImagesPreviewedStatus: state.allImagesPreviewedStatus,
    convertedImagesBlobUrlList: state.convertedImagesBlobUrlList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAllImagesPreviewedStatus: (value) =>
      dispatch(actions.setAllImagesPreviewedStatus(value)),
    updateConvertedImagesBlobUrlList: (index, value) =>
      dispatch(actions.updateConvertedImagesBlobUrlList(index, value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ImagesCroppedPreviewButton));

ImagesCroppedPreviewButton.propTypes = {
  setAllImagesPreviewedStatus: PropTypes.func,
  updateConvertedImagesBlobUrlList: PropTypes.func,
  convertedImagesBlobUrlList: PropTypes.array,
};
