'use client'
import '@styles/diary.css'
import { useEffect, useState } from "react"
import axios from "axios"
import Link from 'next/link';

export default function Diary() {
  const [getJudul, setGetJudul] = useState([])
  const [getIsiDiary, setGetIsiDiary] = useState([])
  const [getKoleksiData, setGetKoleksiData] = useState([])

  const endpointAPI = 'https://6555c0d784b36e3a431e3ecb.mockapi.io/diary';


  async function getDiary() {
    try {
      const res = await axios.get(endpointAPI)

      // mengambil data
      const data = res.data
      setGetKoleksiData(data)

      // mengambil judul
      const judul = data.map((item) => item.judul)
      setGetJudul(judul)

      // mengambil isi diary
      const isi_diary = data.map((item) => item.isi_diary)
      setGetIsiDiary(isi_diary)
    } catch(error) {
      console.error("error fetching data:", error)
    }
}

  const [postKetikJudul, setpostKetikJudul] = useState("")
  const [postKetikIsi, setpostKetikIsi ] = useState("")

  async function postDiary() {
    try{
      const res = await axios.post(endpointAPI, {
        judul: postKetikJudul,
        isi_diary: postKetikIsi
      })
      setGetKoleksiData([...getKoleksiData, res.data])

      setpostKetikIsi("")
      getDiary()
    } catch (error) {
      alert("gagal untuk POST API" + error)
    }
  }

  // fungsi menginput judul dan isi diary dan enter button
  function handlerInputJudul(event) {
    event.preventDefault()
    setpostKetikJudul(event.target.value)
  }
  function handlerInputIsi(event) {
    event.preventDefault()
    setpostKetikIsi(event.target.value)
  }
  function handlerSubmitDiary(event) {
    postDiary()
    setpostKetikJudul("")
    setpostKetikIsi("")
  }
  function enterButton(e){
    if(e.key === "Enter") {
      handlerSubmitDiary();
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
                <input 
                  className='judul'
                  type='text'
                  style={{marginTop: '12px'}} placeholder='add another title..' 
                  onChange={handlerInputJudul}
                  onKeyDown={enterButton}
                  value={postKetikJudul}
                />

                <input 
                  className='isi-diary'
                  type='text'
                  style={{marginTop: '12px'}} placeholder='add another diary..' 
                  onChange={handlerInputIsi}
                  onKeyDown={enterButton}
                  value={postKetikIsi}
                />

                
                {postKetikJudul && postKetikJudul ? (
                <div 
                className='cta-button'
                onClick={postDiary}>
                  <p>Add New Diary</p>
                </div>
                ) : (
                <div className='cta'
                onClick={() => alert("Isi terlebih dahulu")}>
                  <p>DISABLED</p>
                </div>
              )}
                
                
                </div>
            </div>

            {getKoleksiData ? (
        getJudul.length > 0 ? (
          <ul>
            {getJudul.map((item, idx) => (
              <Link href={`/diary/${item}/${getIsiDiary[idx]}`}>
                <li key={idx}>
                  <div
                    className={`diary-container ${
                      idx === getJudul.length - 1 ? "last-item" : ""
                    }`}
                  >
                    <h1>{getJudul[idx]}</h1>
                    <p className="p-diary">{getIsiDiary[idx]}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          "API loading.."
        )
      ) : (
        "API empty"
      )}
      </div>
    )
}