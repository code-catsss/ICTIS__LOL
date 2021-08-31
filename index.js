const express = require('express');
const mongoose = require('mongoose');

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/profile', require('./routes/profile.route'))
app.use('/api/news', require('./routes/news.route'))
app.use('/api/test', require('./routes/test.route'))
app.use('/api/directions', require('./routes/directions.route'))

if (process.env.NODE_ENV === "production"){
    app.use(express.static("build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname,  "build", "index.html"));
    });
}

async function start(){
    try {
        await mongoose.connect('mongodb+srv://kingofsweets:52868866@cluster0.h3yh8.mongodb.net/VISARIUM?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        })

        app.listen(PORT, ()=> {
            console.log('СТАРТ ЕБАТЬ');
        })

    } catch (error) {
        console.error(error);
    }
}

start()