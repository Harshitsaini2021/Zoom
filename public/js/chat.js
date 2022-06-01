let socket = io()
var userId = ""
var room = ""
let form = document.getElementById("form")
let mydiv = document.getElementsByClassName("msgbox")[0]


function addMsg(msg,type) {
    let div = document.createElement("div")
    if(type==="me") {
       div.classList.add("msg-me") 
    }else {
        div.classList.add("msg-other")
    }
    
    div.innerText = msg
    mydiv.appendChild(div)
}

form.addEventListener("submit",(e)=> {
    e.preventDefault()
})

document.getElementById("send").addEventListener("click",(e)=>{
    e.preventDefault()
    let input = document.getElementById("send_input")
   let inputRoom = document.getElementById("join_input")
    let massage = input.value
    if (massage !== '') {
        addMsg(massage,"me")
        room = inputRoom.value
        socket.emit("send", massage,room)
    }
    input.value = ""
    
    
})

document.getElementById("join").addEventListener("click",(e)=>{
    e.preventDefault()
    let input = document.getElementById("join_input")
    room = input.value
    socket.emit("join",room)
})

socket.on("userid",id=>{
    addMsg(`New User Id: ${id}`)
})

socket.on("receive",msg=>{
    addMsg(msg,"other")
})

