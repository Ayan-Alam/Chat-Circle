const messageContainer = document.getElementById("messageContainer");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

document.getElementById('sendButton').addEventListener('click',async function(){
    try{
   const token = localStorage.getItem("token");
   const message = messageInput.value;
   const response =  await axios.post('http://localhost:3000/chat/msg',{message:message},{ headers: { Authorization: token } });
   console.log(response.data);
    } catch (err){
        console.log(err);
    }  
})