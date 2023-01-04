import BeatsList from "../../components/beats-list/beats-list.component";
import PillButton from "../../components/pill-button/pill-button.component";
import SearchBar from "../../components/searchbar/searchbar.component";
import cardImg from '../../assets/card1.png'
import ArtistCard from "../../components/artist-card/artist-card.component";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getBeats } from "../../api/beats";
import { getArtist } from "../../api/artists";
import { getPlaylist } from "../../api/playlist";
import PlaylistCard from "../../components/playlist-card/playlist-card.component";

const BeatsPage = () => {
    const { route, id } = useParams()
    const [beats, setBeats] = useState([])
    const [artist, setArtist] = useState({})
    const [playlist, setPlaylist] = useState({})
    useEffect(() => {
        getBeats(route, id).then(resp => setBeats(resp.data))
        if(route === "artist")
            getArtist(id).then(resp => setArtist(resp.data))
        else
            getPlaylist(id).then(resp => setPlaylist(resp.data))
    }, [])
    return (
        <div className='flex flex-col p-36 space-y-8' >
            <div className='flex justify-center space-x-8' >
                <SearchBar />
                <div>
                    <PillButton color={"p"} >Search</PillButton>
                </div>
            </div>
            <div className='mx-auto flex flex-col space-y-8' >
                <div className="flex space-x-8" >
                    {
                        route === "artist" ? (
                            <ArtistCard img={artist.img} title={artist.name} s />
                        ) : (
                            <PlaylistCard img={playlist.img} title={playlist.name} s />
                        )
                    }
                </div>
            </div>
            <BeatsList beats={beats} />
        </div>
    );
}

export default BeatsPage;