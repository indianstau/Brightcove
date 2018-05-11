// try Gallery web site type will change or not
// check homePage  error msg
// rwd 650 -700 is miss

videojs.registerPlugin('CodeMarksOnProgressP',function(){  

    // auto get video tag id
    var videoTag = document.getElementsByTagName("video");
    var V_tag = document.getElementById(videoTag[0].id);

    var player = this;

        player.on('loadstart', function(){
            
            var cuePointsAra = [],
                CodeCuePointsAra = [],
                videoDuration, playlistBlock, homePage;

            cuePointsAra = player.mediainfo.cuePoints;
            
            // If homePage not doing
            homePage = document.getElementsByClassName("home-carousel-video");
            if(homePage[0]){
                console.log("Here is HomePage");   
                return false;
            }else{
                // Play page in
                // filter ad cuepoint array out (get function in)
                CodeCuePointsAra = cuePointsAra.filter(isCodeCuePoint); 

                // Total length about video 
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

    // 派斷 conditional operator array evey cue point ture false  
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

            // Hang on every cue point site
            el.setAttribute("aria-position",i);  

            // get position show index on tooltip
            el.onmouseenter = function(){
                if(document.body.clientWidth >= 650){
                    removeAll(CodeCuePointsAra);
                    index = event.target.getAttribute("aria-position");
                    title[index].style.display = "block";

                    // after 7 sec auto disappear
                    TimeOut = setTimeout(function(){title[index].style.display = "none";},7000);
                }else{
                    return false;
                }
            }
        }
    }


/******   For > 650 screen    ************************************************************/    
    
    //  hung on second (span)
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


    //  clean all tooltip
    var title;
    function removeAll(CodeCuePointsAra){
        // 把剛剛抓到的 setTimeOut 消失移除 
        clearTimeout(TimeOut);
        title = document.getElementsByClassName("title");
        for(i = 0; i < CodeCuePointsAra.length; i++){
            title[i].style.display = "none";
        }
    }


    //  get player width  - span width 
    // get cue point index count if less than 
    var tip, bit, string, nowWidth;
    function finPositionChange(CodeCuePointsAra){
        var limitWidth = V_tag.offsetWidth - 150;
        
        for(i = 0; i < CodeCuePointsAra.length; i++){
            tip = document.getElementById("code" + i);
            // % string need to hanele change to number, sometime it's not digits in ten, length can't determine
            bit = parseFloat(tip.style.left.substr(0,2));
            
            // less than 10 need to handle
            if(bit >= 10){ string = "0." + bit;
            }else{ string = "0.0" + bit; }
            
            nowWidth = Math.round(V_tag.offsetWidth * string)
            if(nowWidth >= limitWidth ){
                document.getElementById("T" + i).style.right = "150px";
            }
        }
    } 


/******   For phone    ************************************************************/  

    // grow out unit div, can click it show list
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

    // grow out playlistBlock div area
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
        
        // cause hung on function still undefined
        var close = document.getElementsByClassName("closeWin")[0];
        close.onclick = function(){ closeX(); };
    }

    /******************************************************************************/

    // bring back how many fragment, total min, create block
    function getInfoIn(CodeCuePointsAra, videoDuration, player){
        var number = document.getElementsByClassName("number")[0];
        number.textContent = CodeCuePointsAra.length;
        var total = document.getElementsByClassName("total")[0];
        total.textContent = Math.floor(videoDuration/60);

        playlistBlock = document.getElementsByClassName("playlistBlock")[0];
        createBlock(CodeCuePointsAra, player);
    }    

    //  create how many div, bring titleName in, bring back time hung on every one then jump that currentTime
    var fgm;
    function createBlock(CodeCuePointsAra, player){     
        for(var i = 0 ; i < CodeCuePointsAra.length; i++){       
            var startT = CodeCuePointsAra[i].startTime;

            // at first get index and startTime hang on every fragment    (romove function, undefined)
            var elm ='<div class="unit" aria-position="'+ i +
                    '" aria-time="' + startT + '">'+ '<a name="anchor'+ i +'"></a>' +
                        '<p class="titleName"></p><p class="time"></p></div>';

            // after first child start
            playlistBlock.children[i].insertAdjacentHTML("afterend", elm);

            // bring back title 
            var titleName = document.getElementsByClassName("titleName");
            titleName[i].textContent = CodeCuePointsAra[i].name;

            // bring back how long on every fragment
            var time = document.getElementsByClassName("time");  
            fgm = CodeCuePointsAra[i].endTime - startT;

            // change time format
            transHrMinSec();     
            time[i].textContent = timeString;

            // cause can't get function to do video currentTime so write out
            var unit = document.getElementsByClassName("unit");  
            unit[i].onclick = function(){ getPosition(player); }
        }
    } 

    // get target indexP and startTime then change playing time
    function getPosition(player){

        // catch click node and startTime hang on every one
        var eTarget = event.target;
        var indexP = eTarget.getAttribute("aria-position");
        var getStartT = eTarget.getAttribute("aria-time");

        // if get not unit catch father and reset index and startTime
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

    // change time format
    var timeString;
    function transHrMinSec(){
        var hr = Math.floor(fgm/3600);
        var min = Math.floor((fgm-hr*3600)/60);
        var sec = Math.floor(fgm-hr*3600-min*60); 

        //　hr min sec digits in ones
        if(hr.toString().length < 2){hr = "0" + hr;}
        if(min.toString().length < 2){min = "0" + min;}  
        if(sec.toString().length < 2){sec = "0" + sec;}

        if(hr == 0){
            timeString = min + ":" + sec;
        }else{
            timeString = hr + ":" + min + ":" + sec;  
        }
    }

    // close list
    function closeX(){ div2.style.display = "none"; }
    
}); // plugin
