videojs('myPlayerID').ready(function() {
    myplayer = this;
   /* console.log('ready event trigger');   debug用*/
            
   /*https://docs.brightcove.com/en/perform/brightcove-player/guides/adding-captions-to-videos.html   字幕設定*/
    
    newSettings = {
        'fontFamily': 'casual',
        'edgeStyle': 'Dropshadow',
        'backgroundOpacity': '0',
    };
    myplayer.textTrackSettings.setValues(newSettings);

    myplayer.one('loadedmetadata',function() {
       /* console.log('event trigger');
        /* myplayer.muted(true);  靜音*/
        
        /*直接加字幕   https://docs.brightcove.com/en/perform/brightcove-player/guides/adding-captions-to-videos.html*/
        var frTrack = myplayer.addRemoteTextTrack({
            kind: 'captions',
            language:'fr',
            label: 'French',
            src:'http://solutions.brightcove.com/bcls/captions/adding_captions_to_videos_french.vtt'
        });
        
        myplayer.overlay({
            overlays:
            [
                {   align:'top-right',
                    content:'<div id="one">'+
                            '<img id="close1">'+
                            '<input id="ad" title="想吃漢堡嗎?">'+
                            '</div>',
                    start:1,
                    end:10
                },{ 
                    align:'bottom-left',
                    content:'<div id="two">'+
                            '<img id="close2">'+
                            '<input id="ad2" title="Bmx是一種極限運動">'+
                            '<a id="linkToweb"></a>'+
                            '</div>',
                    start:2,
                    end:15
                },{
                    align:'top-right',
                    content:'<div id="time" title="我是時間"></div>',
                    start:16,
                    end:256
                }
            ]//lays
        });//myplayer.overlay
             /*-------JS createElement 'img' 給ID style 傳不進去 無效-----------------------*/
        var divOne = document.getElementById('one'); 
        var nodeID = document.getElementById('close1');        
           nodeID.src = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-circled-128.png";
           nodeID.style = "height:20px;width:20px;position:absolute;left:17px;cursor:pointer;"  
            
        var node2 = document.getElementById('close2');                    
            node2.src= nodeID.src;
            node2.style = "height:20px;width:20px;position:absolute;left:7px;top:7px;cursor:pointer";
         
        
        var divTwo = document.getElementById('two');
        
        nodeID.onclick = function deleteP() {
           divOne.addEventListener('click',function(){
               divOne.style.display = 'none';  
           });
        }
        node2.onclick = function deleteP() {
           divTwo.addEventListener('click',function(){
                divTwo.style.display = 'none';
           });
        };

        var ad1 = document.getElementById('ad');
            ad1.setAttribute('type','image');
            ad1.src = 'https://lh5.googleusercontent.com/-0opy1PkE0a4/Vo6FyqGw1RI/AAAAAAAAByg/WMcbEd_nh-Q/tumblr_lrzjg5o0O61r3dgmdo1_r1_500.gif';
            ad1.style = "height:75px;width:100px;";             
        ad1.onclick = function link() {
            window.open("https://www.bk.com/","_blank");
        };

        var ad2 = document.getElementById('ad2');
            ad2.setAttribute('type','image');
            ad2.src = "http://mellonbmx.com/wp-content/uploads/2012/04/Temperedbikes_Anthony_ad_v21-e1335359573987.jpg";
            ad2.style = "width:220px;height:70px;";        
        ad2.onclick = function openYu(){
            window.open("https://www.youtube.com/watch?v=Y31E2-u6Arw","_blank");
        };     
        var linkTo = document.getElementById('linkToweb');
            linkTo.href = "http://bmx.transworld.net/";
            linkTo.target = "_blank";
            linkTo.style = "padding-left:10px;";
            linkTo.innerHTML = "BMX: STREET FINALS - SIMPLE SESSION 2017";
        
        /*時間*/
        var myVar = setInterval(myTimer , 1000);
        function myTimer () {
            var d = new Date();
            document.getElementById('time').innerHTML = d.toLocaleTimeString();
        };
        
    });//on

});//ready

