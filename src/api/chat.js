import { client } from "./client";

const Chat = {
  chat: (message = "") => client.get(`/chat/send?message=${message}`),
};

export default Chat;
