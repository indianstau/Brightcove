videojs.plugin('videolist', function () {
//    var player = videojs('myPlayerID');   
   var player = videojs('vjs_video_3');  
    console.log('hello');
//    var player = this;
    console.log(player);
    player.muted(true); 
    
    var NewDiv1 = document.createElement('div');
        NewDiv1.setAttribute('id','dropdown');
    
    var NewImg = document.createElement('img');
        NewImg.src = 'https://cdn4.iconfinder.com/data/icons/bold-purple-free-samples/32/List_Text_Menu_Numbers_String_Burger-20.png';
        NewImg.setAttribute('id','dropImg');

    var spacer = document.getElementsByClassName('vjs-spacer')[0];
        NewDiv1.appendChild(NewImg);
        spacer.appendChild(NewDiv1);

    var NewDiv2 = document.createElement('div');
        NewDiv2.setAttribute('class','mydropdown');
//        movieName = NewDiv2.childNodes; 
    
    
        var tt, jsonData, sec, cn, fr, en;
//將data存在textTracks裡,從Json轉成JS物件存取出來
    player.one("loadedmetadata", function () {
                      console.log("one here");
        tt = player.textTracks()[1];
                        console.log(tt +'1');
        tt.oncuechange = function (){
            if (tt.activeCues[0] !== undefined){
                jsonData = JSON.parse(tt.activeCues[0].text);
                      console.log(tt.activeCues[0]+'2');
                      console.log(jsonData+'3');
                sec = jsonData.sec;
                      console.log(sec+'4');
                en = jsonData.language.English;
                fr = jsonData.language.France;
                cn = jsonData.language.Chinese;
                      console.log(fr + " " + 'in');
                      console.log(en+'5');
            }
        }
    });  
//    var abc = 'abc';
//                      console.log(fr + 'out');
//    for (var i=0; i<6; i++) {   
//    var NewBS1 = document.createElement('div');
//        NewBS1.appendChild(document.createTextNode(en[i]));
//        NewDiv2.appendChild(NewBS1);          
//        spacer.appendChild(NewDiv2);
//        addMovieClickEvent(en[i], Sec[i]);
//    }
//    
//    function addMovieClickEvent (node, secs) {
//        node.onclick = function() { player.currentTime(secs); }
//    } 
    
    //show dropdown        
    NewImg.onclick = function () {
        NewDiv2.classList.toggle("show");
    };
    
    //旁邊關閉dropdown    
    window.onclick = function(event) {    
        if (!event.target.matches('#dropImg')) { 
            if(NewDiv2.classList.contains('show')){
                NewDiv2.classList.remove('show');
            }
        }
    }


});