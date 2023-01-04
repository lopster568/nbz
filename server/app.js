// IMPORTS----------------------------------------------------------------
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import Playlist from "./models/playlist.js"
import fetch from 'node-fetch'
// ROUTE IMPORTS----------------------------------------------------------
import userRoutes from './routes/auth/user.js'
import beatRoutes from './routes/beats/beat.js'
import artistRoutes from './routes/artists/artist.js'
import playlistRoutes from './routes/playlists/playlist.js'
import genreRoutes from './routes/genres/genre.js'
import orderRoutes from './routes/orders/order.js'
import tagRoutes from './routes/tags/tags.js'
import authRoutes from './routes/auth/user.js'

// CONFIGURATION----------------------------------------------------------
const app = express()
app.set("view engine", "ejs")
// allow cross-origin requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(cors())
const URL = 'mongodb+srv://admin:admin@nashak-beats.oxfxxgk.mongodb.net/?retryWrites=true&w=majority'
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(bodyParser.json());

// SERVER-----------------------------------------------------------------
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        app.listen(process.env.PORT || "8000", () => {
            console.log("database connected & server started")
        })
        return
    }
    console.log(err)
})

// ROUTES-----------------------------------------------------------------
app.use('/api/users', userRoutes)
app.use('/api/beats', beatRoutes)
app.use('/api/artists', artistRoutes)
app.use('/api/genres', genreRoutes)
app.use('/api/ordes', orderRoutes)
app.use('/api/playlists', playlistRoutes)
app.use('/api/tags', tagRoutes)
app.use('/auth/', authRoutes)
