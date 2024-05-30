import React from 'react';
import FileUpload from './Components/FileUpload';
import PdfChat from './Components/PdfChat';

function App() {
  return (
    <div className="App mx-auto text-sm grid ">
      <div className='flex shadow-md place-content-between'>
        <img className='ml-[55px] mt-[18px] mb-2 p-1' src="/logo1.svg" alt="logo" width="104.93px" height="41px"/>
      <FileUpload />
      </div>
      <PdfChat />
    </div>
  );
}

export default App;
