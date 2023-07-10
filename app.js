const express = require("express");
const TelegramBot = require("node-telegram-bot-api")
const cors = require("cors");
const bodyParser = require("body-parser");
const { error } = require("console");
const path = require("path")
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
const PORT = 3001;
const TOKEN = "5933197402:AAGhoImd2iKwkmoSxmuAMdcIjx5i6Cbd3h4";
const bot = new TelegramBot(TOKEN, {polling: true});

bot.on("message", (msg)=>{
    const chatId = msg.chat.id;
    const messageText = msg.text;
    bot.sendMessage(1269259342, messageText)
})

app.post("/send-message", (req, res)=>{
    const {message} = req.body;
    if(!message){
        return res.status(400).json({error: "Повідомлення не вказано"})
    }
    bot.sendMessage(1269259342, message)
    .then(()=>{
        res.status("Повідомлення відправлено до бота")
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({error: "Помилка при відпривленні повідомлення"})
    })
})

app.listen(PORT, ()=>{
    console.log(`Server work on port ${PORT}`)
})