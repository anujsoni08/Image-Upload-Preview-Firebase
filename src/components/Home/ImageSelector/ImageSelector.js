import React, { useState, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../../store/action";

const ImageRemovePreview = React.lazy(() =>
  import("../ImageRemovePreview/ImageRemovePreview")
);

const ImageSelector = (props) => {
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });

  const {
    src,
    setImageSource,
    setSnackbarState,
    setValidImageStatus,
    resetState,
  } = props;

  let imageRef = useRef();

  const resetFile = () => {
    resetState();
    imageRef.current.value = "";
  };

  const onSelectFile = (e) => {
    const image = e.target.files[0];
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSource(reader.result);
      });
      reader.readAsDataURL(image);
    }
  };

  const onImgLoad = ({ target :image }) => {
    if (image.naturalWidth !== 1024 || image.naturalHeight !== 1024) {
      setSnackbarState({
        state: true,
        message: "Image is not of 1024 * 1024 resolution.",
        mode: "error",
      });
      setValidImageStatus(false);
    } else {
      setDimensions({
        height: image.naturalHeight,
        width: image.naturalWidth,
      });
      setValidImageStatus(true);
    }
  };

  const renderImageSelector = () => {
    return (
      <Fragment>
        <div className="d-flex">
          <label htmlFor="uploadedImage">Select File</label>
          <input
            type="file"
            id="uploadedImage"
            name="uploadedImage"
            onChange={(event) => onSelectFile(event)}
            ref={imageRef}
          />
        </div>
      </Fragment>
    );
  };

  const renderImageRemovePreview = () => {
    return (
      <ImageRemovePreview
        onImgLoad={onImgLoad}
        src={src}
        resetFile={resetFile}
      />
    );
  };

  return (
    <div>
      {renderImageSelector()}
      {src ? renderImageRemovePreview() : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    src: state.imageSource,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setImageSource: (src) => dispatch(actions.setImageSource(src)),
    setValidImageStatus: (isValid) =>
      dispatch(actions.setValidImageStatus(isValid)),
    setSnackbarState: (snackbarObj) =>
      dispatch(actions.setSnackbarState(snackbarObj)),
    resetState: () => dispatch(actions.resetState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ImageSelector));

ImageSelector.propTypes = {
  src: PropTypes.any,
  setImageSource: PropTypes.func,
  setSnackbarState: PropTypes.func,
  setValidImageStatus: PropTypes.func,
  resetState: PropTypes.func,
};
