'use client'
import '@styles/diary.css'
import { useEffect, useState } from "react"
import axios from "axios"
import Link from 'next/link';

export default function Diary() {
    const [input, setInput] = useState([])
    const [nama, setNama] = useState ([])
    const [empty, setEmpty] = useState (true)

    const [judul, setJudul] = useState([]);
    const [isiDiary, setIsiDiary] = useState([]);
    const [isData, setData] = useState([])

    const endpointAPI = 'https://6555c0d784b36e3a431e3ecb.mockapi.io/diary';

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
        <p>Search</p>
      </button>
    )
  }

    async function getDiary() {
        try{
            const res = await axios.get(endpointAPI);
            const data = res.data;

            const judul = data.map((item) => item.judul);
            setJudul(judul);

            const isi_diary = data.map((item) => item.isi_diary);
            setIsiDiary(isi_diary);
        }
        catch(error){
            console.log("error fetching data: ${error}")
        }   
    }

    useEffect(() => {
        getDiary();
      }, []);

    return(
        <div>
            <div className='banner-container'>
                <div className='cta-banner-wrapper'>
                {/* membuat button untuk input fields */}
                <input className='input' 
                    style={{marginTop: '12px'}} placeholder='search here..' 
                    onInput={(val) => handlerInputNama(val.target.value)}
                    onKeyDown={(value) => {
                    enterButton(value)
                    }}/>
                {content}
                </div>
            </div>

            {isData ? (judul.length > 0 ? (
        <ul>
          {judul.map((item, idx) => (
            <Link href={`/diary/${item}/${isiDiary[idx]}`}>
            
            <li key={idx}>           
              <div className={`diary-container ${idx === judul.length - 1? 'last-item' :''}`}>
                <h1>{judul[idx]}</h1>
                <p className="p-diary">{isiDiary[idx]}</p>
              </div>
            </li>
            
            </Link>
          ))}
        </ul>
      ) : (
        "API is loading..."
      )
      ) : 'API empty'

      }
            {/* {judul.length > 0 ? (
                <ul>
                    {judul.map((item, idx) => (
                        <Link href={`/diary/${item}/${isiDiary[idx]}`}>
                            <li key={idx}>
                                <div className='diary-container'>
                                    <h1>{judul[idx]}</h1>
                                    <p className='p-diary'>{isiDiary[idx]}</p>
                                </div>
                            </li>
                        </Link>
        
                    ))}
                </ul>
            ) : (
                "API loading..."
            )} */}
     
        </div>
    )
}