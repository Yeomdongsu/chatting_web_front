import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Diary.css';
import { useNavigate } from 'react-router-dom';

function Diary() {

    const nav = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        content: '',
        emotion: ''
    })

    const [GptDiary, setGptDiary] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('diary');

    let [fade, setFade] = useState('')

    useEffect(() => {
        setTimeout(() => {setFade('end')}, 100)
        
        return () => {
            setFade('')
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    function handleSubmit(){
        if (formData.title == "" || formData.date == "" || formData.content == "" || formData.emotion == "") return window.alert("모두 다 작성하세요.");

        setLoading(true);
        axios.post(`${process.env.REACT_APP_URL}/gpt/diary`, formData)
        .then((res) => {
            setLoading(false);
            console.log(res.data.ChatGPT);
            setGptDiary(res.data.ChatGPT);
        })
        .catch((e) => console.log(e))
    }

    function Clear(){
        setGptDiary("");
        setFormData({
            title: '',
            date: '',
            content: '',
            emotion: ''
        });
    }

    return (
        <div className={'start ' + fade}>
            <div className="tab-container">
                <div className={activeTab === 'main' ? 'active-tab' : 'tab'} onClick={() => {setActiveTab('main'); nav("/")}}>싸가지없는 GPT 챗봇</div>
                <div className={activeTab === 'diary' ? 'active-tab' : 'tab'} onClick={() => setActiveTab('diary')}>따뜻한 GPT가 써주는 일기</div>
            </div>

            <div className="title-container">따뜻한 GPT가 써주는 일기</div>

            <div className="app-container">
                <div className="input-container">
                    {loading && <img src={process.env.PUBLIC_URL + '/loading.gif'} alt="로딩 중" style={{ width: "80px", height: "80px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}/>}
                    <div className='div-title'>일기 작성하기</div>
                    <div className='div-subtitle'>모두 작성한 후 화살표를 눌러주세요.</div>
                    <div style={{margin:"20px", textAlign:"center"}}><img src={process.env.PUBLIC_URL + '/diary.jpg'} style={{width:"150px", margin:"auto"}}/></div>
                    <div className="input-box">
                        <span className='span-field'>제목 :</span> 
                        <input
                                type="text"
                                placeholder="제목을 입력하세요."
                                value={formData.title}
                                onChange={handleChange}
                                name="title"
                                className="input-field"
                        />
                    </div>
                    <div className="input-box">
                        <span className='span-field'>날짜 :</span> 
                        <input
                            type="text"
                            placeholder="날짜를 입력하세요."
                            value={formData.date}
                            onChange={handleChange}
                            name="date"
                            className="input-field"
                        />
                    </div>
                    <div className="input-box">
                        <span className='span-field'>내용 :</span> 
                        <input
                            type="text"
                            placeholder="내용을 입력하세요."
                            value={formData.content}
                            onChange={handleChange}
                            name="content"
                            className="input-field"
                        />
                    </div>
                    <div className="input-box">
                        <span className='span-field'>감정 :</span> 
                        <input
                            type="text"
                            placeholder="감정을 입력하세요."
                            value={formData.emotion}
                            onChange={handleChange}
                            name="emotion"
                            className="input-field"
                        />
                    </div>
                </div>
                <div className="arrow-container">
                    <img src={process.env.PUBLIC_URL + '/clear.png'} style={{display:"block", width:"80px", cursor:"pointer", marginLeft:"10px"}} onClick={() => Clear()} />
                    <img src={process.env.PUBLIC_URL + '/img.jpg'} className="arrow-image" onClick={() => handleSubmit()}/>
                </div>
                <div className="diary-container">
                    {
                        GptDiary.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>))
                    }
                </div>
            </div>
        </div>
    );
}

export default Diary;
