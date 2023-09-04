const sendButton = document.getElementById("sendButton");

function decodeToken(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

async function getMessage(){
  const messageContainer = document.getElementById("messageContainer");
  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);
  const userId = decodedToken.userId;
  const response = await axios.get(`http://localhost:3000/chat/getMsg`,{ headers : { Authorization : token }});
  response.data.forEach((e) => {
  const messageText = e.message;
    if (messageText !== "") {
      const newRow = `
      <li class="clearfix">
      <div class="message-data text-left">
          <span class="message-data-time">${e.name}</span>
      </div>
      <div class="message my-message">${messageText}</div>
          `;
        messageContainer.insertAdjacentHTML("beforeend", newRow);
      }
    });
}

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

document.addEventListener('DOMContentLoaded',getMessage);