import React, { useState, useRef, useCallback } from "react";
import { createCanvas, loadImage } from "canvas";
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const useStyles = makeStyles({
  modalBody: {
    background: "#ffffff",
    paddingBottom: "2%",
    padding: "2em",
    maxWidth: "600px",
    display: "flex",
    maxHeight: "calc(100% - 64px)",
    flexDirection: "column",
    width: "100%",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    position: "relative",
    "&:active": {
      outline: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

const ImagesPreview = (props) => {
  const {
    modalState,
    src,
    modalCloseHandler,
    dimensions,
    croppedUrlHandler,
    imageIndex,
    imageName,
  } = props;
  const { height, width } = dimensions;
  const imageRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "px", width, height });
  const [previewUrl, setPreviewUrl] = useState();

  // If you setState the crop in here you should return false.
  const onImageLoaded = useCallback((img) => {
    imageRef.current = img;
  }, []);

  const onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    setCrop({ ...crop });
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
        croppedUrlHandler(window.URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  };

  return (
    <Dialog maxWidth={"lg"} onClose={handleModalClose} open={modalState}>
      {/* <Carousel views={imagesUrlList} /> */}
      <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
        <button type="button" className="close" onClick={handleModalClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {/* <img src={imageSourceUrl} /> */}
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
          <img alt="Crop" style={{ maxWidth: "100%" }} src={previewUrl} />
        )}
      </div>
      <div className="modal-footer">
        <Button onClick={handleModalClose} color="primary">
          Close
        </Button>
        <Button onClick={handleCroppedImageSave}>Save Photo</Button>
      </div>
    </Dialog>
  );
};

export default ImagesPreview;
