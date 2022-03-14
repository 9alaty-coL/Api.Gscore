const LeaderBoard = require('../models/LeagueStanding')
const axios = require('axios')

class homeController{
    home(req,res,next){
        res.send('hello')
    }

    async leaderBoard(req, res, next){

        try {
            const realtimeData = await axios({
                url: `https://api.football-data.org/v2/competitions/${req.params.leagueId}/standings`,
                headers: {
                    'X-Auth-Token': process.env.API_TOKEN,
                }
            })

            await LeaderBoard.updateOne({leagueId: `${req.params.leagueId}`}, {
                data: realtimeData.data,
            })
        } catch (error) {
            console.log(error.message)
        }

        const data = await LeaderBoard.findOne({
            leagueId: req.params.leagueId,
        })
        
        // const response = await JSON.parse(data)

        return res.json(data.data)
    }
}

module.exports = new homeController()