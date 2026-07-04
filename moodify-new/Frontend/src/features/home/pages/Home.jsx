import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import SongSuggestions from '../components/SongSuggestions'
import { useSong } from '../hooks/useSong'

const Home = () => {

    const { handleGetSong } = useSong()

    return (
        <>
            <FaceExpression
                onClick={(expression) => { handleGetSong({ mood: expression }) }}
            />
            <SongSuggestions />
            <Player />
        </>
    )
}

export default Home
