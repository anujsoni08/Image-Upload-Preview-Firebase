import React, { useState, Fragment, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Carousel, { Modal, ModalGateway } from "react-images";

import * as actions from "../../store/action";

const FirebaseImagesPreview = (props) => {
  const [modalState, setModalState] = useState(false);
  const { firebaseUrlList, resetState } = props;

  const handleResetState = useCallback(() => {
    resetState();
  }, [resetState]);

  useEffect(() => {
    const isListEmpty = firebaseUrlList.length !== 4;
    if (isListEmpty) {
      props.history.push("/");
    }
    return () => {
      handleResetState();
    };
  }, [firebaseUrlList.length, handleResetState, props.history]);

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const renderPreview = () => {
    return (
      <div>
        <Link to="/">
          <button className="btn btn-primary">Go back</button>
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
  resetState: PropTypes.func,
  firebaseUrlList: PropTypes.array,
};
