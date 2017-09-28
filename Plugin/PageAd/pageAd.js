videojs.plugin('pageAd',function(){
    var tt, ttt, jToO, data;
    var player = videojs("player");
   
    player.one('loadedmetadata',function(){
        datain();
        createEl(); 
        createJs();
        jqueryAni()
        adSkip();
    });     
  
    
    function datain(){
        tt = player.textTracks()[1];
        if(tt.activeCues[0] !== undefined ){
            ttt = tt.activeCues[0].text;
            jToO = JSON.parse(ttt);
            data = jToO.id[0];
//             console.log(data);
        }
    }
   
    function createEl() {  
        //catch body first div classname sava var
        var getDivFirstClass = $('body div:first-child').attr('class');
        var fClassName = document.getElementsByClassName(getDivFirstClass); 
        
        var el = document.createElement('div');
            el.style.marginTop = '100px';    
            el.insertAdjacentHTML('beforeend','<div id="outside"><div id="mdiv">'+   
           '<div class="mbody" id="insterSct">'+
               '<video data-video-id="' + data.video + '"'+
                        'id="ad"'+
                        'data-account="'+ data.account +'"'+
                        'data-player="'+ data.player +'"'+
                        'data-embed="default"'+
                        'data-application-id'+
                        'class="video-js"'+   
                        'autoplay>'+    
                '</video>'+     
                '<a href="'+ data.adurl +'">'+
              '<img src="'+ data.imgsrc +'" class="adPic"></a>'+
            '</div>'+

            '<div class="mfooter">'+
                '<a href="https://www.brightcove.com/en/online-video-platform">'+
                '<img class="brLogo" src="http://streamroot.test.s3.amazonaws.com/logos/brigthcove.png"></a>'+
                 '<div class="sDiv">'+
                      '<span class="sym0">&#x3e;</span>'+
                      '<span class="sym1">&#x3e;</span>'+
                      '<span class="sym2">&#x3e;</span>'+
                      '<button class="skipAdBtn">略過廣告</button>'+
                 '</div>'+
            '</div></div></div>');
            fClassName[0].appendChild(el);
    }
             
    function createJs() {
        var insSct = document.getElementById('insterSct');  
        var createScript = document.createElement('script');
            createScript.setAttribute('src', "http://players.brightcove.net/"+ data.account +"/"+ data.player +"_default/index.min.js");
            createScript.setAttribute('type', "text/javascript"); 
            insSct.appendChild(createScript);        
    }
     
    function jqueryAni() {
        //JQuery ani backgroundColor slideDown remove 
        $(document).ready(function(){
            $('#outside').css("backgroundColor", "rgba(0,0,0,0.3)");
            $('#mdiv').slideDown();
            $('.skipAdBtn').click(function(){
                $('#mdiv').slideToggle();
                $('#mdiv').remove();
                $('body').removeAttr("style");
                $('#outside').css("backgroundColor", "transparent");
            });
        });
    }
    
    function adSkip() {
        // ad video
        var video = document.getElementsByTagName('video')[0];
        var adbtn  = document.getElementsByClassName('skipAdBtn')[0];

        video.addEventListener('timeupdate', createAdskipBtn, false);
            function createAdskipBtn() {
                if(adbtn.style.visibility != 'visible'){
                    if(video.currentTime >= 5){
                        adbtn.style.visibility = 'visible';
                    }   
                }
            }
    }

});      
