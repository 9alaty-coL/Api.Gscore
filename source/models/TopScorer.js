const mongoose = require('mongoose')
const {Schema} = mongoose

const TopScorer = new Schema({
    leagueId: String,
    data: Object,
})

const topScorer = mongoose.model('TopScorer' ,TopScorer)

module.exports = topScorer