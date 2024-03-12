function post_host(username,is_host){
    var http = new XMLHttpRequest();
    var url = 'post_host.php';
    var params = `host=${username}&room=${inviteCode}&ishost=${is_host}`;
    
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
            if(http.responseText=="have host in room")
            {
                alert("該房間已經有直播主囉!將以觀眾身分進入房間!")
                sessionStorage.setItem('host', "false")

                window.location = `room.php?room=${inviteCode}`;
            }
            else
            {
                window.location = `room.php?room=${inviteCode}`;
            }
        }
    }
    http.send(params);
    console.log(params);
}

let form = document.getElementById('lobby__form')

let displaName = sessionStorage.getItem('display_name')
if (displaName) {
    form.name.value = displaName
}
let inviteCode;
form.addEventListener("submit", (e) => {
    e.preventDefault()

    sessionStorage.setItem('display_name', e.target.name.value)
    displaName = sessionStorage.getItem('display_name')

    inviteCode = e.target.room.value
    if (!inviteCode) {
        inviteCode = String(Math.floor(Math.random() * 10000))
    }
    else if(parseInt(inviteCode).toString() == inviteCode)
    {
        let hostChb=e.target.Host_chb.checked;
        sessionStorage.setItem('host', hostChb)
        // console.log(hostChb);
        if(hostChb==true)
        {
            post_host(displaName,1);
            // console.log("asd");
        }
        else
        {
            post_host(displaName,0);
            // window.location = `room.php?room=${inviteCode}`;
        }
    }
    else
    {
        alert("房號請輸入正整數！")
    }
    
    

})

form.name.focus();

const greetings = [
    '真高興見到您，', '您好，', '歡迎回來，', '快看，是'
];
var userName = '<?php echo $username; ?>';
document.getElementById('Name').innerHTML = `${greetings[Math.floor(Math.random() * greetings.length)]}`;