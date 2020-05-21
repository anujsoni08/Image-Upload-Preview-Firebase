import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ImageRemovePreview = (props) => {
  const { resetFile, src, onImgLoad } = props;

  const renderImageRemovePreview = () => {
    return (
      <Fragment>
        <div className="d-table mx-auto my-3">
          <div className="d-table mx-auto my-3">
            <button
              onClick={resetFile}
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

  return <Fragment>{renderImageRemovePreview()}</Fragment>;
};

export default React.memo(ImageRemovePreview);

ImageRemovePreview.propTypes = {
  resetFile: PropTypes.func,
  src: PropTypes.any,
  onImgLoad: PropTypes.func,
};
