const TheirMessage = ({ lastMessage, message }) => {
  // checking if it the first message
  const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;

  return (
    <div className="message-row">
      {isFirstMessageByUser && (
        <div
        // if it the first message create a div with user image as background
          className="message-avatar"
          style={{ backgroundImage: message.sender && `url(${message.sender.avatar})` }}
        />
      )}
      {/* checking type of message */}
      {message.attachments && message.attachments.length > 0
        ? (
          // if image return image
          <img
            src={message.attachments[0].file}
            alt="message-attachment"
            className="message-image"
            style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
          />
        )
        : (
          // if not a image render text
          <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
            {message.text}
          </div>
        )}
    </div>
  );
};

export default TheirMessage;
