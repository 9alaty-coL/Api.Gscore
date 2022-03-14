const LeaderBoard = require('../models/LeagueStanding')
const TopScorer = require('../models/TopScorer')
const axios = require('axios')
const express = require('express')

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
            console.log(error.response.status)
            if (error.response.status != 429){
                return res.json({
                    error: {
                        status: error.response.status,
                        message: error.message,
                    }
                })
            }
        }

        const data = await LeaderBoard.findOne({
            leagueId: req.params.leagueId,
        })
        
        // const response = await JSON.parse(data)

        return res.json(data.data)
    }

    async topScorer(req, res, next) {
        try {
            const realtimeData = await axios({
                url: `https://api.football-data.org/v2/competitions/${req.params.leagueId}/scorers`,
                headers: {
                    'X-Auth-Token': process.env.API_TOKEN,
                }
            })

            await TopScorer.updateOne({leagueId: `${req.params.leagueId}`}, {
                data: realtimeData.data,
            })
        } catch (error) {
            console.log(error.response.status)
            if (error.response.status !== 429){
                return res.json({
                    error: {
                        status: error.response.status,
                        message: error.message,
                    }
                })
            }
        }

        const data = await TopScorer.findOne({
            leagueId: req.params.leagueId,
        })
        
        // const response = await JSON.parse(data)

        return res.json(data.data)
    }
}

module.exports = new homeController()