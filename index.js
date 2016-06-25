'use strict'
const http = require('http')
const Bot = require('messenger-bot')


let pagesToken  = require("./credentials.json")
console.log(pagesToken.token)

let bot = new Bot({
  token: pagesToken.token,
  verify: 'VERIFY_TOKEN'
})

bot.on('error', (err) => {
  console.log(err.message)
})

var statusPD;


//bot.sendMessage()
bot.on('message', (payload, reply) => {

//let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err
console.log(profile)
    
    if (payload.message.text === "Yes") {

      reply({ text: "Delivery or Pickup?" }, (err) => {
        if (err) throw err
        //console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
        statusPD = payload.message.text
        console.log(statusPD)
      })


    } else {
   reply({ text: "Did you mean?" }, (err) => {
        if (err) throw err
        //console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
        
      })


    }
  })
})

http.createServer(bot.middleware()).listen(3000)

console.log("server running on port 3000");
