import React, { useRef, useState } from "react";
import File from "../assets/adjuntar.png";
import Img from "../assets/img.png";
import { useDispatch, useSelector } from "react-redux";
import { chatMessage } from "../actions/chats";
import EmojiPicker from "emoji-picker-react";

export const Input = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [open, setOpen] = useState("close");
  const inputRef = useRef(null);
  //const {uid,name,photo} = useSelector( state => state.auth );

  const handleSend = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    console.log("text");
    dispatch(chatMessage(img, text));

    setText("");
    setImg(null);
  };

  const emoji = () => {
    setOpen("open");
  };

  const closeEmoji = () => {
    setOpen("close");
    inputRef.current.focus();
    inputRef.current.selectionStart = text.length;
  };

  const onEmojiClick = (emojiData, e) => {
    setText((prevText) => prevText + emojiData.emoji);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && text !== "") {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="inputChat">
      <form className="inputChat">
        <div className="conInp">
          <button className="btn-emoji" type="button" onClick={emoji}>
            <i className="fa-regular fa-face-smile"></i>
          </button>
          <div className={open}>
            <button type="button" className="closeEmoji" onClick={closeEmoji}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              height={450}
              width="100%"
            />
          </div>

          <input
            type="text"
            placeholder="Send msg"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            value={text}
          />
        </div>

        <div className="send">
          <img src={File} alt="" />
          <input
            type="file"
            id="fileSelector"
            style={{ display: "none" }}
            accept="/image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="fileSelector">
            <img src={Img} alt="" />
          </label>
          <button className="btn-send" type="button" onClick={handleSend}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
