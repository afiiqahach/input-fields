'use client'

import { useState } from 'react'
import Image from 'next/image'
import "@styles/home.css"


export default function Home(){
  const [input, setInput] = useState('')
  const [nama, setNama] = useState ('Dwi Afiqah Achmad')

  // function button input
  const handlerGantiNama = () => {
    setNama(input);
  }

  const handlerInputNama = (val) => {
    setInput(val);
  }

  function enterButton(e){
    if(e.code === "Enter") handlerGantiNama();
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
          <button className='cta-button' style={{
            marginTop: '12px'
          }} onClick={()=> {
            handlerGantiNama();
          }}>
            <p>Change Name</p>
          </button>
        </div>
      </div>
    </div>
  )
}