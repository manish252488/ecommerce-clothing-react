import Chat from "../../api/chat";
import { ADD_CHAT, CLEAR_CHAT } from "./actionTypes";

export function sendChat(message = "") {
  return (dispatch) =>
    Chat.chat(message)
      .then((reply) => {
        let chat = {
          id: new Date().toISOString(),
          user: "bot",
          message: reply,
          time: new Date(),
        };
        dispatch({
          type: ADD_CHAT,
          payload: chat,
        });
      })
      .catch((err) => {
        let chat = {
          id: new Date().toISOString(),
          user: "bot",
          message: "error",
          time: new Date(),
        };
        dispatch({
          type: ADD_CHAT,
          payload: chat,
        });
      });
}

export function addUserChat(text) {
  let chat = {
    id: new Date().toISOString(),
    user: "usr",
    message: text,
    time: new Date(),
  };
  return (dispatch) =>
    dispatch({
      type: ADD_CHAT,
      payload: chat,
    });
}
export function removeChats() {
  return (dispatch) =>
    dispatch({
      type: CLEAR_CHAT,
    });
}
