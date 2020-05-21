import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Carousel, { Modal, ModalGateway } from "react-images";

import * as actions from "../../store/action";
import { Link } from "react-router-dom";

const FirebaseImagesPreview = (props) => {
  const [modalState, setModalState] = useState(false);
  const { firebaseUrlList, resetState } = props;

  console.log(props)

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const handleGetBackToImageUpload = () => {
    resetState();
  };

  const isListEmpty = firebaseUrlList.length !== 4;

  if (isListEmpty) {
    handleGetBackToImageUpload();
  }

  return (
    <div>
      <Link to="/">
        <button
          className="btn btn-primary"
          onClick={handleGetBackToImageUpload}
        >
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
  resetConvertedImagesDataUrlList: PropTypes.func,
  setAllImagesPreviewedStatus: PropTypes.func,
  resetSnackbarState: PropTypes.func,
  setValidImageStatus: PropTypes.func,
};
