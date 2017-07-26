videojs.plugin('moviebook', function () {   

    var player = this;
//    var myplayer = document.getElementById('vjs_video_3');
    var vMid = document.getElementsByTagName('video')[1].id;
    var video = document.getElementById(vMid);
//    var video = document.getElementById('vjs_video_3_html5_api');
//var fullBtn = document.getElementsByClassName('vjs-fullscreen-control vjs-control vjs-button')[0];

//    player.one('loadedmetadata', function () { 
        var ypp = new zhiruyi({
            video:vMid,
            mid:'4338674',
            cpid:'9',
            resolution:'260000',
            debug:true
        });
//    });//one canplay
//    console.log('player loadedmetadata');

    function switchs(){
        ypp.reSetAd({
        video:vMid,
        mid:'4338674',
        cpid:'9',
        resolution:'440000'
        });
    }

    function formatSeconds(value){
        var h,o,m,s = parseInt(value);

        h = Math.floor (value / 3600);
        o = value % 3600;
        m = Math.floor (o / 60);
        s = parseInt(o % 60);

        h = !h ? '00' : (h < 10 ? '0'+h : h);
        m = !m ? '00' : (m < 10 ? '0'+m : m);
        s = !s ? '00' : (s < 10 ? '0'+s : s);

        return h+':'+m+':'+s;
    };  

    function eventSwitch(o,e,f){
        o.attachEvent?o.attachEvent("on"+e,f):o.addEventListener(e,f,!1);
    };    
    
    function VideoENeedVideoPause(){video.pause();};
    function VideoENeedVideoResume(){video.play();};
});  

