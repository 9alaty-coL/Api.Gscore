const mongoose = require('mongoose')
const {Schema} = mongoose

const Team = new Schema({
    leagueId: String,
    data: Object,
})

const team = mongoose.model('Team' ,Team)

module.exports = team
