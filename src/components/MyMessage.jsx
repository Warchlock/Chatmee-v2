const MyMessage = ({ message }) => {
  // checking type of message
  if (message.attachments && message.attachments.length > 0) {
    return (
      // if image:
      <img
        src={message.attachments[0].file}
        alt="message-attachment"
        className="message-image"
        style={{ float: 'right' }}
      />
    );
  }

  return (
    //  if not simply render text
    <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50' }}>
      {message.text}
    </div>
  );
};

export default MyMessage;
