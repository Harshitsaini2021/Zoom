const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require('path');
const app = express();
const { ExpressPeerServer } = require('peer');

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const {v4:uuidV4} = require("uuid")
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
    
 
app.get('/', (req, res) => {
    res.redirect(`/peer/${uuidV4()}`)
  //res.render('index');
})

app.get("/peer/:id",(req,res) =>{
    res.render("zoom",{room:req.params.id,PORT})
})

app.get("/ludo",(req, res)=>{
    res.render('ludo')
})

app.get("/zoom",(req,res)=>{
    res.render("zoom")
})

io.on("connection", (socket) => {
    
    io.emit("userid",socket.id)
    
    
    
    socket.on("join-room",(roomId,userId)=>{
        console.log(roomId,userId)
        socket.join(roomId)
        socket.on("ready",()=>{
            socket.to(roomId).emit("connect_room",userId)
        })
        socket.on("disconnection",()=>{
            socket.broadcast.emit("close",userId)
        })
        
    })
    
    socket.on("join",room=>{
        console.log(room)
        socket.join(room)
    })
    
    socket.on("send",(msg,room)=>{
      if(room==="") {
         socket.broadcast.emit("receive",msg) 
      }else {
         socket.to(room).emit("receive",msg)
      }    
    })
    
});



app.use(express.static(__dirname + '/public'));

let s = httpServer.listen(PORT);

const peerServer = ExpressPeerServer(s, {
  debug: true,
  allow_discovery: true,
});

app.use('/peerjs', peerServer);
