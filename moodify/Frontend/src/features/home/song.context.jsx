import { useState } from "react";
import { SongContext } from "./song-context";

export const SongContextProvider = ({ children }) => {

    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/songs/Lady_Singham_gs01DFz-1.mp3",
        "posterUrl": "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/posters/Lady_Singham_VW8DGJkie.jpeg",
        "title": "Lady Singham",
        "mood": "happy",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    return (
        <SongContext.Provider
            value={{ loading, setLoading, song, setSong, error, setError }}
        >
            {children}
        </SongContext.Provider>
    )

}
