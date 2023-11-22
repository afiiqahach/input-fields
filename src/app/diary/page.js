'use client'
import '@styles/diary.css'
import { useEffect, useState } from "react"
import axios from "axios"

export default function Diary() {
    const [judul, setJudul] = useState([]);
    const [isiDiary, setIsiDiary] = useState([]);

    const endpointAPI = 'https://6555c0d784b36e3a431e3ecb.mockapi.io/diary';

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
            {judul.length > 0 ? (
                <ul>
                    {judul.map((item, idx) => (
                        <li>
                            <div className='diary-container'>
                                <h1>{judul[idx]}</h1>
                                <p className='p-diary'>{isiDiary[idx]}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                "API loading..."
            )}
        </div>
    )
}