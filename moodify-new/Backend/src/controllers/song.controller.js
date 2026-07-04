const songModel = require("../models/song.model")
const storageService = require("../services/storage.service")
const id3 = require("node-id3")
const fs = require("fs")
const path = require("path")

const fallbackSongs = {
    happy: {
        url: "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/songs/Lady_Singham_gs01DFz-1.mp3",
        posterUrl: "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/posters/Lady_Singham_VW8DGJkie.jpeg",
        title: "Lady Singham",
        mood: "happy",
    },
    sad: {
        url: "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/songs/Lady_Singham_gs01DFz-1.mp3",
        posterUrl: "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/posters/Lady_Singham_VW8DGJkie.jpeg",
        title: "Lady Singham",
        mood: "sad",
    },
    surprised: {
        url: "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/songs/Lady_Singham_gs01DFz-1.mp3",
        posterUrl: "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/posters/Lady_Singham_VW8DGJkie.jpeg",
        title: "Lady Singham",
        mood: "surprised",
    },
}

function getSongsFromMarkdown(mood) {
    const songsPath = path.join(__dirname, "../../../songs.md")
    const markdown = fs.readFileSync(songsPath, "utf-8")
    const songs = []
    let currentMood = null

    markdown.split(/\r?\n/).forEach((line) => {
        const heading = line.match(/^##\s+(.+)$/)

        if (heading) {
            currentMood = heading[ 1 ].trim().toLowerCase()
            return
        }

        const song = line.match(/^-\s+\[(.+?)\]\((.+?)\)\s*(?:\|\s*poster:\s*(.+))?$/)

        if (song && currentMood === mood) {
            songs.push({
                title: song[ 1 ].trim(),
                url: song[ 2 ].trim(),
                posterUrl: song[ 3 ]?.trim() || fallbackSongs[ mood ]?.posterUrl || fallbackSongs.happy.posterUrl,
                mood,
            })
        }
    })

    return songs
}


async function uploadSong(req, res) {

    const songBuffer = req.file.buffer
    const { mood } = req.body

    const tags = id3.read(songBuffer)

    const [ songFile, posterFile ] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    res.status(201).json({
        message: "song created successfully",
        song
    })

}

async function getSong(req, res) {

    const mood = req.query.mood?.toLowerCase()
    const markdownSongs = getSongsFromMarkdown(mood)
    const songs = [ ...markdownSongs ]

    try {
        const databaseSong = await songModel.findOne({
            mood,
        })

        if (databaseSong) {
            songs.push(databaseSong)
        }
    } catch (err) {
        console.error(err)
    }

    if (songs.length === 0) {
        songs.push(fallbackSongs[ mood ] || fallbackSongs.happy)
    }

    res.status(200).json({
        message: "songs fetched successfully.",
        song: songs[ 0 ],
        songs,
    })

}


module.exports = { uploadSong, getSong }
