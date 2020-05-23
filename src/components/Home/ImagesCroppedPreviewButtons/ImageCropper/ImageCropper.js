import React, { useState, useRef, useCallback } from "react";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import ReactCrop from "react-image-crop";
import { connect } from "react-redux";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = (props) => {
  const {
    src,
    modalCloseHandler,
    dimensions,
    croppedUrlHandler,
    imageIndex,
    imageName,
    modalState,
  } = props;
  const { height, width } = dimensions;
  const imageRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "px", width, height });
  const [previewUrl, setPreviewUrl] = useState();
  const [croppedImageDimensions, setCroppedImageDimensions] = useState({
    height: null,
    width: null,
  });

  const onImageLoaded = useCallback((img) => {
    imageRef.current = img;
  }, []);

  const getDimensions = ({ target: image }) => {
    setCroppedImageDimensions({
      height: image.naturalHeight,
      width: image.naturalWidth,
    });
  };

  const makeClientCrop = async (crop) => {
    if (imageRef.current && crop.width && crop.height) {
      createCropPreview(imageRef.current, crop, `${imageName}_${imageIndex}`);
    }
  };

  const handleCroppedImageSave = () => {
    makeClientCrop(crop);
    modalCloseHandler();
  };

  const handleModalClose = () => {
    handleCroppedImageSave();
  };

  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(previewUrl);
        setPreviewUrl(window.URL.createObjectURL(blob));
        croppedUrlHandler(window.URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  };

  return (
    <Dialog maxWidth={"lg"} onClose={handleModalClose} open={modalState}>
      <div className="modal-header">
        <h5 className="modal-title">Crop Image</h5>
        <button type="button" className="close" onClick={handleModalClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {previewUrl && (
          <p>
            Cropped Image height :{" "}
            <strong>{croppedImageDimensions.height}px</strong> width :
            <strong>{croppedImageDimensions.width}px</strong>
          </p>
        )}
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={onImageLoaded}
            onChange={(c) => setCrop(c)}
            onComplete={makeClientCrop}
          />
        )}
        {previewUrl && (
          <img
            alt="Crop"
            onLoad={getDimensions}
            style={{ maxWidth: "100%" }}
            src={previewUrl}
          />
        )}
      </div>
      <div className="modal-footer">
        <button onClick={handleModalClose} className="btn btn-primary">
          Close
        </button>
        <button
          onClick={handleCroppedImageSave}
          className="btn btn-outline-primary"
        >
          Save Photo
        </button>
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    src: state.imageSource,
  };
};

export default connect(mapStateToProps)(React.memo(ImageCropper));

ImageCropper.protoTypes = {
  src: PropTypes.any,
  modalCloseHandler: PropTypes.func,
  dimensions: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  croppedUrlHandler: PropTypes.func,
  imageIndex: PropTypes.number,
  imageName: PropTypes.string,
  modalState: PropTypes.shape({
    state: PropTypes.bool,
    message: PropTypes.string,
    mode: PropTypes.string,
  }),
};
