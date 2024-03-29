import mongoose from "mongoose"
const {Schema, model} = mongoose

const GenreSchema = new Schema({
    genre: {type: String, required: true}
})

export default model("Genre", GenreSchema)