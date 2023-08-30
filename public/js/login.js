document.getElementById('loginbtn').addEventListener('click',function(){
    const loginDetails = {
        loginEmail: loginEmail.value,
        loginPassword: loginPassword.value,
    };
 axios.post("http://localhost:3000/post/getUser", loginDetails)
.then((result) => {
  console.log(result);
  alert('User LogIn Successfully');
  localStorage.setItem("token", result.data.token);
  window.location.href ='/chat/application';
})
.catch((error) => {
  if (error.response) {
    const errorMessage = error.response.data.message;
    alert(errorMessage);
  } else {
    alert("An error occurred. Please try again later.");
  };
})
})
/*  const messageContainer = document.getElementById("messageContainer");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");

    sendButton.addEventListener("click", function() {
      const messageText = messageInput.value.trim();
      if (messageText !== "") {
        const messageBlock = document.createElement("div");
        messageBlock.className = "message-block other-message";
        messageBlock.textContent = messageText;

        messageContainer.appendChild(messageBlock);
        messageInput.value = ""; 
      }
    });*/