const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));
const apps = require('./play-store.js');

app.get('/apps', (req, res) => {
    const { genres, sort } = req.query;
    
    
    let genreParams = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
    let lowerParam = genreParams.map(e => e.toLowerCase())
    
    if(genres) {
        let userGenre = genres.toLowerCase()
        if(!lowerParam.includes(userGenre) || genres.length === 0) {
            return res
                    .status(400)
                    .send('Genres must be one of the parameter values listed')
        } else {
            let results = apps.filter(app => app.Genres.toLowerCase().includes(genres.toLowerCase()))

            return res
                .json(results)
        }
    }

   
    let sortParams = ['rating', 'app'];
    

    if(sort) {
        let sortVal = sort.toLowerCase()
        if(!sortParams.includes(sortVal)) {
            return res
                    .status(400)
                    .send('Sort must be one of the params listed')
        } else {
            let results = apps.sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            })
            return res.json(results)
        }
    }


    res
        .json(apps)
})

app.listen(8000, () => {
    console.log('server running on port 8000')
})