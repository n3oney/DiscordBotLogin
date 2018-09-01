Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
const config = require('./token.json')
let selectedChannel = "0"
global.Discord = require('discord.js');
global.client = new Discord.Client();
const remote = require('electron').remote;

function send() {
client.channels.get(selectedChannel).send(document.getElementById('aa').value)
document.getElementById('aa').value = ""
}

client.on("message", async message => {
  if(message.channel.id !== selectedChannel) return;
  let text = document.createElement("div")
  let content = document.createTextNode(message.content)
  text.appendChild(content)
  var end = document.getElementById("end")
  document.getElementById("msgs").insertBefore(text, end)
    window.scrollTo(0,document.body.scrollHeight);
})

function loadGuilds() {
    client.login(config.token)
    client.on("ready", () => {
      client.guilds.forEach(guild => {
        const sidenav = document.getElementById("sidenav")
        let guildLink = document.createElement("a")
        guildLink.addEventListener( 'click', function(){
          document.getElementById("sidenav2").childNodes.remove()
          client.guilds.get(guild.id).channels.filter(channel => channel.type == "text").forEach(channel => {
          const sidenav = document.getElementById("sidenav2")
          let channelLink = document.createElement("a")
          channelLink.addEventListener( 'click', function(){
            document.getElementById("msgs").childNodes.remove()
            let newEnd = document.createElement("div")
            newEnd.id = "end"
            document.getElementById("msgs").appendChild(newEnd)
              let arr = []
              selectedChannel = channel.id
              client.channels.get(channel.id).fetchMessages({limit: 100}).then(messages => {messages.forEach(msg => {
                arr.push(msg.content)
                console.log(arr)
              })
            arr.reverse()
            console.log(arr)
            arr.forEach(cnt => {
              console.log("tryna page")
            let text = document.createElement("div")
            let content = document.createTextNode(cnt)
            text.appendChild(content)
            var end = document.getElementById("end")
            document.getElementById("msgs").insertBefore(text, end)
            console.log("paged")
            })
            window.scrollTo(0,document.body.scrollHeight);
            })
          })
          let content = document.createTextNode(channel.name)
          channelLink.appendChild(content)
          sidenav.appendChild(channelLink)
          })
} );
        let content = document.createTextNode(guild.name)
        guildLink.appendChild(content)
        sidenav.appendChild(guildLink)
      })
    })
}

function loadChannels(channelId) {
  client.guilds.get(channelId).channels.forEach(channel => {
  const sidenav = document.getElementById("sidenav2")
  let channelLink = document.createElement("a")
  let content = document.createTextNode(channel.name)
  channelLink.appendChild(content)
  sidenav.appendChild(channelLink)
  })
}

function loadMessages() {
  document.getElementById("msgs").childNodes.remove()
  let newEnd = document.createElement("div")
  newEnd.id = "end"
  document.getElementById("msgs").appendChild(newEnd)
    let arr = []
    client.channels.get("464947020843712533").fetchMessages({limit: 100}).then(messages => {messages.forEach(msg => {
      arr.push(msg.content)
      console.log(arr)
    })
  arr.reverse()
  console.log(arr)
  arr.forEach(cnt => {
    console.log("tryna page")
  let text = document.createElement("div")
  let content = document.createTextNode(cnt)
  text.appendChild(content)
  var end = document.getElementById("end")
  document.getElementById("msgs").insertBefore(text, end)
  console.log("paged")
  })
  window.scrollTo(0,document.body.scrollHeight);
})
}
