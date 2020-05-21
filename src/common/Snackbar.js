import React from "react";
import PropTypes, {  exact } from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import styled from "@material-ui/core/styles/styled";

import { connect } from "react-redux";

import * as actions from "../store/action";

const Message = styled("span")({
  display: "flex",
  alignItems: "center",
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SimpleSnackbar = (props) => {
  const { resetSnackbarState, snackbarObj } = props;
  const { state, mode, message } = snackbarObj;

  const handleClose = () => {
    resetSnackbarState();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(state)}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert severity={mode} onClose={handleClose}>
        <Message>{message}</Message>
      </Alert>
    </Snackbar>
  );
};

const mapStateToProps = (state) => {
  return {
    snackbarObj: state.snackbar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetSnackbarState: () => dispatch(actions.resetSnackbarState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(SimpleSnackbar));

SimpleSnackbar.propTypes = {
  snackbarObj: exact({
    state: PropTypes.bool,
    mode: PropTypes.string,
    message: PropTypes.string,
  }),
  resetSnackbarState: PropTypes.func,
};
