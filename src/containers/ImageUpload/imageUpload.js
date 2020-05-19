import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import { storage, db } from "../../firebase/firebase";
import ImagesPreviewComponent from "../../components/ImagesPreviewComponent/imagesPreview";
import { IMAGE_SIZE_CONST } from "../../utils/constant";

class ImageUploadContainer extends Component {
  state = {
    convertedImagesUrlList: Array(4).fill({ url: null, name: "" }),
    modalState: Array(4).fill(false),
    imageName: "",
    src: null,
  };

  isUploadDisabled = () => {
    const { height, width } = this.state.dimensions;
    return height !== 1024 || width !== 1024;
  };

  handlePreview = (index) => {
    const modalState = [...this.state.modalState];
    modalState[index] = true;
    console.log(modalState);
    this.setState({ modalState });
  };

  handleModalClose = (index) => {
    const modalState = [...this.state.modalState];
    modalState[index] = false;
    console.log(modalState);
    this.setState({ modalState });
  };

  resetFile = (event) => {
    event.preventDefault();
    this.setState({
      convertedImagesUrlList: Array(4).fill({ url: null, name: "" }),
      modalState: Array(4).fill(false),
      imageName: "",
      src: null,
      dimensions: {
        height: null,
        width: null,
      },
    });
  };

  onSelectFile = (e) => {
    const image = e.target.files[0];
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({
          src: reader.result,
          imageName: image.name,
        })
      );
      reader.readAsDataURL(image);
    }
  };

  onImgLoad = ({ target: img }) => {
    return {
      height: img.offsetHeight,
      width: img.offsetWidth,
    };
  };

  handleConvertedImageUrlList = (index, url, imageName) => {
    const urlList = [...this.state.convertedImagesUrlList];
    urlList[index] = {
      url,
      name: imageName.split(".").join(`_${index}.`),
    };
    console.log(urlList, index);
    this.setState({ convertedImagesUrlList: urlList });
  };

  async blobFromURL(url) {
    const blob = await fetch(url).then((r) => r.blob());
    return blob;
  }

  handleFireBaseUpload = (e) => {
    e.preventDefault();
    const { convertedImagesUrlList } = this.state;
    console.log("start of upload");
    const promises = [];
    convertedImagesUrlList.forEach(async (file) => {
      console.log(file);
      const src = await this.blobFromURL(file.url);
      console.log(src);
      const uploadTask = storage.ref(`/images/${file.name}`).put(src);
      promises.push(uploadTask);
      //initiates the firebase side uploading
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          //takes a snap shot of the process as it is happening
          console.log(snapShot);
        },
        (err) => {
          //catches the errors
          console.log(err);
        },
        () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              console.log(fireBaseUrl);
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => alert("All files uploaded"))
      .catch((err) => console.log(err.code));
  };

  render() {
    const { src, modalState, imageName, convertedImagesUrlList } = this.state;

    const isUploadDisabled = () => {
      console.log(convertedImagesUrlList.some((file) => !file.url.length));
      return convertedImagesUrlList.some((file) => !file.url.length);
    };

    return (
      <div>
        <input
          type="file"
          onLoad={this.onImgLoad}
          onChange={this.onSelectFile}
        />
        {src && (
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={this.handleFireBaseUpload}
              variant="contained"
              color="primary"
            >
              Upload to Server
            </Button>
            <div>
              <Button onClick={this.resetFile} variant="contained">
                Remove File
              </Button>
            </div>
            <div>
              <img src={src} />
            </div>
            <h1>See Preview of converted images</h1>
            {Array.apply(null, Array(4)).map((value, index) => (
              <>
                <Button
                  onClick={() => this.handlePreview(index)}
                  variant="contained"
                  color="primary"
                >
                  See Preview Image {index + 1}
                </Button>
                <ImagesPreviewComponent
                  modalState={modalState[index]}
                  modalCloseHandler={() => this.handleModalClose(index)}
                  src={src}
                  imageIndex={index + 1}
                  imageName={imageName}
                  dimensions={IMAGE_SIZE_CONST[index]}
                  croppedUrlHandler={(url) =>
                    this.handleConvertedImageUrlList(index, url, imageName)
                  }
                />
              </>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ImageUploadContainer;
