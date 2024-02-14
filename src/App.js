import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Main from './Main';
import Diary from './Diary';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/diary' element={<Diary />} />
        <Route path='*' element={<div style={{paddingTop:"100px", textAlign:"center", fontSize:"30px"}}>없는 페이지입니다.</div>} />
      </Routes>
    </>
  );
}

export default App;