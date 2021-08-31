var file=null
const socket=io('http://localhost:8000')
$(document).ready(()=>{
    var id=Math.random().toString().slice(2,11);
    console.log("i am ready");
    $("#user").text(id)
    
    socket.emit('user-join',id)
    $("#send").click(()=>{
        socket.emit('chat',{msg:$("#message").val(),id:$("#id").val()})
    })
    $('#sendfile').on("change",(e)=>{
        console.log(e.target.files[0])
        file=e.target.files[0]
        if (file) {
            //read the file content and prepare to send it
            var reader = new FileReader();
    
            reader.onload = function(e) {
                console.log('Sending file...');
                //get all content
                var buffer = e.target.result;
                //send the content via socket
                socket.emit('send-file', buffer,{msg:file.name,id:$("#id").val()});
            };
            reader.readAsBinaryString(file);
        }
    })
    socket.on('received',(e)=>{  
          $("#chat").append( `<div>user:${e.user}   message:${e.message.msg} </div>`)
    })
    socket.on('received-file',(e)=>{  
        var type=typeof(e.buffer)
        $("#chat").append( `<div>user:${e.user}   message:${e.message.msg} type:${type} </div>`)
  })
})

