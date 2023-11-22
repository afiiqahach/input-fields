'use client'

import { useState } from 'react'
import Image from 'next/image'
import "@styles/home.css"


export default function Home(){
  const [input, setInput] = useState('')
  const [nama, setNama] = useState ('Dwi Afiqah Achmad')
  const [empty, setEmpty] = useState (true)

  // function button input
  const handlerGantiNama = () => {
    setNama(input);
  }

  const handlerInputNama = (val) => {
    setInput(val);
    setEmpty(val.trim() === '');
  }

  function enterButton(e){
    if(e.code === "Enter") handlerGantiNama();
  }

  let content;
  if (empty) {
    content = (
      <button className='cta' style={{
        marginTop: '12px'
      }}>
        <p>DISABLED</p>
      </button>
    );
  }else {
    content = (
      <button className='cta-button' style={{
        marginTop: '12px'
      }} onClick={()=> {
        handlerGantiNama();
      }}>
        <p>Change Name</p>
      </button>
    )
  }
  return(
    // membuat struktur2 seperti image, kalimat2 dll
    <div className='body'>
      <div className='banner-container'>
        <div className='header-banner-wrapper'>
          <div className='profil-header-banner'>
            <Image
              src="/assets/gambar1.png"
              alt='gambar autor'
              fill
              objectFit='contain'
            />
          </div>
          <div className='content-header-banner'>
            <h1>{nama}</h1>
            <div className='bio-nim-header-banner'> 
            <p>D121211014</p>
            <p>Tetap semangat!!!!</p>
            </div>
          </div>
        </div>
        <div className='cta-banner-wrapper'>
          {/* membuat button untuk input fields */}
          <input className='input' 
            style={{marginTop: '12px'}} placeholder='Masukkan nama...' 
            onInput={(val) => handlerInputNama(val.target.value)}
            onKeyDown={(value) => {
              enterButton(value)
            }}/>
          {content}
        </div>
      </div>
    </div>
  )
}