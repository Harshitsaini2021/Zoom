let socket = io()
let data=""

socket.on("hello",(reply)=> {
   data = reply
})
document.addEventListener("click",e=>{
    socket.emit("reply","happy")
})



