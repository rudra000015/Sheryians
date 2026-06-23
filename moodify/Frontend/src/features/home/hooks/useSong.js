import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song-context";



export const useSong = () => {
    const context = useContext(SongContext)
    const { loading, setLoading, song, setSong, error, setError } = context

    async function handleGetSong({ mood }) {
        setLoading(true)
        setError("")

        try {
            const data = await getSong({ mood })

            if (data.song) {
                setSong(data.song)
            } else {
                setError("No song found for this mood yet.")
            }
        } catch (error) {
            setError(error?.response?.data?.message || "Could not load a song right now.")
        } finally {
            setLoading(false)
        }
    }

    return ({ loading, song, error, handleGetSong })
}
