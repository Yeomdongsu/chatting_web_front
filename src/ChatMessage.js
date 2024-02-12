import { useState } from "react";
import axios from "axios";

const ChatMessage = ({ sender, message, align }) => {

    const [audioElement, setAudioElement] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(false);

    function MantextToSpeech(){
        setLoading(true);

        axios.post(`${process.env.REACT_APP_URL}/tts`, { content: message, type: "ko-KR-Neural2-C"}, { responseType: 'arraybuffer' })
        .then((res) => {
            setLoading(false);
            resFunc(res.data);
        })
        .catch((error) => console.log(error));
    };

    function WomantextToSpeech(){
        setLoading(true);

        axios.post(`${process.env.REACT_APP_URL}/tts`, { content: message, type: "ko-KR-Wavenet-A" }, { responseType: 'arraybuffer' })
        .then((res) => {
            setLoading(false);
            resFunc(res.data);
        })
        .catch((error) => console.log(error));
    };

    function resFunc(data){
        const audioBlob = new Blob([data], { type: "audio/mpeg" });
        const audioUrl = window.URL.createObjectURL(audioBlob);
        const audioElement = new Audio(audioUrl);
        audioElement.play();

        setIsPlaying(true);
        setAudioElement(audioElement);

        // 오디오가 끝나면 audioElement를 null로 설정
        audioElement.addEventListener('ended', () => {
            setAudioElement(null);
            setIsPlaying(false); 
        });
    }

    function pause(){
        if (audioElement){
            if (isPlaying){
                audioElement.pause();
                setIsPlaying(false);
            } else {
                audioElement.play();
                setIsPlaying(true);
            }
        } else {
            window.alert("재생중이 아닙니다.");
        }
    }

    return (
        <li className={align === 'right' ? 'right' : 'left'}>
            {align === "left" ? (
                loading == true ? (
                    <>
                        <img src={process.env.PUBLIC_URL + '/loading.gif'} alt="로딩 중" style={{ width: "80px", height: "80px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}/>
                        <GptUI sender={sender} message={message} MantextToSpeech={MantextToSpeech} WomantextToSpeech={WomantextToSpeech} pause={pause}/>
                    </>
                ) : (
                    <GptUI sender={sender} message={message} MantextToSpeech={MantextToSpeech} WomantextToSpeech={WomantextToSpeech} pause={pause} />
                )
            ) : (
                <>
                    <div className="sender"><span>{sender}</span></div>
                    <div className="message"><span>{message}</span></div>
                </>
            )}
        </li>
    );
};

function GptUI({ sender, message, MantextToSpeech, WomantextToSpeech, pause }){
    return (
        <>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img style={{ width: "20px", marginLeft: "20px" }} src={process.env.PUBLIC_URL + '/gpt.png'} alt="GPT Logo" />
                <span className="sender1">{sender}</span>
                <span className="sender1" style={{ color: "blue", cursor: "pointer" }} onClick={() => MantextToSpeech()}>남자</span>
                <span className="sender1" style={{ color: "red", cursor: "pointer" }} onClick={() => WomantextToSpeech()}>여자</span>
                <img style={{ width: "20px", marginLeft:"3px", paddingTop:"1px" }} src={process.env.PUBLIC_URL + '/stop2.jpg'} alt="Stop Logo" onClick={() => pause()}/>
            </div>
            <div className="message"><span>{message}</span></div>
        </>
    );
}

export default ChatMessage;