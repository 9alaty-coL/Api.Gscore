const LeaderBoard = require("../models/LeagueStanding");
const TopScorer = require("../models/TopScorer");
const Match = require("../models/Match");
const axios = require("axios");
const express = require("express");

class homeController {
  home(req, res, next) {
    res.send("hello");
  }

  async leaderBoard(req, res, next) {
    try {
      const realtimeData = await axios({
        url: `https://api.football-data.org/v2/competitions/${req.params.leagueId}/standings`,
        headers: {
          "X-Auth-Token": process.env.API_TOKEN,
        },
      });

      await LeaderBoard.updateOne(
        { leagueId: `${req.params.leagueId}` },
        {
          data: realtimeData.data,
        },
        { upsert: true, setDefaultsOnInsert: true }
      );
    } catch (error) {
      // console.log(error.response.status);
      if (error.response.status != 429) {
        return res.json({
          error: {
            status: error.response.status,
            message: error.message,
          },
        });
      }
    }

    const data = await LeaderBoard.findOne({
      leagueId: req.params.leagueId,
    });

    // const response = await JSON.parse(data)

    return res.json(data?.data);
  }

  async topScorer(req, res, next) {
    try {
      const realtimeData = await axios({
        url: `https://api.football-data.org/v2/competitions/${req.params.leagueId}/scorers`,
        headers: {
          "X-Auth-Token": process.env.API_TOKEN,
        },
      });

      await TopScorer.updateOne(
        { leagueId: `${req.params.leagueId}` },
        {
          data: realtimeData.data,
        },
        { upsert: true, setDefaultsOnInsert: true }
      );
    } catch (error) {
      // console.log(error.response.status);
      if (error.response.status !== 429) {
        return res.json({
          error: {
            status: error.response.status,
            message: error.message,
          },
        });
      }
    }

    const data = await TopScorer.findOne({
      leagueId: req.params.leagueId,
    });

    // const response = await JSON.parse(data)
    
    return res.json(data.data);
  }
  
  async match(req, res, next) {
    const season = req.query.season ?? 2021;
    const teamData = await LeaderBoard.findOne({leagueId: req.params.leagueId,})
    
    const getUrl = (id) => {
      if (teamData) {
        return teamData.data.standings[0].table.find(
          (value) => value.team.id === id
        ).team.crestUrl;
      }
      return null;
    };
    if (req.query.matchday) {
      try {
        const data = await Match.findOne({
          leagueId: req.params.leagueId,
          season: +season,
        });
        const matches = data.matches;
        // res.json(data)
        const response = matches.filter(
          (value) =>
            value.matchday == req.query.matchday ||
            value.matchday == req.query.matchday + 1
        );
        // console.log(matches[0])
        response.forEach(
          (value) => (value.homeTeam.crestUrl = getUrl(value.homeTeam.id))
        );
        response.forEach(
          (value) => (value.awayTeam.crestUrl = getUrl(value.awayTeam.id))
        );
        return res.json(response);
      } catch (error) {
        return res.json(error.message);
      }
    }

    try {
      const realtimeData = await axios({
        url: `https://api.football-data.org/v2/competitions/${req.params.leagueId}/matches`,
        headers: {
          "X-Auth-Token": process.env.API_TOKEN,
        },
      });
  
      await Match.updateOne(
        { leagueId: req.params.leagueId, season: season },
        {
          season: season,
          matches: realtimeData.data.matches,
          currenMatchday: realtimeData.data.matches[0].currentMatchday,
        },
        { upsert: true, setDefaultsOnInsert: true }
      );
    } catch (error) {
      // console.log(error.response.status);
      if (error.response.status != 429) {
        return res.json({
          error: {
            status: error.response.status,
            message: error.message,
          },
        });
      }
    }



    const data = await Match.findOne({ leagueId: req.params.leagueId });
    const matchday = data.matches[0].season.currentMatchday;
    const matches = data.matches;
    const response = matches.filter(
      (value) => value.matchday == matchday || value.matchday == matchday + 1
    );
    response.forEach(
      (value) => (value.homeTeam.crestUrl = getUrl(value.homeTeam.id))
    );
    response.forEach(
      (value) => (value.awayTeam.crestUrl = getUrl(value.awayTeam.id))
    );

    return res.json(response);
  }
}

module.exports = new homeController();
