[ 프로젝트 소개 ]
---
이 프로젝트는 ChatGPT API와 Google Text-to-Speech API를 활용하여, 최신 Open API 기술을 적용하였습니다.

ChatGPT 모델로는 gpt-3.5-turbo-instruct를 활용하여, 하이퍼파라미터를 조정하여 차갑고 비관적인 챗봇부터 따뜻하고 대화적인 GPT가 쓰는 일기 기능을 구현하였습니다.

또한, Google Text-to-Speech API를 이용하여 GPT의 응답을 한국 남성과 여성 목소리로 자연스럽게 읽어주는 기능을 추가하였습니다.<br><br><br><br>
## [ 프로젝트 설계 ]
* 클라이언트 개발과 서버 개발을 분리하여 설계

* DB는 사용하지 않음

* API 명세서(Postman) 설계<br><br><br><br>

## [프로젝트 개발 순서]
* 화면기획서(생략) -≫ rest api 설계, 개발 -≫ postman으로 테스트 -≫ 서버 Docker image로 배포 -≫ 웹에서 배포한 서버로 통신 -≫ 웹은 S3 정적 웹 호스팅 이용하여 배포<br><br><br><br>

## [ [API 명세서 보기](https://documenter.getpostman.com/view/31597978/2sA2r81itQ)🔽 ]<br><br>
![image](https://github.com/Yeomdongsu/chatting_web_front/assets/117874997/5c100c3e-687e-4dc4-8239-dff3f63d99a7)<br><br><br><br>

## [ Web 실행 Click🔽] <br><br>
[![image](https://github.com/Yeomdongsu/chatting_web_front/assets/117874997/8d1bc0c8-2d11-4e92-af62-e48e13d4f02f)](http://dzsx20-chatting-app.s3-website.ap-northeast-2.amazonaws.com/)

