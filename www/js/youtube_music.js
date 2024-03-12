let music_queue=[];

const audioPlayer = document.getElementById('yt_audio');

audioPlayer.addEventListener('ended', delete_music);

function YTBtn_handler()
{
    let link=prompt("input YT link");
    if(link!=null)
    {
        get_yt_stream_link(link)
    }
}

function get_yt_stream_link(yt_link){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            if(this.responseText!="{}")
            {
                // music_queue.push(this.responseText);
                // if(music_queue.length==1)
                // {
                //     play_next_music()
                // }
                let php_data_parse=JSON.parse(this.responseText);

                post_music(php_data_parse["link"],php_data_parse["song-name"])
                // post_music("test_link",php_data_parse["song-name"])

            }
            // const contentType = xhr.getResponseHeader("dest");
            // console.log(contentType)
        }
    });

    xhr.open(
        "POST",
        ""  // add your server link here
    );
    xhr.setRequestHeader(
        "link",
        yt_link
    );
    xhr.setRequestHeader("Content-Type", "text/plain");

    xhr.send(yt_link);

}

function post_music(url_in,title){
    var xhr = new XMLHttpRequest();
    
    var url = 'post_music.php';
    var time=new Date();
    var now=time.getTime();
    var flickr = {'url': url_in, 'title':title,'time':now};
    var data = JSON.stringify(flickr);

    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // in case we reply back from server
            // jsondata = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            if(xhr.responseText=="1")
            {
                play_yt_music();
                channel.sendMessage({ text: JSON.stringify({ "type": "play_yt"}) })
            }
        }
    }
    
    xhr.send(data);
}

function play_yt_music()
{
    var http = new XMLHttpRequest();
    var url = 'get_music.php';

    // var params = `url=${url}&title=${title}`;
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            let data_parse=JSON.parse(this.responseText);
            
            if(data_parse["url"]!=null)
            {
                audioPlayer.setAttribute('src',data_parse["url"]);
                audioPlayer.setAttribute('name',data_parse["title"]);
                audioPlayer.currentTime = 0;
                audioPlayer.play();
            }
            else
            {
                audioPlayer.currentTime = 0;
                audioPlayer.pause();
                audioPlayer.setAttribute('name',"null");
            }
        }
    }
    http.send();
    console.log();
}

function delete_music()
{
    if(sessionStorage.getItem('host')=="true" || sessionStorage.getItem('permissions_yt_music')=="true")
    {
        var http = new XMLHttpRequest();
        var url = 'post_delete_music.php';
    
        var params = `title=${audioPlayer.getAttribute("name")}`;
        http.open('POST', url, true);
    
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                play_yt_music();
                channel.sendMessage({ text: JSON.stringify({ "type": "play_yt"}) })
            }
        }
        http.send(params);
        console.log(params);
    }
}

function get_music_list()
{
    var http = new XMLHttpRequest();
    var url = 'get_music_list.php';
    http.open('GET', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            // console.log(http.responseText)
            let php_data_parse=JSON.parse(this.responseText);
            // console.log(php_data_parse)
            if(php_data_parse.length==0)
            {
                addBotMessageToDom("現在還沒有人點歌喔~快使用!music play 來點歌吧");
            }
            else
            {
                let str="----播放清單-----<br>";
                for(let x=0;x<php_data_parse.length;x++)
                {
                    str+=`第${x+1}首 - ${php_data_parse[x]["title"]}<br>`;
                }
                addBotMessageToDom(str);
            }
            
        }
    }
    http.send();
  
}

let YTBtn = document.getElementById("yt_btn")
YTBtn.addEventListener('click', YTBtn_handler)

/*
CREATE TABLE music (
    ID          int         NOT NULL AUTO_INCREMENT,
    title       varchar(200) NOT NULL,
    url         varchar(1000),
    time        varchar(100),
    PRIMARY KEY(ID)
);

alter table music add column time varchar(100);
alter table music drop column time;
ALTER TABLE music MODIFY title VARCHAR(200) CHARACTER SET utf8 NOT NULL ;
ALTER TABLE music MODIFY url VARCHAR(1000) CHARACTER SET utf8 NOT NULL ;
ALTER TABLE music MODIFY time VARCHAR(100) CHARACTER SET utf8 NOT NULL ;

ALTER TABLE users MODIFY username VARCHAR(100) CHARACTER SET utf8 NOT NULL ;

INSERT INTO music (title,url,time) VALUE ("測試","網址","時間");
*/