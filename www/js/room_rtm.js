let handleMemberJoined = async (MemberId) => {
    //the memberId is uid
    console.log("A new member has joined the room:", MemberId)

    addMemberToDom(MemberId)

    let members = await channel.getMembers()
    updateMemberTotal(members)

    let { name } = await rtmClient.getUserAttributesByKeys(MemberId, ['name'])
    addBotMessageToDom(`歡迎使用者 ${name} 的加入 👋`)
}

let return_from_get_host;
let addMemberToDom = async (MemberId) => {
    let { name } = await rtmClient.getUserAttributesByKeys(MemberId, ['name'])

    let membersWrapper = document.getElementById("member__list");

    let memberItem;

    let uid = sessionStorage.getItem('uid');
    if(return_from_get_host==name)
    {
        memberItem = `<div class="member__wrapper" id="member__${MemberId}__wrapper">
                        <span class="green__icon"></span>
                        <p class="member_name" >${name} (直播者)</p>
                        </div>`
    }
    else if(MemberId==uid)
    {
        memberItem = `<div class="member__wrapper" id="member__${MemberId}__wrapper">
                        <span class="blue__icon"></span>
                        <p class="member_name" >${name} (您)</p>
                        </div>`
    }
    else
    {
        memberItem = `<div class="member__wrapper" id="member__${MemberId}__wrapper">
                        <span class="grey__icon"></span>
                        <p class="member_name">${name}</p>
                        </div>`
    }
    

    membersWrapper.insertAdjacentHTML('beforeend', memberItem)
}

let updateMemberTotal = async (members) => {
    let total = document.getElementById("members__count")
    total.innerText = members.length;
}

let handleMemberLeft = async (MemberId) => {
    removeMemberFromDom(MemberId)

    let members = await channel.getMembers()
    updateMemberTotal(members)

    // let { name } = await rtmClient.getUserAttributesByKeys(MemberId, ['name'])
    // const urlParams_ = new URLSearchParams(queryString);
    // let roomId_ = urlParams_.get('room')

    // post_host(name,roomId_,0);

}



let removeMemberFromDom = async (MemberId) => {
    let memberWrapper = document.getElementById(`member__${MemberId}__wrapper`)
    let name = memberWrapper.getElementsByClassName("member_name")[0].textContent
    memberWrapper.remove()
    
    const urlParams_ = new URLSearchParams(queryString);
    let roomId_ = urlParams_.get('room')
    post_host(name,roomId_,0)
    // console.log(name)
    // console.log(roomId_)
    addBotMessageToDom(`${name} 離開了直播間`)
}

// let temp_music;
let handleChannelMessage = async (messageData, MemberId) => {
    console.log("A new message was received")
    let data = JSON.parse(messageData.text)

    if (data.type === "chat") {
        addMessageToDom(data.displayName,data.message)
    }
    else if(data.type === "user_left"){
        document.getElementById(`user-container-${data.uid}`).remove()

        if (userIdInDisplayFrame === `user-container-${data.uid}`) {
            displayFrame.style.display = null
    
            for (let i = 0; i < videoFrames.length; i++) {
                videoFrames[i].style.height = "300px";
                videoFrames[i].style.width = "300px";
            }
        }
    }
    else if(data.type === "announce"){
        document.getElementById("marqee_container").innerHTML = data.message;
    }
    else if(data.type === "showAnimate"){
        showAnimate(data.username,data.money);
    }
    else if(data.type === "play_music"){
        play_music();
    }
    else if(data.type === "play_yt")
    {
        play_yt_music();
    }
    else if(data.type === "apply_join" && sessionStorage.getItem('host')=="true"){
        let con=window.confirm(`${data.username} 想要與您一同直播`);
        if(con==true)
        {
            channel.sendMessage({ text: JSON.stringify({ "type": "apply_join_return", "message": "true", "destination": data.username}) })
        }
        else
        {
            channel.sendMessage({ text: JSON.stringify({ "type": "apply_join_return", "message": "false", "destination": data.username}) })
        }
    }
    else if(data.type === "apply_join_return" && displayName==data.destination)
    {
        if(data.message=="true")
        {
            alert("直播者同意你的要求!你現在可以與直播主一同直播了")
            let joinBtn = document.getElementById("join-btn")
            joinBtn.style.display="block";  
            let applyJoinBtn = document.getElementById("apply_join_btn")
            applyJoinBtn.style.display="none";
        }
        else
        {
            alert("QQ，直播者不同意你的要求，或是他目前沒有聚焦瀏覽器！")
        }
    }
    else if (data.type === "apply_yt_music")
    {
        let con=window.confirm(`${data.displayName} want to play a youtube music`);
        if(con==true)
        {
            channel.sendMessage({ text: JSON.stringify({ "type": "apply_yt_music_return", "message": "true", "destination": data.displayName}) })
        }
        else
        {
            channel.sendMessage({ text: JSON.stringify({ "type": "apply_yt_music_return", "message": "false", "destination": data.displayName}) })
        }
    }
    else if(data.type === "apply_yt_music_return" && displayName==data.destination)
    {
        if(data.message=="true")
        {
            alert("直播者同意你的要求!")
            // get_yt_stream_link(temp_music);
            sessionStorage.setItem('permissions_yt_music', "true")
        }
        else
        {
            alert("直播者不同意你的要求QQ")
        }
    }
    else if(data.type === "pause_yt_music")
    {
        const audioPlayer = document.getElementById('yt_audio');
        audioPlayer.pause();
    }
    else if(data.type === "resume_yt_music")
    {
        const audioPlayer = document.getElementById('yt_audio');
        audioPlayer.play();
    }

}

let sendMessage = async (e) => {
    e.preventDefault()

    let message = e.target.message.value
    if(message[0]=='!')
    {
        var cmd="";
        for(let space=1;space<10;space++)
        {
            if(message[space]==" " | message[space]==undefined)
            {
                break;
            }
            else
            {
                cmd=cmd+message[space];
            }
        }
        bot_cmd(cmd,message);
    }
    else if(message!="")
    {
        message=message_filter(message);

        channel.sendMessage({ text: JSON.stringify({ "type": "chat", "message": message, "displayName": displayName }) })

        addMessageToDom(displayName, message)
    }
    

    e.target.reset()
}

var filter=['fuck','shit','幹你娘','幹您娘','幹','靠杯','機掰']
function message_filter(message)
{
  for(let x=0;x<filter.length;x++)
  {
    var change="";
    for(let y=0;y<filter[x].length;y++)
    {
      change=change+"*"
    }
    message=message.replaceAll(filter[x],change)
  }

  return message
}

function bot_cmd(cmd,message){
    if(cmd=="time")
    {
        get_time();
    }
    else if(cmd=="help")
    {

        addBotMessageToDom("可以使用 \"!time\",\"!info\",\"!music\"。");

    }
    else if(cmd=="info")
    {
        addBotMessageToDom("這是第一組的直播平台。<br>由王柏穎、李紹瑜、簡應謙設計製作!");
    }
    else if(cmd=="music")
    {
        const words = message.split(' ');
        
        if(!(sessionStorage.getItem('host')=="true" || sessionStorage.getItem('permissions_yt_music')=="true"))
        {
            if(words[1]=="apply")
            {
                channel.sendMessage({ text: JSON.stringify({ "type": "apply_yt_music", "displayName": displayName }) })
            }
            else
            {
                addBotMessageToDom("您的權限不足，可以使用!music apply來取得權限!");
            }
        }
        else
        {
            if(words[1]=="play")
            {

                get_yt_stream_link(words[2]);
            }
            else if(words[1]=="now")
            {
                let title=audioPlayer.getAttribute("name");
                if(title=="null")
                {
                    addBotMessageToDom(`現在沒有播放的音樂<br>可以使用 !music play 網址 來播放音樂`);
                }
                else
                {
                    addBotMessageToDom(`現在播放的音樂為<br>${title}`);
                }
            }
            else if(words[1]=="pause")
            {
                const audioPlayer = document.getElementById('yt_audio');
                audioPlayer.pause();
                channel.sendMessage({ text: JSON.stringify({ "type": "pause_yt_music"}) })
            }
            else if(words[1]=="resume")
            {
                const audioPlayer = document.getElementById('yt_audio');
                audioPlayer.play();
                channel.sendMessage({ text: JSON.stringify({ "type": "resume_yt_music"}) })
            }
            else if(words[1]=="skip")
            {
                delete_music();
            }
            else if(words[1]=="list")
            {
                get_music_list();
            }
            else if(words[1]=="help")
            {
                let str="----音樂機器人使用教學----<br>!music apply 請求使用音樂機器人權限<br>!music play [網址] 播放YouTube音樂<br>!music pause 暫停播放音樂<br> \
                         !music resume 繼續播放音樂<br>!music skip 跳過目前音樂<br>!music now 查詢正在播放的音樂<br>!music list 查詢播放清單中的所有音樂";
                addBotMessageToDom(str);
            }
            else if(words[1]=="apply")
            {
                addBotMessageToDom("你已經有權限囉!開始使用吧");
            }
            else
            {
                addBotMessageToDom("無效的音樂指令可以使用!music help來查詢指令喔!");
            }
        }
        
    }
    else
    {
        addBotMessageToDom("無效的指令，可以使用!help來查詢指令喔!");
    }


}

let addMessageToDom = (name, message) => {
    let messagesWrapper = document.getElementById("messages")

    let newMessage = `<div class="message__wrapper">
                          <div class="message__body">
                              <strong class="message__author">${name}</strong>
                              <p class="message__text">${message}</p>
                          </div>
                      </div>`

    messagesWrapper.insertAdjacentHTML('beforeend', newMessage)

    let lastMessage = document.querySelector("#messages .message__wrapper:last-child")
    if (lastMessage) {
        lastMessage.scrollIntoView()
    }
}

let addBotMessageToDom = (botMessage) => {
    let messagesWrapper = document.getElementById("messages")

    let newMessage = `<div class="message__wrapper">
                          <div class="message__body__bot">
                              <strong class="message__author__bot">🤖 機器人</strong>
                              <p class="message__text__bot">${botMessage}</p>
                          </div>
                      </div> `

    messagesWrapper.insertAdjacentHTML('beforeend', newMessage)

    let lastMessage = document.querySelector("#messages .message__wrapper:last-child")
    if (lastMessage) {
        lastMessage.scrollIntoView()
    }
}

let leaveChannel = async () => {
    await channel.leave()
    await rtmClient.logout()
}

let getMembers = async () => {
    let members = await channel.getMembers()
    updateMemberTotal(members)

    for (let i = 0; i < members.length; i++) {
        addMemberToDom(members[i])
    }
}

window.addEventListener("beforeunload", leaveChannel);
let messageForm = document.getElementById("message__form")
messageForm.addEventListener('submit', sendMessage)

//////////////////////////////////////////////////////////

var play_box = document.getElementById("play-box");
var php_data;

var get_donate_timer = setInterval(get_donate, 2000);

get_donate();

function showAnimate(username,money) 
{
    document.getElementById('animate_text').innerHTML=`${username}<br>斗內了 ${money} 元`;

    play_box.classList.remove("paused-box");
    play_box.classList.add("play-box");
    play_box.style.animationPlayState = 'running';
};

play_box.addEventListener("animationend", function () {  
    // y.style.animationPlayState = 'paused';
    play_box.classList.remove("play-box");
    play_box.classList.add("paused-box");

})

async function donate_btn_handler(){
    get_donate();
    php_data=JSON.parse(php_data);
    if(php_data["donate"]=="-1")
    {
        // alert("目前還沒有直播主喔!等直播主上線吧!")
        alert("目前尚無直播者，請稍後直播者的加入！")
    }
    else
    {
        let money = prompt('請輸入欲贊助的金額：');
        money =  parseInt(money)
        if(money === null || money==="")
        {
            return;
        } 
        else if (!Number.isInteger(money))
        (
            alert("別鬧了，請輸入正確金額")
        )
        else if(money<=0)
        {
            alert("請輸入正數")
        }
        else
        {
            let name_ = sessionStorage.getItem('display_name');

            channel.sendMessage({ text: JSON.stringify({ "type": "showAnimate", "username": name_, "money": money }) })
    
            showAnimate(name_,money);
        
            money=parseInt(php_data["donate"])+parseInt(money);
            post_donate(php_data["username"],money);
        
            get_donate();
        }
    }
}

function apply_join_handler(){
    let name_ = sessionStorage.getItem('display_name');

    channel.sendMessage({ text: JSON.stringify({ "type": "apply_join", "username": name_}) })
}

function get_donate() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                php_data=xmlhttp.responseText;
                let php_data_parse=JSON.parse(php_data);
                var donateValue = document.getElementById("donate_value");
                if(php_data_parse["donate"]=="-1")
                {
                    donateValue.innerHTML=`目前尚無直播者，請稍後直播者的加入！`;
                }
                else
                {
                    donateValue.innerHTML=`直播主是 ${php_data_parse["username"]} 總斗內金額 ${php_data_parse["donate"]}`;
                    // donateValue.innerHTML=`獲利 ${php_data_parse["donate"]}`;
                }
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", "get_donate.php", true);
    xmlhttp.send();
    // console.log("get_donate")

}

function post_donate(username,money){
    var http = new XMLHttpRequest();
    var url = 'post_donate.php';
    var params = `money=${money}&username=${username}`;

    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            // alert(http.responseText);
        }
    }
    http.send(params);
}

function post_host(username,roomId,is_host){
    var http = new XMLHttpRequest();
    var url = 'post_host.php';
    var params = `host=${username}&room=${roomId}&ishost=${is_host}`;
    
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
        }
    }
    http.send(params);
    console.log(params);
}

function get_time(roomId){
    var http = new XMLHttpRequest();
    var url = 'get_time.php';

    const urlParams_ = new URLSearchParams(queryString);
    let roomId_ = urlParams_.get('room')

    var params = `room=${roomId_}`;
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            if(http.responseText=="There are no host in room")
            {
                addBotMessageToDom(`目前尚無直播者，請稍後直播者的加入！`)
            }
            else
            {
                var diff = parseInt(http.responseText)
                var hours = parseInt(diff  / 60 / 60);
                diff -= hours * 60 * 60;
                var minutes = parseInt(diff  / 60);
                diff -= minutes  * 60;
                var seconds = parseInt(diff);
                var resultTime = hours + " 小時 " + minutes + " 分鐘 " + seconds + " 秒 ";
                addBotMessageToDom(`直播已經開始 ${resultTime} 了!`)
            }
        }
    }
    http.send(params);
    console.log(params);
}

function get_host(){
    var http = new XMLHttpRequest();
    var url = 'get_host.php';

    const urlParams_ = new URLSearchParams(queryString);
    let roomId_ = urlParams_.get('room')

    var params = `room=${roomId_}`;
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            if(http.responseText=="There are no host in room")
            {
                return_from_get_host="null";
            }
            else
            {
                return_from_get_host=http.responseText;
            }
        }
    }
    http.send(params);
    console.log(params);
}

function truncate_music()
{
    var http = new XMLHttpRequest();
    var url = 'post_truncate_music.php';

    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
        }
    }
    http.send();
}
//////////////////////////////////////////////////
let play_flag=0;
const audio = document.getElementById("audio-1");

// audio.innerHTML='<source src="..." type="audio/ogg"><source src="song.mp3" type="audio/mpeg">';

function music_btn_handler(){
    channel.sendMessage({ text: JSON.stringify({ "type": "play_music"}) })

    play_music();
}
function play_music(){
    if(play_flag==0)
    {
        audio.play();
        play_flag=1;
        var musicBtn = document.getElementById("music_button");
        musicBtn.innerHTML="暫停";
    }
    else
    {
        audio.pause();
        audio.currentTime = 0;
        play_flag=0;
        var musicBtn = document.getElementById("music_button");
        musicBtn.innerHTML="播放";
    }
}
audio.addEventListener("ended", function(){
    audio.pause();
    audio.currentTime = 0;
    play_flag=0;
    var musicBtn = document.getElementById("music_button");
    musicBtn.innerHTML="play music";
    // console.log("ended");
});

let announce = async()=>{
    let announceText = prompt('說點什麼...');

    channel.sendMessage({ text: JSON.stringify({ "type": "announce", "message": announceText, "displayName": displayName}) })

    document.getElementById("marqee_container").innerHTML = announceText;

}
//////////////////////////////////////////////////

var donate_btn = document.getElementById("donate_button");
donate_btn.addEventListener("click",donate_btn_handler)
var music_btn = document.getElementById("music_button");
music_btn.addEventListener("click",music_btn_handler)

let announceBtn = document.getElementById("announce-btn")
announceBtn.addEventListener('click', announce)

let applyJoinBtn = document.getElementById("apply_join_btn")
applyJoinBtn.addEventListener('click', apply_join_handler)

// window.onbeforeunload=myunload;

// function myunload()
// {
//     if(event.clientX>document.body.clientWidth&&event.clientY<0||event.altKey)
//     {
//         window.event.returnValue = "";//關閉時,彈出視窗的訊息
//         const urlParams_ = new URLSearchParams(queryString);
//         let roomId_ = urlParams_.get('room')
//         let name_ = sessionStorage.getItem('display_name');

//         post_host(name_,roomId_,0)
//     }
// }
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "\o/";

    const urlParams_ = new URLSearchParams(queryString);
    let roomId_ = urlParams_.get('room')
    let name_ = sessionStorage.getItem('display_name');

    post_host(name_,roomId_,0)

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage;                            //Webkit, Safari, Chrome
  });



if(sessionStorage.getItem('host')=="true")
{
  let donateBtn = document.getElementById("donate_button")
  donateBtn.style.display="none";

  const urlParams_ = new URLSearchParams(queryString);
  let roomId_ = urlParams_.get('room')
  let name_ = sessionStorage.getItem('display_name');
  post_host(name_,roomId_,1);

  let applyJoinBtn = document.getElementById("apply_join_btn")
  applyJoinBtn.style.display="none";

  truncate_music();
}
else if(sessionStorage.getItem('host')=="false")
{
  let musicBtn = document.getElementById("music_button")
  musicBtn.style.display="none";
  
  let announceBtn = document.getElementById("announce-btn")
  announceBtn.style.display="none";

  let joinBtn = document.getElementById("join-btn")
  joinBtn.style.display="none";  
}
get_host();
