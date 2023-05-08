import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import { useRef, useState } from "react";

import "./Share.css";

export default function Share() {
  const [fileUrl, setFileUrl] = useState("");
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const [isDisabledUpload, setIsDisabledUpload] = useState(true);
  const [btnActive, setBtnActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const styles = {
    backgroundColor: btnActive ? "red" : "blue",
  };

  const uploadImage = async (evt) => {
    setIsDisabledInput(true);
    setLoading(true);

    const file = evt.target.files;
    const data = new FormData();

    data.append("file", file[0]);
    data.append("upload_preset", "lamasocial");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dephdgqpo/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const data2 = await res.json();

    setFileUrl(data2.secure_url);
    setIsDisabledUpload(false);
    setBtnActive(false);
    setLoading(false);
  };

  const handleBtnSubmit = (evt) => {
    evt.preventDefault();

    fetch("http://localhost:1200/lamasocial/create_post", {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ post_url: fileUrl }),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        return console.log(err);
      });
    evt.target.value = null;
    setIsDisabledInput(false);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src="/assets/person/1.png"
            alt="smt"
          />
          <input placeholder="What is in your mind" className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div
              data-toggle="modal"
              data-target="#uploadModal"
              className="shareOption"
            >
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photos or Videos</span>
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </div>
      </div>
      <div className="modal fade" id="uploadModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}
              {/* <h4 className="modal-title">1</h4> */}
            </div>
            <div className="modal-body">
              <p>Please upload your file here</p>
              <div className="input-spinner-wrapper">
                <input
                  disabled={isDisabledInput}
                  onChange={(evt) => uploadImage(evt)}
                  type="file"
                  accept="image/*"
                />
                <span
                  style={loading ? { display: "block" } : { display: "none" }}
                  className="spinner"
                ></span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleBtnSubmit}
                disabled={isDisabledUpload}
                style={{ styles }}
                type="click"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
