const mongoose = require('mongoose')
const {Schema} = mongoose

const Match = new Schema({
    leagueId: String,
    season: Number,
    currenMatchday: Number,
    matches: Object,
})

const match = mongoose.model('match', Match)

module.exports = match