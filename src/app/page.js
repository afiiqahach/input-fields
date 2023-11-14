'use client'

import { useState } from 'react'
import Image from 'next/image'
import './globals.css'


export default function Home(){
  const [nama, setNama] = useState('Dwi Afiqah Achmad')
  const [change, setChange] = useState (null)

  // function button input
  function getInput(val){
    // setNama(val.target.value);
    setChange(false);
    // console.warn(val.target.value);
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
            {
              change?
              <h1>{nama}</h1> 
              :null
            }
            <div className='bio-nim-header-banner'> 
            <p>D121211014</p>
            <p>Tetap semangat!!!!</p>
            </div>
          </div>
        </div>
        <div className='cta-banner-wrapper'>
          {/* membuat button untuk input fields */}
          <input className='input' 
            style={{marginTop: '12px'}} type='text' onChange={getInput} placeholder='Masukkan nama'/>
          <button className='cta-button' style={{
            marginTop: '12px'
          }} onClick={()=>setChange(true)}>
            <p>Change Name</p>
          </button>
        </div>
      </div>
    </div>
  )
}