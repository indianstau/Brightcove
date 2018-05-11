// 試版型
// 確定首頁  error msg
// rwd 650 -700 會是雷

videojs.registerPlugin('CodeMarksOnProgressP',function(){  

    //自動抓 video tag id
    var videoTag = document.getElementsByTagName("video");
    var V_tag = document.getElementById(videoTag[0].id);

    var player = this;

        player.on('loadstart', function(){
            
            var cuePointsAra = [],
                CodeCuePointsAra = [],
                videoDuration, playlistBlock, homePage;

            cuePointsAra = player.mediainfo.cuePoints;
            
            // 如果是首頁  不執行
            homePage = document.getElementsByClassName("home-carousel-video");
            if(homePage[0]){
                console.log("Here is HomePage");   
                return false;
            }else{
                // 播放頁面執行
                // 將為ad cuepoint array 過濾出來 (代 function 進去)
                CodeCuePointsAra = cuePointsAra.filter(isCodeCuePoint);

                // 總長度
                videoDuration = player.mediainfo.duration;
                addCodeMarkers(CodeCuePointsAra, videoDuration);

                if(document.body.clientWidth >= 650){
                    addTitle(CodeCuePointsAra);
                    finPositionChange(CodeCuePointsAra)
                    console.log("In:" + document.body.clientWidth);

                }else{
                    console.log("Out:" + document.body.clientWidth);
                    createUnitDiv();
                    createSecDiv();
                    createCloseP();
                    getInfoIn(CodeCuePointsAra, videoDuration, player);

                    return false;
                }
            } // homePage exist
            console.log("Here is out of if homepage");
        }) //loadstart


/******   For comment    ************************************************************/    

    // 派斷array 每項 ture false  
    function isCodeCuePoint(cuePoint) { return cuePoint.type == 'CODE'; }


    // +++ Add AD cue point markers +++
    var TimeOut, index;
    function addCodeMarkers(CodeCuePointsAra, videoDuration) {
        var playheadWell = document.getElementsByClassName('vjs-progress-control vjs-control')[0];

        for (var i = 0; i < CodeCuePointsAra.length; i++) {
            var el = document.createElement('div');
            el.className = 'vjs-marker';
            el.id = 'code' + i;
            el.style.left = (CodeCuePointsAra[i].time / videoDuration) * 100 + '%';
            playheadWell.appendChild(el);

            // 掛每個的位置
            el.setAttribute("aria-position",i);  

            // 抓到位置後 顯示該位置 在 tooltip 上
            el.onmouseenter = function(){
                if(document.body.clientWidth >= 650){
                    removeAll(CodeCuePointsAra);
                    index = event.target.getAttribute("aria-position");
                    title[index].style.display = "block";

                    // 7 sec 後自動消失
                    TimeOut = setTimeout(function(){title[index].style.display = "none";},7000);
                }else{
                    return false;
                }
            }
        }
    }


/******   For > 650 screen    ************************************************************/    
    
    //  掛第二個標上去  
    function addTitle(CodeCuePointsAra){
        for(i = 0; i < CodeCuePointsAra.length; i++){
            var codeSite = document.getElementById("code" + i);
            var el1 = document.createElement("span");
            el1.className = "title";
            el1.id = "T" + i;
            el1.textContent = CodeCuePointsAra[i].name;
            codeSite.appendChild(el1);
        }
    }   


    //  清除所有的tooltip
    var title;
    function removeAll(CodeCuePointsAra){
        // 把剛剛抓到的 setTimeOut 消失移除 
        clearTimeout(TimeOut);
        title = document.getElementsByClassName("title");
        for(i = 0; i < CodeCuePointsAra.length; i++){
            title[i].style.display = "none";
        }
    }


    // 將player寛度抓出來  減掉 span width 
    // 抓出 cue point 位置 計算是否少於
    var tip, bit, string, nowWidth;
    function finPositionChange(CodeCuePointsAra){
        var limitWidth = V_tag.offsetWidth - 150;
        
        for(i = 0; i < CodeCuePointsAra.length; i++){
            tip = document.getElementById("code" + i);
            // % string 要經過處理 變數字 不一定是兩位 length 無法判斷
            bit = parseFloat(tip.style.left.substr(0,2));
            
            // 小於10要處理
            if(bit >= 10){ string = "0." + bit;
            }else{ string = "0.0" + bit; }
            
            nowWidth = Math.round(V_tag.offsetWidth * string)
            if(nowWidth >= limitWidth ){
                document.getElementById("T" + i).style.right = "150px";
            }
        }
    } 


/******   For phone    ************************************************************/  

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
        var block = '<div class="playlistBlock">' + 
                                '<div class="info">' + 
                                    '<p class="number"></p>段' +   
                                    '<p class="totText">共</p>' +
                                    '<p class="total"></p>分鐘' +                       
                                    '<a class="aLink"></a>' + 
                                '</div>' + 
                '</div>';

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

    /******************************************************************************/

    // 代回?段  共?分鐘 create block
    function getInfoIn(CodeCuePointsAra, videoDuration, player){
        var number = document.getElementsByClassName("number")[0];
        number.textContent = CodeCuePointsAra.length;
        var total = document.getElementsByClassName("total")[0];
        total.textContent = Math.floor(videoDuration/60);

        playlistBlock = document.getElementsByClassName("playlistBlock")[0];
        createBlock(CodeCuePointsAra, player);
    }    

    //  create ? 個 div, 將titleName 代入, 將每段的時間代入 轉跳片段
    var fgm;
    function createBlock(CodeCuePointsAra, player){     
        for(var i = 0 ; i < CodeCuePointsAra.length; i++){       
            var startT = CodeCuePointsAra[i].startTime;

            //一開始將位置 與每段開始的時間標上去      拔掉 function
            var elm ='<div class="unit" aria-position="'+ i +
                    '" aria-time="' + startT + '">'+ '<a name="anchor'+ i +'"></a>' +
                        '<p class="titleName"></p><p class="time"></p></div>';

            // 從第一個小孩以後開始
            playlistBlock.children[i].insertAdjacentHTML("afterend", elm);

            //代回標題
            var titleName = document.getElementsByClassName("titleName");
            titleName[i].textContent = CodeCuePointsAra[i].name;

            //代回 每段需多少時間
            var time = document.getElementsByClassName("time");  
            fgm = CodeCuePointsAra[i].endTime - startT;

            //處理時間格式
            transHrMinSec();     
            time[i].textContent = timeString;

            //因為 抓不到 轉跳片段
            var unit = document.getElementsByClassName("unit");  
            unit[i].onclick = function(){ getPosition(player); }
        }
    } 

    // get target indexP and startTime then change playing time
    function getPosition(player){

        // 抓點擊的位置 與開始時 個別掛上去
        var eTarget = event.target;
        var indexP = eTarget.getAttribute("aria-position");
        var getStartT = eTarget.getAttribute("aria-time");

        // if抓到不是unit 抓爸爸 重新抓位置跟開始時間
        var posClassName = eTarget.className 
        if(posClassName != "unit"){
            posClassName = eTarget.parentNode;
            indexP = posClassName.getAttribute("aria-position");
            getStartT = posClassName.getAttribute("aria-time");
        }    

        player.currentTime(getStartT);
        player.play();   

        closeX();
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

    // 關閉 單元一覽
    function closeX(){ div2.style.display = "none"; }
    
}); // plugin
