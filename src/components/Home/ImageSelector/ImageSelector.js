import React, { useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../../store/action";

const ImageRemovePreview = React.lazy(() =>
  import("./ImageRemovePreview/ImageRemovePreview")
);

const ImageSelector = (props) => {
  const { src, setImageSource } = props;

  let imageRef = useRef();

  const resetFileRef = () => {
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

  const renderImageSelector = () => {
    return (
      <Fragment>
        <div className="d-flex">
          <label htmlFor="uploadedImage">Select File</label>
          <input
            type="file"
            accept="image/*"
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
    return <ImageRemovePreview src={src} resetFileRef={resetFileRef} />;
  };

  return (
    <div>
      {renderImageSelector()}
      {renderImageRemovePreview()}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ImageSelector));

ImageSelector.propTypes = {
  src: PropTypes.any,
  setImageSource: PropTypes.func,
};
