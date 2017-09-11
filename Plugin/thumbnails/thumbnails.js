videojs.plugin('thumbs', function(){
    var tt, ttt, jToO, data; 
    var url, jpg, count, secAry, secGroup; 
    var player = videojs('vjs_video_3');
     
    player.one('loadedmetadata', function(){
        
    datain(); 
    createAry();
        
    function datain(){                        
        tt = player.textTracks()[1];
        if (tt.activeCues[0] !== undefined) { 
            ttt = tt.activeCues[0].text;
            jToO = JSON.parse(ttt);
            data = jToO.Thumbnails[0];         
        }        
    } 
               
    function createAry() {
        url = data.url;         
        jpg = data.jpg;         
        count = data.count;      
        secAry = 0;
        secGroup = [];                                                
        for(var i=0; i<data.length; i++){   
            secGroup[secAry] = ({src: url + count + jpg});
            secGroup[0].style = ({left: '0',width: '80px',height: '60px'});  
            if(i>11) { secGroup[secAry].style = ({left: '-40px'}); }
            if(i>182) { secGroup[secAry].style = ({left: '-80px'}); }
            count += 1;             
            secAry += data.sec;                               
        }
            console.log(secGroup);
            player.thumbnails(secGroup);
        }
    });   
});