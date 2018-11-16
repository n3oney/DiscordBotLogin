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
  let name = document.createElement("span")
  name.className = "name"
  let namee = document.createTextNode(message.author.username)
  name.appendChild(namee)
  name.style.color = message.member.highestRole.hexColor;
  let content = document.createElement("div")
  content.className = "text";
  let content2 = document.createTextNode(message.content)
  content.appendChild(content2)
  let avatar = document.createElement("img");
  avatar.height = "50"
  avatar.width = "50"
  avatar.src = (!message.author.avatarURL) ? 'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png' : message.author.avatarURL
  text.appendChild(avatar)
  text.addEventListener('click', function(){
    const pole = document.getElementById("aa")
    pole.value = pole.value + "<@" + message.author.id + ">"
  })
    text.appendChild(name)
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

          document.getElementById("users").childNodes.remove()
          client.guilds.get(guild.id).members.forEach(member => {
          let usersy = document.getElementById("users")
          let userr = document.createElement("a")
          let name = document.createTextNode(member.displayName)
          userr.addEventListener('click', function(){
            const pole = document.getElementById("aa")
            pole.value = pole.value + "<@" + member.id + ">"
          })
          userr.appendChild(name)
          usersy.appendChild(userr)
        })
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
                arr.push(msg)
              })
            arr.reverse()
            arr.forEach(cnt => {
              let text = document.createElement("div")
              let name = document.createElement("span")
              name.className = "name"
              let namee = document.createTextNode(cnt.author.username)
              name.style.color = cnt.member.highestRole.hexColor;
              name.appendChild(namee)
              let content = document.createElement("div")
              content.className = "text";
              let content2 = document.createTextNode(cnt.content)
              content.appendChild(content2)
              let avatar = document.createElement("img");
            avatar.src = (!cnt.author.avatarURL) ? 'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png' : cnt.author.avatarURL
            avatar.height = "50"
            avatar.width = "50"
            text.appendChild(avatar)
            text.addEventListener('click', function(){
              const pole = document.getElementById("aa")
              pole.value = pole.value + "<@" + cnt.author.id + ">"
            })
            text.appendChild(name)
            text.appendChild(content)
            var end = document.getElementById("end")
            document.getElementById("msgs").insertBefore(text, end)
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
        let av = document.createElement("img")
        av.src = (!guild.iconURL) ? 'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png' : guild.iconURL
        av.height = "100"
        av.width = "100"
        guildLink.appendChild(av)
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
  content.className = "text";
  text.appendChild(content)
  var end = document.getElementById("end")
  document.getElementById("msgs").insertBefore(text, end)
  console.log("paged")
  })
  window.scrollTo(0,document.body.scrollHeight);
})
}
