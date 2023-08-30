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