import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import { useRef, useState } from "react";
import profileImgDef from "../../assets/icons/avatar.svg";

import "./share.css";

export default function Share({ profileImgUrl }) {
  const [postImg, setPostImg] = useState();
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const [isDisabledUpload, setIsDisabledUpload] = useState(true);
  const [btnActive, setBtnActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const styles = {
    backgroundColor: btnActive ? "red" : "blue",
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const postText = evt.target.sharePostText.value;

    const formData = new FormData();

    formData.append("postText", postText);
    formData.append("postImg", postImg);

    fetch("http://localhost:1200/lamasocial/create_post", {
      method: "POST",
      body: formData,
      headers: { token: localStorage.getItem("token") },
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
  };

  return (
    <form onSubmit={handleFormSubmit} className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={profileImgUrl || profileImgDef}
            alt="smt"
          />

          <input
            id="sharePostText"
            placeholder="What is in your mind"
            className="shareInput"
          />
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
          <button type="submit" className="shareButton">
            Share
          </button>
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
                  onChange={(e) => {
                    setPostImg(e.target.files[0]);
                  }}
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
