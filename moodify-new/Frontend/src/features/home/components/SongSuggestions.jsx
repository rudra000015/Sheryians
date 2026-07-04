import { useSong } from "../hooks/useSong"
import "./song-suggestions.scss"

const SongSuggestions = () => {
    const { loading, song, songs, handleSelectSong } = useSong()

    if (loading) {
        return <p className="song-suggestions__status">Finding songs...</p>
    }

    if (!songs.length) {
        return null
    }

    return (
        <section className="song-suggestions">
            <h3>Suggested songs</h3>
            <div className="song-suggestions__list">
                {songs.map((suggestedSong) => (
                    <button
                        className={`song-suggestions__item ${song?.url === suggestedSong.url ? "active" : ""}`}
                        key={`${suggestedSong.mood}-${suggestedSong.title}-${suggestedSong.url}`}
                        onClick={() => handleSelectSong(suggestedSong)}
                        type="button"
                    >
                        <img src={suggestedSong.posterUrl} alt={suggestedSong.title} />
                        <span>{suggestedSong.title}</span>
                    </button>
                ))}
            </div>
        </section>
    )
}

export default SongSuggestions
