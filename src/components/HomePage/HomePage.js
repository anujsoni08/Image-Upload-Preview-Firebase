import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ImageSelector = React.lazy(() =>
  import("../ImageSelector/ImageSelector")
);

const ImagesCroppedPreviewButtons = React.lazy(() =>
  import("../ImagesCroppedPreviewButtons/ImagesCroppedPreviewButtons")
);

const UploadFirebaseAndPreviewButton = React.lazy(() =>
  import("../UploadFirebaseAndPreviewButton/UploadFirebaseAndPreviewButton")
);

const SimpleSnackbar = React.lazy(() => import("../../common/Snackbar"));

const HomePage = (props) => {
  const { isValidImage } = props;
  console.log(props)

  const renderImageSelect = () => {
    return <ImageSelector />;
  };

  const renderImageCroppedPreviewButtons = () => {
    if (!isValidImage) {
      return null;
    }
    return <ImagesCroppedPreviewButtons />;
  };

  const renderUploadFirebaseAndPreviewButton = () => {
    if (!isValidImage) {
      return null;
    }
    return <UploadFirebaseAndPreviewButton />;
  };

  const renderSnackbar = () => {
    return <SimpleSnackbar />;
  };

  return (
    <div className="jumbotron m-3">
      {renderImageSelect()}
      {renderImageCroppedPreviewButtons()}
      {renderUploadFirebaseAndPreviewButton()}
      {renderSnackbar()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isValidImage: state.validImageStatus,
  };
};

export default connect(mapStateToProps)(React.memo(HomePage));

HomePage.propTypes = {
  isValidImage: PropTypes.bool,
};
