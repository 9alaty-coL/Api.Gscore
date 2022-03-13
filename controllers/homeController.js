class homeController{
    home(req,res,next){
        res.send('hello')
    }
}

module.exports = new homeController()