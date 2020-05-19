import React, { Component } from "react";
import { storage, db } from "../../firebase/firebase";

class ImageListing extends Component {
  constructor() {
    super();
    this.state = {
      imagesUrlList: [],
    };
  }

  async componentDidMount() {
    this.handleGetAllLinks();
  }

  handleGetAllLinks = async (event) => {
    const xyz = await storage.ref().child("images/").listAll();
    await xyz.items.forEach(async (item) => {
      const url = await item.getDownloadURL();
      this.setState({
        imagesUrlList: [
          ...this.state.imagesUrlList,
          {
            source: url,
          },
        ],
      });
    });
  };

  render() {
    const { imagesUrlList } = this.state;
    const chunkedArray = [] 
    return (
      <div>
        <ul>
          {imagesUrlList.map((image) => (
            <li>
              <img src={image.source} alt="image"></img>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ImageListing;
