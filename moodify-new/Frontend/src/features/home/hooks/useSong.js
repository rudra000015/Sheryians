import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../songContext";


export const useSong = () => {
    const context = useContext(SongContext)

    const { loading, setLoading, song, setSong, songs, setSongs } = context

    async function handleGetSong({ mood }) {
        setLoading(true)
        try {
            const data = await getSong({ mood })

            setSongs(data.songs || (data.song ? [ data.song ] : []))
            setSong(data.song || null)
        } finally {
            setLoading(false)
        }
    }

    function handleSelectSong(song) {
        setSong(song)
    }

    return ({ loading, song, songs, handleGetSong, handleSelectSong })

}
