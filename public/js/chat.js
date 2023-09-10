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

async function getMessage(grpName){
  const messageContainer = document.getElementById("messageContainer");
  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);
  const userId = decodedToken.userId;
  messageContainer.innerHTML = "";
  const response = await axios.get(`http://localhost:3000/chat/getMsg/${grpName}`,{ headers : { Authorization : token }});
  response.data.forEach((e) => {
  const messageText = e.message;
    if (messageText !== "") {
      if(userId === e.userId){
      const newRow = `
      <li class="clearfix">
      <div class="message-data text-left">
          <span class="message-data-time">${e.name}</span>
      </div>
      <div class="message my-message float-left">${messageText}</div>
      </li>
          `;
        messageContainer.insertAdjacentHTML("beforeend", newRow);
      }else {
        const newRow = `
        <li class="clearfix">
        <div class="message-data text-right">
            <span class="message-data-time">${e.name}</span>
        </div>
        <div class="message other-message float-right">${messageText}</div>
        </li>`;
        messageContainer.insertAdjacentHTML("beforeend", newRow);
      }
    }
    });
}

async function getGrp(){
  try{
    const grps = document.getElementById('grps');
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/grp/getGrp", {
      headers: { Authorization: token },
    });
    grps.innerHTML = "";
    response.data.groups.forEach((e) => {
        if (e.name !== "") {
          const newRow = `
          <li class="clearfix">
          <div class="about">
              <div class="name"><h3>${e.name}</h3></div>
          </div>
      </li>
          `;
              grps.insertAdjacentHTML("beforeend",newRow);
          }
        });
        grpList();     
  }catch(err){
    console.log(err);
  }
}

async function createGrp(){
  try{
    const token = localStorage.getItem("token");
    const name = document.getElementById('inputField').value;
    await axios.post('http://localhost:3000/grp/createGrp',{name:name},{headers: { Authorization: token }});
    alert(`${name} Created Successfully!`);
    window.location.reload();
  }catch(err){
    console.log(err);
  }
}

document.getElementById('sendButton').addEventListener('click',async function(){
    try{
   const grp = document.getElementById('grp');
   if(grp.innerHTML === 'Group'){
    alert('Select a Group');
   }else {
   const token = localStorage.getItem("token");
   const message = messageInput.value;
   const response =  await axios.post('http://localhost:3000/chat/addMsg',{message:message,grp : grp.innerHTML},{ headers: { Authorization: token } });
   console.log(response.data);
   }
    } catch (err){
        console.log(err);
    }  
})

async function grpList(){
  const list = document.getElementById('grps');
  const grp = document.getElementById('grp');
  list.querySelectorAll("li").forEach((item,index)=>{
    item.addEventListener("click",()=>{
      const nameElement = item.querySelector(".name");
      if (nameElement) {
        const itemName = nameElement.textContent;
        grp.innerHTML = `${itemName}`;
        getMessage(itemName);
      }
    })
  })
}

async function addGrp(){
  const token = localStorage.getItem("token");
  const grpName = document.getElementById('addinputField').value;
  const member = document.getElementById('addnameField').value;
  const response = await axios.post('http://localhost:3000/grp/addGrp',{
    grpName : grpName,
    member : member
  },
  {
    headers: { Authorization: token },
  })
  alert(response.data.message);
}

function logout() {
  localStorage.clear();
  window.location.href = "http://localhost:3000/login";
}

async function deleteGrp(){
  const token = localStorage.getItem("token");
  const grpName = document.getElementById('inputsField').value;
  const member = document.getElementById('namesField').value;
  const response = await axios.post('http://localhost:3000/grp/deleteGrp',{
    grpName : grpName,
    member : member
  },
  {
    headers: { Authorization: token },
  })
  alert(response.data.message);
}

async function getMember(){
  const token = localStorage.getItem("token");
  const members = document.getElementById('listMember');
  const grpName = document.getElementById('grp').textContent;
  members.innerHTML = "";
  const response = await axios.get(`http://localhost:3000/grp/getMember/${grpName}`,{headers: { Authorization: token }});
  response.data.users.forEach((e) => {
      const newRow = `
      <tr>
          <td>${e.name}</td>
      </tr>
      `;
      members.insertAdjacentHTML("beforeend",newRow);
      }
    );
}

async function addAdmin(){
  const token = localStorage.getItem("token");
  const grpName = document.getElementById('admininputField').value;
  const member = document.getElementById('adminnameField').value; 
  const response = await axios.post('http://localhost:3000/admin/addAdmin',
  {
    grpName: grpName,
    member : member 
  },
  {
    headers: { Authorization: token },
  })
  alert(response.data.message);
}

async function removeAdmin(){
  const token = localStorage.getItem("token");
  const grpName = document.getElementById('removeinputField').value;
  const member = document.getElementById('remvoenameField').value; 
  const response = await axios.post('http://localhost:3000/admin/removeAdmin',
  {
    grpName: grpName,
    member : member 
  },
  {
    headers: { Authorization: token },
  })
  alert(response.data.message);
}

document.getElementById('add').addEventListener('click',addGrp);
document.getElementById('Name').addEventListener('click',createGrp);
document.getElementById('logout').addEventListener('click',logout);
document.getElementById('delete').addEventListener('click',deleteGrp);
document.getElementById('grpmem').addEventListener('click',getMember);
document.getElementById('addAdmins').addEventListener('click',addAdmin);
document.getElementById('removeAdmins').addEventListener('click',removeAdmin);
document.addEventListener('DOMContentLoaded',getGrp);
