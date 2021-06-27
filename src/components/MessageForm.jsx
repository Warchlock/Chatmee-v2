import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';

const MessageForm = (props) => {
  // initial value of the message (empty string)
  const [value, setValue] = useState('');
  const { chatId, creds } = props;

  const handleChange = (event) => {
    // value of the input
    setValue(event.target.value);
    // rendering 3 dots when typing message
    isTyping(props, chatId);
  };

  const handleSubmit = (event) => {
    // making sure that there is not browser refresh
    event.preventDefault();

    const text = value.trim();

    // if message is not empty send the message
    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }
    // after sending the message reset the value back to the empty string
    setValue('');
  };

  const handleUpload = (event) => {
    // handling uploading of an image, text stays empty
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

  return (
    // form for message
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {/* upload icon for uploading a image */}
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      {/* uplading the image */}
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

export default MessageForm;
