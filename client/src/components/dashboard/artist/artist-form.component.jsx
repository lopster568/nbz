import { useState } from "react";
import { getGenres } from "../../../api/genres";
import { createArtist, getArtists } from "../../../api/artists";
import images from "../../../utils/image-links";
import Button from "../../button/button.component";
import SearchBar from "../../searchbar/searchbar.component";
import Tile from "../../tiles/tiles.component";
import FileBase64 from 'react-file-base64';

const ArtistForm = () => {
    const [genres, setGenres] = useState([])
    const [artists, setArtists] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        img: "",
    })
    const [genreId, setGenreId] = useState("")
    useState(() => {
        getGenres(5).then(resp => setGenres(resp.data))
        getArtists(5).then(resp => setArtists(resp.data))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({... formData, genreId})
        // createArtist(formData).then(resp => console.log(resp))
    }


    return (
        <div>
            <div className="bg-center bg-cover w-full flex justify-around items-center" style={{ backgroundImage: `url(${images.cartBG})` }} >
                <div className='px-4 py-48 flex space-x-12 items-center' >
                    <h1 className='lg:text-8xl text-6xl text-white uppercase font-Kizard' >Create Artist</h1>
                </div>
            </div>
            <div className='mx-auto p-8 flex flex-col space-y-8' >
                <div className="flex flex-col space-y-8" >
                    <h2 className="text-white text-4xl">Existing Artists</h2>
                    <SearchBar ph={"Search Artists"} />
                    <div className="flex flex-col space-y-8 lg:flex-row">
                        {
                            artists.map(e => (
                                <Tile title={e.name} key={e._id} s />
                            ))
                        }
                    </div>
                </div>
                <h2 className="text-white text-4xl">Create Artist</h2>
                <form onSubmit={handleSubmit} className="bg-p w-full mx-auto p-8 px-8 rounded-lg" >
                    <div className="max-w-[400px]">
                        <div>
                            <label className="flex flex-col text-gray:400 py-2">Artist Name</label>
                            <input required onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name} placeholder="Name" className="rounded-lg w-full bg-white mt-2 p-2 focus:border-blue focus:bg-bg focus:outline-none focus:text-white" />
                        </div>
                        <div>
                            <label className="flex flex-col text-gray:400 py-2">Artist Image</label>
                            <FileBase64
                                multiple={false}
                                onDone={({ base64 }) => setFormData({ ...formData, img: base64 })} />
                        </div>
                    </div>
                    <div className="py-2" >
                        <label>Artist Genre</label>
                        <div className="flex flex-col text-gray:400 space-y-8 pt-4">
                            <SearchBar ph="Search Genre" />
                            <div className="flex flex-col space-y-8 lg:flex-row" >
                                {
                                    genres.map(e => (
                                        <Tile title={e.genre} key={e._id} s handler={setGenreId} data={e._id} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-4" >
                        <Button color="a" handleClick={(e) => handleSubmit(e)} >Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ArtistForm;