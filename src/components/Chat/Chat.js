import Talk from "talkjs";
import { useEffect, useState, useRef } from "react";
import "./Chat.css";
import avatar from "../Navigation/avatar.jpg";

function Chat() {

  
  const chatboxEl = useRef();

  const [talkLoaded, markTalkLoaded] = useState(false);
  const UserName = localStorage.getItem("userName");
  const UserEmail = localStorage.getItem("userEmail");
  const UserId = localStorage.getItem("userId");

  const otherUserName = localStorage.getItem("otherUserName");
  const otherUserEmail = localStorage.getItem("otherUserEmail");
  const otherUserId = localStorage.getItem("otherUserId");


  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: UserId,
        name: UserName,
        email: UserEmail,
        photoUrl: avatar,
        welcomeMessage: "Hello!",
        role: "default",
      });

      const otherUser = new Talk.User({
        id:otherUserId,
        name: otherUserName,
        email: otherUserEmail,
        photoUrl: avatar,
        welcomeMessage: "Hello!",
        role: "default",
      });

      const session = new Talk.Session({
        appId: "tQeKx0VK",
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createInbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [UserEmail, UserId, UserName, otherUserEmail, otherUserId, otherUserName, talkLoaded]);

  return <div className="chat" ref={chatboxEl} />;
  
}

export default Chat;
