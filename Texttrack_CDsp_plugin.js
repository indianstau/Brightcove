videojs.plugin('videolist', function () {
//    console.log('hello');
//        var myplayer = videojs('myPlayerID');

        var player = this;
    
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
    
    //將data存在textTracks裡,從Json轉成JS物件存取出來
    var jsonData, sec, cn, fr, en;
    player.one("loadedmetadata", function () {
        console.log('Here one ')
        var tt = player.textTracks()[1];
        console.log(tt);
        tt.oncuechange = function (){
            if (tt.activeCues[0] !== undefined){
                console.log(tt.activeCues[0]);
                jsonData = JSON.parse(tt.activeCues[0].text);
                sec = jsonData.sec;
                en = jsonData.language.English;
                fr = jsonData.language.France;
                cn = jsonData.language.Chinese;
                console.log(cn);
            }
        }
    });
    
    var movieName = NewDiv2.childNodes;
    
    for (var i=0; i<6; i++) {   
    var NewBS1 = document.createElement('div');
        NewBS1.appendChild(document.createTextNode(fr[i]));
        NewDiv2.appendChild(NewBS1);          
        spacer.appendChild(NewDiv2);
        addMovieClickEvent(movieName[i], sec[i]);
        console.log(movieName[3]);
        console.log(sec[3]);
    }
    
    function addMovieClickEvent (node, secs) {
        node.onclick = function() { player.currentTime(secs); }
    } 
    
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
    };


});