import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

const ChatMessage = ({ sender, message, align }) => {
  // const [audio, setAudio] = useState(null);

  // useEffect(() => {
  //   if (audio !== null) {
  //     console.log(audio);
  //     audio.play();
  //   }
  // }, [audio]);

  function textToSpeech(){
    axios.post(`${process.env.REACT_APP_URL}/tts`, { content: message })
      .then((res) => {
        console.log(res);
        const audioBlob = new Blob([res.data], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const audioElement = new Audio(audioUrl);
        audioElement.play();
      })
      .catch((error) => console.log(error));
  };

  return (
    <li className={align === 'right' ? 'right' : 'left'}>
      {align === "left" ? (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img style={{ width: "20px", marginLeft: "20px" }} src={process.env.PUBLIC_URL + '/gpt.png'} alt="GPT Logo" />
            <span className="sender1">{sender}</span>
            <span className="sender1" style={{ color: "blue", cursor: "pointer" }} onClick={textToSpeech}>음성으로 듣기</span>
          </div>
          <div className="message"><span>{message}</span></div>
        </>
      ) : (
        <>
          <div className="sender"><span>{sender}</span></div>
          <div className="message"><span>{message}</span></div>
        </>
      )}
    </li>
  );
};

const App = () => {
  const [inputText, setInputText] = useState("");
  const [chat, setChat] = useState([]);

  const chatRef = useRef(null);

  // useEffect를 사용하여 스크롤을 아래로 내림
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  

  const sendMessage = () => {
    if (inputText == "") return window.alert("내용을 입력하세요");

    setChat((prevChat) => [...prevChat, { sender: "User", message: inputText }]);
    setInputText("");

    axios.post(`${process.env.REACT_APP_URL}/gpt`, {"content": inputText})
    .then((res) => {
      console.log(res.data.ChatGPT);
      setChat((prevChat) => [...prevChat, { sender: "ChatGPT", message: res.data.ChatGPT }]);
    })
    .catch((e) => console.log(e));
    
  };

  return (
          <div className="container">
            <div className="chat_wrap">
      <div className="header">CHAT</div>
      <div className="chat">
        <ul>
          {chat.map((message, index) => (
            <ChatMessage
              key={index}
              sender={message.sender}
              message={message.message}
              align={message.sender === "User" ? "right" : "left"}
            />
          ))}
        </ul>
      </div>
      <div className="input-div">
        <textarea
          placeholder="엔터를 누르면 전송됩니다."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        ></textarea>
      </div>
    </div> 
          </div>
  );
};

export default App;
