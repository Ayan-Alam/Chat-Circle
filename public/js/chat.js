const sendButton = document.getElementById("sendButton");
document.addEventListener('DOMContentLoaded',async function(){
    try{
    const messageContainer = document.getElementById("messageContainer");
    const token = localStorage.getItem("token");
    const response = await axios.get('http://localhost:3000/chat/getMsg',{ headers : { Authorization : token }});
    response.data.forEach((e) => {
    const messageText = e.msg;
      if (messageText !== "") {
        const messageBlock = document.createElement("div");
        messageBlock.className = "message-block other-message";
        messageBlock.textContent = messageText;
        messageContainer.appendChild(messageBlock);
        messageInput.value = ""; 
      }
    });
    } catch (err){
        console.log(err);
    }
})

document.getElementById('sendButton').addEventListener('click',async function(){
    try{
   const token = localStorage.getItem("token");
   const message = messageInput.value;
   const response =  await axios.post('http://localhost:3000/chat/addMsg',{message:message},{ headers: { Authorization: token } });
   console.log(response.data);
    } catch (err){
        console.log(err);
    }  
})