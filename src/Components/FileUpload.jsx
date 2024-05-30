import React, { useState, useRef } from 'react';
import axios from 'axios';

function FileUpload() {
  const [filename, setFilename] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilename(file.name);
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await axios.post('http://localhost:8000/upload_pdf/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };


  return (
    <div className="flex place-items-center overflow-hidden">
      {filename && (
        <div className="flex items-center ">
          <img src="/frame.svg " alt="File Icon" className="w-6 h-6" />
          <p className="text-green-500 p-3">{filename.name}</p>
        </div>)}
      <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
     <button
  type="button"
  onClick={handleButtonClick}
  className="mx-auto flex place-items-center py-1 px-8 mt-1 me-2 mb-2 h-10 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-black hover:bg-gray-100 hover:text-blue-700 "
>
  <p className='scale-10 p-3 sm:hidden'>⊕</p>
  <span className="hidden sm:inline">⊕ Upload PDF</span>
</button>

    </div>
  );
}

export default FileUpload;
