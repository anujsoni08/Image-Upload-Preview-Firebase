import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import * as actions from "../../../../store/action";

const ImageRemovePreview = (props) => {
  const {
    resetFileRef,
    src,
    setSnackbarState,
    setValidImageStatus,
    resetState,
  } = props;

  const resetImage = () => {
    resetFileRef();
    resetState();
  };

  const onImgLoad = ({ target: image }) => {
    if (image.naturalWidth !== 1024 || image.naturalHeight !== 1024) {
      setSnackbarState({
        state: true,
        message: "Image is not of 1024 * 1024 resolution.",
        mode: "error",
      });
      setValidImageStatus(false);
    } else {
      setValidImageStatus(true);
    }
  };

  const renderImageRemovePreview = () => {
    return (
      <Fragment>
        <div className="d-table mx-auto my-3">
          <div className="d-table mx-auto my-3">
            <button
              onClick={resetImage}
              type="button"
              className="btn btn-outline-primary"
            >
              Remove File
            </button>
          </div>
          <div>
            <img src={src} alt={"uploaded"} onLoad={onImgLoad} />
          </div>
        </div>
      </Fragment>
    );
  };

  return <Fragment>{src ? renderImageRemovePreview() : null}</Fragment>;
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
)(React.memo(ImageRemovePreview));

ImageRemovePreview.propTypes = {
  resetFileRef: PropTypes.func,
  src: PropTypes.any,
  setImageSource: PropTypes.func,
  setSnackbarState: PropTypes.func,
  setValidImageStatus: PropTypes.func,
  resetState: PropTypes.func,
};
