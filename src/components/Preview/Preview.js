import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Carousel, { Modal, ModalGateway } from "react-images";

import * as actions from "../../store/action";
import { Link } from "react-router-dom";

const FirebaseImagesPreview = (props) => {
  const [modalState, setModalState] = useState(false);
  const { firebaseUrlList, resetState } = props;

  useEffect(() => {
    const isListEmpty = firebaseUrlList.length !== 4;
    if (isListEmpty) {
      props.history.push("/");
    }
    return () => {
      handleResetState();
    };
  }, []);

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const handleResetState = () => {
    resetState();
  };

  const renderPreview = () => {
    return (
      <div>
        <Link to="/">
          <button className="btn btn-primary" onClick={handleResetState}>
            Go back
          </button>
        </Link>
        <button onClick={toggleModal} className="btn btn-outline-primary">
          Click to see preview
        </button>
        <ModalGateway>
          {modalState ? (
            <Modal onClose={toggleModal}>
              <Carousel views={props.firebaseUrlList} />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  };

  return <Fragment>{renderPreview()}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    firebaseUrlList: state.firebaseUrlList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetState: () => dispatch(actions.resetState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirebaseImagesPreview);

FirebaseImagesPreview.propTypes = {
  firebaseUrlList: PropTypes.array,
  resetFirebaseUrlList: PropTypes.func,
  setImageSource: PropTypes.func,
  setFirebaseUploadStatus: PropTypes.func,
  resetConvertedImagesBlobUrlList: PropTypes.func,
  setAllImagesPreviewedStatus: PropTypes.func,
  resetSnackbarState: PropTypes.func,
  setValidImageStatus: PropTypes.func,
};
