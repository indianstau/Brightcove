videojs.plugin('CodeMarksOnProgress',function(){
    
    //自動抓 video tag id
    var videoTag = document.getElementsByTagName("video");
    var V_tag = document.getElementById(videoTag[0].id);

   //performPlayer_html5_api vjs_video_3_html5_api
   //var V_tag = document.getElementById("vjs_video_3_html5_api");       
    
    var player = this;

    player.on('loadstart', function() {
        var cuePointsAra = [],
            CodeCuePointsAra = [],
            videoDuration;

        cuePointsAra = player.mediainfo.cuePoints;

        // 將為ad cuepoint array 過濾出來 (代 function 進去)
        CodeCuePointsAra = cuePointsAra.filter(isCodeCuePoint);
        
        // 總長度
        videoDuration = player.mediainfo.duration;
        addCodeMarkers(CodeCuePointsAra, videoDuration);
        addTitle(CodeCuePointsAra);
        finPositionChange(CodeCuePointsAra)
    });
    
    
    // 判斷array 每項 ture false  
    function isCodeCuePoint(cuePoint) {
        return cuePoint.type == 'CODE';
    }


    // +++ Add AD cue point markers +++
    var TimeOut;
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

            // 抓到位置後 顯示該位置
            el.onmouseenter = function(){
                removeAll(CodeCuePointsAra);
                index = event.target.getAttribute("aria-position");
                title[index].style.display = "block";
                // 7 sec 後自動消失
                TimeOut = setTimeout(function(){title[index].style.display = "none";},7000);
            }
        }
    }


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
    function finPositionChange(CodeCuePointsAra){
        limitWidth = V_tag.offsetWidth - 150;
        for(i = 0; i < CodeCuePointsAra.length; i++){
            tip = document.getElementById("code" + i);
            string = parseFloat("0." + tip.style.left.substr(0,2));
            nowWidth = Math.round(V_tag.offsetWidth * string)
            if(nowWidth >= limitWidth ){
               document.getElementById("T" + i).style.right = "150px";
            }
        }
    }        
});

    
