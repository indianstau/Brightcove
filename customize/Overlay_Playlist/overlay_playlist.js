// 改plugin registerPlugin options
  
videojs.plugin('cPlayList',function(){

    //performPlayer_html5_api or  performPlayer
    //var player = videojs("performPlayer_html5_api");
    
    //自動抓 video tag id
    var videoTag = document.getElementsByTagName("video");
    var V_tag = document.getElementById(videoTag[0].id);
    var player = videojs(videoTag[0].id);

    var cuePointAra, cueLength;   
    //var player = videojs("vjs_video_3");
    //var player = this;

    //plugin 可以拿掉
    //player.ready(function(){

        //拔掉全螢幕   rwd沒作
        fullScreenElement = document.getElementsByClassName("vjs-fullscreen-control")[0];
        fullScreenElement.parentNode.removeChild(fullScreenElement);

        player.on("loadstart",function(){
            player.overlay({
                overlays:[{
                    align:'top-right',
                    content: '<div class="playlistBlock">' + 
                                '<div class="info">' + 
                                    '<p class="number"></p>段' +   
                                    '<p class="totText">共</p>' +
                                    '<p class="total"></p>分鐘' +                       
                                    '<a class="aLink"></a></div>' + 
                              '</div>',
                    start:'play',
                    end:'end'
                },{
                    align:'top-left',
                    content:'<button style="cursor:pointer;">付費購買<img src="https://www.it.mk/wp-content/uploads/job-manager-uploads/company_logo/2017/11/inplayer-icon-4.png" style="width:35px;height:35px;vertical-align: middle;"></button>',
                    start:'play',
                    end:'end'
                }]
            });          
        }); // loadstart
    
    
         // 撈出 CuePoint array
         player.one("loadedmetadata",function(){

             cuePointAra = player.mediainfo.cuePoints;
             cueLength = player.mediainfo.cuePoints.length;
             totalTime = player.mediainfo.duration;

             // 代回?段  共?分鐘
             number = document.getElementsByClassName("number")[0];
             number.textContent = cueLength;
             total = document.getElementsByClassName("total")[0];
             total.textContent = Math.floor(totalTime/60);

             playlistBlock = document.getElementsByClassName("playlistBlock")[0];
             createBlock();
             
             //自動高度 寛度
             playlistBlock.style.height = V_tag.offsetHeight + "px";
             playlistBlock.style.width = (V_tag.offsetWidth * 0.37) - 20 + "px";
         });


        //時間一改變   timeupdate seeking 如果用seeking 不動會沒有
        player.on("timeupdate",function(){
            currentTime = player.currentTime();
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
        }); // Timeupdate


        //　progress 點擊移動時  ing 會跑兩次 onclick getposition() 也算在 seeking 裡
        player.on("seeked",function(){
            for(i= 1; i< cueLength ; i++){
                if ( currentTime > cuePointAra[i].startTime && currentTime < cuePointAra[i].endTime ){
                    scrollMove(i);
                }
                if( currentTime >= cuePointAra[cueLength-2].startTime ){
                    playlistBlock.scrollTop = playlistBlock.scrollHeight;
                }
            }
        }); // seeked  
//    }); // ready


//*****  function插入處  *************************************************************************/
    //  create ? 個 div, 將title 代入, 將每段的時間代入
    var fgm;
    function createBlock(){         
        for(var i = 0 ; i < cueLength; i++){       
            startT = cuePointAra[i].startTime;

            //一開始將位置 與每段開始的時間標上去 onclick 抓不到   
            elm ='<div class="unit" aria-position="'+ i +
                    '" aria-time="' + startT + '">'+ '<a name="anchor'+ i +'"></a>' +
                        '<p class="title"></p><p class="time"></p></div>';

            playlistBlock.children[i].insertAdjacentHTML("afterend",elm);

            //代回標題
            title = document.getElementsByClassName("title");
            title[i].textContent =  cuePointAra[i].name;

            //代回 每段需多少時間
            time = document.getElementsByClassName("time");  
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
        cleanFocus();

        // 抓點擊的位置 與開始時
        eTarget = event.target;
        index = eTarget.getAttribute("aria-position");
        getStartT = eTarget.getAttribute("aria-time");

        // if抓到不是unit 抓f 重新抓位置跟開始時間
        posClassName = eTarget.className 
        if(posClassName != "unit"){
            posClassName = eTarget.parentNode;
            index = posClassName.getAttribute("aria-position");
            getStartT = posClassName.getAttribute("aria-time");
        }    

        site = document.getElementsByClassName("unit")[index];
        site.classList.add("focusOption");

        player.currentTime(getStartT);
        player.play();   

        // 法2
        scrollMove(index);
        //最後兩個 移到最底下
        if( index >= cueLength - 2 ){
            playlistBlock.scrollTop = playlistBlock.scrollHeight; //849
        }
    }     
    

    // scrollBar 跟著移動位置
    // 將 a tag create 在 info 裡   每次點擊的該位置 index 傳進作 anchor
    // 因為結構關係 在減一點 作位置不貼邊處理
    function scrollMove(index){
        alink = document.getElementsByClassName("aLink")[0];
        alink.href = "#anchor" + index;
        alink.click();

        scroll_Index = playlistBlock.scrollTop;
        playlistBlock.scrollTop = scroll_Index - 20;
        
        // 歸零  不動
        document.documentElement.scrollTop = 0;
    }


    // clean Focus style
    unit = document.getElementsByClassName("unit");  
    function cleanFocus(){
        for(i = 0; i < cueLength; i++){
            unit[i].classList.remove("focusOption");
        }
    }  


    // 處理時間格式　
    var timeString;
    function transHrMinSec(){
        hr = Math.floor(fgm/3600);
        min = Math.floor((fgm-hr*3600)/60);
        sec = Math.floor(fgm-hr*3600-min*60); 

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
}) // plugin  