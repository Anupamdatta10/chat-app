const io=require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
var user={}

io.on("connection",(socket)=>{
    socket.on("user-join",(id)=>{
        //console.log(socket.id)
        var socketid=socket.id 
        user[socketid]=id
        console.log(user)
    })
    
    socket.once('disconnect', function (e) {
        console.log('disconnected'+socket.id)
        
        var id=socket.id.toString()
        const { [id]: remove, ...rest } = user;
       // delete user.id
        user=rest
        console.log(user)
      });
    socket.on('chat',(message)=>{
        socket.to(getKeyByValue(user,message.id)).emit('received',{message:message,user:user[socket.id]})
    })
})

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] == value);
  }