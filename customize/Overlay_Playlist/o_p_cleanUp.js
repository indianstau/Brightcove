// make sure Gallery web site type will change or not, I didn't try all.
// #performPlayer_html5_api  or .vjs-tech

// if not setting autoplay will load not date or not play not date ?
// 會閃窗 要找  
// vjs-overlay vjs-overlay-top-left vjs-overlay-background 會浮出 沒有的 overlay
//  overlay can't remove left-top
    
videojs.plugin('cPlayList',function(){    

    // 自動抓 video tag id
    var videoTag = document.getElementsByTagName("video");
    var player = videojs(videoTag[0].id);
    var V_tag = document.getElementById(videoTag[0].id);

    var playlistBlock, vidoeInfoC, cuePointAra, cueLength, currentTime, homePage;   

    // 拔掉全螢幕 rwd沒作
    var fullScreenElement = document.getElementsByClassName("vjs-fullscreen-control")[0];
    fullScreenElement.parentNode.removeChild(fullScreenElement);

    var block = '<div class="playlistBlock">' + 
                                '<div class="info">' + 
                                    '<p class="number"></p>段' +   
                                    '<p class="totText">共</p>' +
                                    '<p class="total"></p>分鐘' +                       
                                    '<a class="aLink"></a>' + 
                                '</div>' + 
                '</div>';
     

    // console homepage 抓不到;

        // 播放頁面執行
        var div2;
        player.on("loadstart",function(){
            console.log("In loadstart");
            // for homepage con
            homePage = document.getElementsByClassName("home-carousel-video");
            if(homePage[0]){
                console.log("Here is HomePage");   
            }else{
                console.log("Out of homePage");
                
                // get date in and create block
                player.one("loadedmetadata",oneLoadedmetadata);
                
                // 手機版的判斷
                if(document.body.clientWidth >= 650){
                    player.overlay({
                        overlays:[{
                            align:'top-right',
                            content:block,
                            start:'play',
                            end:'end'
                        }]
                    }); 
                    player.on("timeupdate", onTimeUpdate);
                    player.on("seeked", onSeeked);
                }else{
                    createUnitDiv();
                    createSecDiv();
                    createCloseP();
                } // clientWidth
            } // homePage 
        }); // loadstart


/************  on event  block      *******************************************************/    
    
// 撈出 CuePoint array   
function oneLoadedmetadata(){
     cuePointAra = player.mediainfo.cuePoints;
     cueLength = player.mediainfo.cuePoints.length;
     var totalTime = player.mediainfo.duration;

     // 代回?段  共?分鐘
     var number = document.getElementsByClassName("number")[0];
     number.textContent = cueLength;
     var total = document.getElementsByClassName("total")[0];
     total.textContent = Math.floor(totalTime/60);

     playlistBlock = document.getElementsByClassName("playlistBlock")[0];
     createBlock();

     // 大的  才需要抓寛度跟高度
     if(document.body.clientWidth >= 650){
         playlistBlock.style.height = V_tag.offsetHeight + "px";
         playlistBlock.style.width = V_tag.offsetWidth * 0.37 + "px";
     }else{
        return false;
     }     
}    
    
//時間一改變  timeupdate seeking 如果用seeking 不動會沒有    
function onTimeUpdate(){
    currentTime = player.currentTime();
    if(document.body.clientWidth >= 650){
        cleanFocus();

            // index = 0
            if(currentTime < cuePointAra[0].endTime){
                unit[0].classList.add("focusOption");
            }

            // 中間過程
            for(i= 1; i< cueLength-1 ; i++){
                if ( currentTime > cuePointAra[i].startTime && currentTime < cuePointAra[i].endTime ){
                    unit[i].classList.add("focusOption"); 
                }
            }
            // cuelength-1 最後一個  從0開始   
            if(currentTime > cuePointAra[cueLength-1].startTime){
                unit[cueLength-1].classList.add("focusOption"); 
            }
    }else{
        return false;
    }    
}    

//　progress 點擊移動時     
function onSeeked(){
    if(document.body.clientWidth >= 650){
        for(i= 1; i< cueLength ; i++){
            if ( currentTime > cuePointAra[i].startTime && currentTime < cuePointAra[i].endTime ){
                scrollMove(i);
            }
            if( currentTime >= cuePointAra[cueLength-2].startTime ){
                playlistBlock.scrollTop = playlistBlock.scrollHeight;
            }
        }
    }else{
        return false;
    }
}

/******  Web   **********************************************************************************/

    //  create ? 個 div, 將title 代入, 將每段的時間代入
    var fgm;
    function createBlock(){     
        for(var i = 0 ; i < cueLength; i++){       
            var startT = cuePointAra[i].startTime;

            //一開始將位置 與每段開始的時間標上去      拔掉 function
            var elm ='<div class="unit" aria-position="'+ i +
                    '" aria-time="' + startT + '">'+ '<a name="anchor'+ i +'"></a>' +
                        '<p class="title"></p><p class="time"></p></div>';

            // 從第一個小孩以後開始
            playlistBlock.children[i].insertAdjacentHTML("afterend", elm);

            //代回標題
            var title = document.getElementsByClassName("title");
            title[i].textContent = cuePointAra[i].name;

            //代回 每段需多少時間
            var time = document.getElementsByClassName("time");  
            fgm = cuePointAra[i].endTime - startT;

            //處理時間格式
            transHrMinSec();     
            time[i].textContent = timeString;
            
            //因為 抓不到
            unit[i].onclick = function(){getPosition();}
        }
    }


    // get target index and startTime then change playing time
    function getPosition(){

        // 抓點擊的位置 與開始時 個別掛上去
        var eTarget = event.target;
        var index = eTarget.getAttribute("aria-position");
        var getStartT = eTarget.getAttribute("aria-time");

        // if抓到不是unit 抓爸爸 重新抓位置跟開始時間
        var posClassName = eTarget.className 
        if(posClassName != "unit"){
            posClassName = eTarget.parentNode;
            index = posClassName.getAttribute("aria-position");
            getStartT = posClassName.getAttribute("aria-time");
        }    

        // < 650 時, 不作清除 focus & 掛 focus style
        if(document.body.clientWidth >= 650){
            cleanFocus();
            var site = document.getElementsByClassName("unit")[index];
            site.classList.add("focusOption");
        }

        player.currentTime(getStartT);
        player.play();   

        if(document.body.clientWidth >= 650){
            // 卷軸 跟著
            scrollMove(index);
            // 最後兩個 移到最底下
            if( index >= cueLength - 2 ){
                playlistBlock.scrollTop = playlistBlock.scrollHeight;
            }
        }else{
            closeX();
        }
    }     


    // scrollBar 跟著移動位置
    // 將 a tag create 在 info 裡   每次點擊的該位置 index 傳進作 anchor
    // 因為結構關係 在減一點 作位置不貼邊處理
    function scrollMove(index){
        var alink = document.getElementsByClassName("aLink")[0];
        alink.href = "#anchor" + index;
        alink.click();

        var scroll_Index = playlistBlock.scrollTop;

        playlistBlock.scrollTop = scroll_Index - 20;
        document.documentElement.scrollTop = 0;
    }


    // clean Focus style
    var unit = document.getElementsByClassName("unit");  
    function cleanFocus(){
        for(i = 0; i < cueLength; i++){
            unit[i].classList.remove("focusOption");
        }
    }    


    // 處理時間格式　
    var timeString;
    function transHrMinSec(){
        var hr = Math.floor(fgm/3600);
        var min = Math.floor((fgm-hr*3600)/60);
        var sec = Math.floor(fgm-hr*3600-min*60); 

        //　hr min sec 個位數
        if(hr.toString().length < 2){hr = "0" + hr;}
        if(min.toString().length < 2){min = "0" + min;}  
        if(sec.toString().length < 2){sec = "0" + sec;}

        if(hr == 0){
            timeString = min + ":" + sec;
        }else{
            timeString = hr + ":" + min + ":" + sec;  
        }
    }


/*****  phone (< 650) function       *******************************************************/
    
    // 長出單元一覽 btn
    var vidoeInfoC;
    function createUnitDiv(){
        var div = document.createElement("div");
        var divText = document.createTextNode("單元一覽 >>");
        div.appendChild(divText);
        div.className = "outModel";

        vidoeInfoC = document.getElementsByClassName("video-detail-info")[0];
        vidoeInfoC.insertBefore(div, vidoeInfoC.childNodes[0]);

        div.onclick = function(){
            div2.style.display = "block";
        }
    }
    
    // 長出下頭要伸出來的 playlistBlock 區塊
    var div2;
    function createSecDiv(){
        div2 = document.createElement("div");
        div2.innerHTML = block;
        div2.className = "secBlock";
        vidoeInfoC.insertBefore(div2, vidoeInfoC.childNodes[1]);
    }
    
    // create close tag and put on 
    function createCloseP(){
        var p = '<p class="closeWin" title="關閉">x</p>';
        var info = document.getElementsByClassName("info")[0];
        info.children[3].insertAdjacentHTML("afterend" , p);
        
        // 因為 function 掛上去  抓不到
        var close = document.getElementsByClassName("closeWin")[0];
        close.onclick = function(){ closeX(); };
    }
    
    // 關閉 單元一覽
    function closeX(){ div2.style.display = "none"; }    
    
}) // plugin       
