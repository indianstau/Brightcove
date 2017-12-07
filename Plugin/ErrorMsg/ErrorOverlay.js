videojs.registerPlugin("ErrorMsgOverlay",function(){
    var player = videojs("vjs_video_3");
    player.one("loadstart",function(){
        player.on("error",function(){
        var errorOKbtn = document.getElementsByClassName("vjs-errors-ok-button-container")[0];
        var newElbtn = document.createElement('button');
            newElbtn.id = "eMarki";
            newElbtn.textContent = "Report";
            newElbtn.onclick = function(){
                window.open("https://docs.google.com/forms/d/1L4dnmWEyZ0F9Ji_KETUaewwCEFw3-uHBnoOHydb-sOU/edit?usp=sharing");
            };
            errorOKbtn.appendChild(newElbtn);   
        }); 
    });    
});
