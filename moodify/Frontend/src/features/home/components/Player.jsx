import React, { useEffect, useRef } from 'react'
import { useSong } from '../hooks/useSong'

const Player = () => {
    const audioRef = useRef(null)
    const { song, loading, error } = useSong()

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load()
        }
    }, [song?.url])

    if (!song && !loading) {
        return (
            <section className="player">
                <p className="player__empty">Choose a mood to play a song.</p>
            </section>
        )
    }

    return (
        <section className="player" aria-live="polite">
            <div className="player__poster-wrap">
                {song?.posterUrl ? (
                    <img className="player__poster" src={song.posterUrl} alt={song.title} />
                ) : (
                    <div className="player__poster player__poster--empty" />
                )}
            </div>

            <div className="player__content">
                <span className="player__eyebrow">
                    {loading ? "Finding your mood song..." : "Now playing"}
                </span>

                <h2 className="player__title">{song?.title || "Moodify"}</h2>

                {song?.mood && (
                    <p className="player__mood">Mood: {song.mood}</p>
                )}

                {error && <p className="player__error">{error}</p>}

                <audio ref={audioRef} className="player__audio" controls>
                    {song?.url && <source src={song.url} type="audio/mpeg" />}
                    Your browser does not support the audio element.
                </audio>
            </div>
        </section>
    )
}

export default Player
