import React, { useState } from 'react';
import axios from 'axios';
import './Diary.css';

function Diary() {

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        content: '',
        emotion: ''
    })

    const [diary, setDiary] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    function handleSubmit(){
        console.log(formData);
    }

    return (
        <div>
            <div className="title-container">따뜻한 성격의 GPT가 써주는 일기</div>
            <div className="app-container">
                <div className="input-container">
                    {/* <img src={process.env.PUBLIC_URL + '/diary.jpg'} style={{width:"100px", margin:"auto"}}/> */}
                    <div className='div-title'>일기 작성하기</div>
                    <div className='div-subtitle'>모두 작성한 후 화살표를 눌러주세요.</div>
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
                    {/* <button onClick={handleSubmit} className="submit-button">일기 생성</button> */}
                </div>
                <div className="arrow-container">
                    <img src={process.env.PUBLIC_URL + '/img.jpg'} className="arrow-image" onClick={() => handleSubmit()}/>
                </div>
                <div className="diary-container">
                    <p>{diary}</p>
                </div>
            </div>
        </div>
    );
}

export default Diary;
