
const socket=io('http://localhost:8000')
$(document).ready(()=>{
    var id=Math.random().toString().slice(2,11);
    console.log("i am ready");
    $("#user").text(id)
    
    socket.emit('user-join',id)
    $("#send").click(()=>{
        socket.emit('chat',{msg:$("#message").val(),id:$("#id").val()})
    })


    socket.on('received',(e)=>{
            
          $("#chat").append( `<div>user:${e.user}   message:${e.message.msg} </div>`)
        
        
    })
})

