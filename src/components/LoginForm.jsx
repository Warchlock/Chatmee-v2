import { useState } from 'react';
import axios from 'axios';

const projectID = 'dd81a35c-ea4e-43a7-bf29-b86eef2a7e9e';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    // preventing refresh
    e.preventDefault();

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };
    //  username | password => chatRmgine -> give messages
    // if that works => log in
    // if not slam error
    try {
      // sending request to api
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('Incorrect credentials.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chatmee</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default Modal;
