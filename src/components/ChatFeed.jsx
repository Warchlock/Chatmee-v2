import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';

const ChatFeed = (props) => {
  // deconstructing Props
  const { chats, activeChat, userName, messages } = props;
  // finding chats
  const chat = chats && chats[activeChat];
  // checking if mesages were read
  const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
    <div
      key={`read_${index}`}
      className="read-receipt"
      style={{
        float: isMyMessage ? 'right' : 'left',
        backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
      }}
    />
  ));
  // component to generate masseges
  const renderMessages = () => {
    // fetching messeges ID
    const keys = Object.keys(messages);
    // rendering messages
    return keys.map((key, index) => {
      const message = messages[key];
      // checking for last massage
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      // checking if message is user message
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          {/* dynamic div for message */}
          <div className="message-block">
            {isMyMessage
              ? <MyMessage message={message} />
              : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
          </div>
          <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };
  // checking for active chat
  if (!chat) return <div />;
  // structure of chatfeed
  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {/* subtitle of chat */}
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: '100px' }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;

