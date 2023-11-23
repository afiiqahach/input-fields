import '@styles/diarypost.css'

export default function DiaryPost({params}) {
    const {judul, isi_diary} = params

    return (
        <div className='diary-post-container'>
            <p>{decodeURIComponent(judul)}</p>
            <p>{decodeURIComponent(isi_diary)}</p>
        </div>
    );
}

