javascript:(function () {     var script =  document.createElement('script');    script.src="//cdn.jsdelivr.net/npm/eruda";     document.body.appendChild(script);    script.onload = function () {         eruda.init()     } })();



const socket = io("/")

var peer = new Peer(undefined,{
    host:"https://myzoomtest.herokuapp.com/",
    port:PORT,
    path: "/peerjs",
});
console.log(peer)

var peers = {}

let videoDiv = document.getElementById("video_div")

let video = document.createElement("video")
video.muted = true

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{

    addVideo(video, stream)
    
    peer.on("call",(call)=>{

            call.answer(stream); // Answer the call with an A/V stream.
            let myvideo = document.createElement("video")
            
            call.on("stream",(userVideo)=>{
                addVideo(myvideo,userVideo)
            })
            
    })
    socket.emit("ready")
   
    socket.on("connect_room",userId=>{
        
        sendVideo(userId, stream)
    })
    
    
})

socket.on("close",(user)=>{
    peers[user].close()
})

peer.on("open",id=>{
    socket.emit("join-room",room,id)
})




function addVideo(video, stream){
    video.srcObject= stream
    video.addEventListener("loadedmetadata",(e)=>{
        video.play()
    })
    videoDiv.appendChild(video)
}

function sendVideo(userId, stream) {
    
    let video = document.createElement("video")
    const call = peer.call(userId,stream)
    
    call.on("stream",(otherStream)=>{
        
        addVideo(video, otherStream)
    })
    
    call.on("close",()=>{
        video.remove()
    })
    peers[userId] = call
    
}

