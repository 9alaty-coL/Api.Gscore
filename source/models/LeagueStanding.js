const mongoose = require('mongoose')
const {Schema} = mongoose

const leagueStanding = new Schema({
    leagueId: String,
    season: Number,
    data: Object,
})

const LeaderBoad = mongoose.model('LeaderBoard', leagueStanding)

module.exports = LeaderBoad