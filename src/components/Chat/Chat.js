import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import "./Chat.css"

function Chat() {
  const chatboxEl = useRef();

  const [talkLoaded, markTalkLoaded] = useState(false);
  const [selectedUser, setSelectedUser] = useState('Jessica');

  const UserName = localStorage.getItem("userName");
  const UserEmail = localStorage.getItem("userEmail");
  const UserId = localStorage.getItem("userId");

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: UserId,
        name: UserName,
        email: UserEmail,
        photoUrl: 'henry.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const otherUserJessica = new Talk.User({
        id: '2',
        name: 'Rrezon 2',
        email: 'rrezonkrasniqi21@gmail.com',
        photoUrl: 'jessica.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const otherUserJohn = new Talk.User({
        id: '3',
        name: 'John Doe',
        email: 'johndoe@example.com',
        photoUrl: 'john.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const otherUser = selectedUser === 'Jessica' ? otherUserJessica : otherUserJohn;

      const session = new Talk.Session({
        appId: 'tQeKx0VK',
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [UserEmail, UserName, talkLoaded, selectedUser]);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div>
      <div className="user-dropdown">
        <label htmlFor="user-select">Select User:</label>
        <select id="user-select" value={selectedUser} onChange={handleUserChange}>
          <option value="Jessica">Jessica Wells</option>
          <option value="John">John Doe</option>
        </select>
      </div>
      <div ref={chatboxEl}  className="chat"/>
    </div>
  );
}

export default Chat;
