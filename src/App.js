import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import ChatMessage from './ChatMessage';

const App = () => {

  const [inputText, setInputText] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  // useEffect를 사용하여 스크롤을 아래로 내림
  useEffect(() => {
    if (chatRef.current) {
      if (chatRef.current.scrollTop < chatRef.current.scrollHeight) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  }, [chat]);

  const sendMessage = () => {
    if (inputText == "") return window.alert("내용을 입력하세요");

    setChat((prevChat) => [...prevChat, { sender: "User", message: inputText }]);
    setInputText("");

    setLoading(true);

    axios.post(`${process.env.REACT_APP_URL}/gpt`, {"content": inputText})
    .then((res) => {
      setLoading(false);
      console.log(res.data.ChatGPT);
      setChat((prevChat) => [...prevChat, { sender: "ChatGPT", message: res.data.ChatGPT }]);
    })
    .catch((e) => console.log(e));
  };

  return (
          <div className="container">
            <div className="chat_wrap">
              <div className="header">따뜻한 말투의 GPT</div>
              <div className="chat" ref={chatRef}>
                {loading == true ? (
                  <>
                    <img src={process.env.PUBLIC_URL + '/loading.gif'} alt="로딩 중" style={{ width: "80px", height: "80px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}/>
                    <ChatUI chat={chat}/>
                  </>
                  ) : (
                    <ChatUI chat={chat}/>
                )}
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

function ChatUI(props){
  return (
    <ul>
      {props.chat.map((message, index) => (
        <ChatMessage
          key={index}
          sender={message.sender}
          message={message.message}
          align={message.sender === "User" ? "right" : "left"}
        />
      ))}
    </ul>
  );
}

export default App;
