videojs.plugin('videolist', function () {
    console.log('hello');
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
    

//    var movieN = ["Vampire Diaries","Lost Girl","Orange Is the New Black",
//                  "Orphan Black","Rizzoli & Isles","Teen Wolf"];
//    var movieSec = [0,126,284,401,515,650];
//    var movieName = NewDiv2.childNodes;
//    
//    for (var i=0; i<6; i++) {   
//    var NewBS1 = document.createElement('div');
//        NewBS1.appendChild(document.createTextNode(movieN[i]));
//        NewDiv2.appendChild(NewBS1);          
//        spacer.appendChild(NewDiv2);
//        addMovieClickEvent(movieName[i], movieSec[i]);
//
//    
//    function addMovieClickEvent (node, secs) {
//        node.onclick = function() { myplayer.currentTime(secs); }
//    }   
//    
//    //show dropdown        
//    NewImg.onclick = function () {
//        NewDiv2.classList.toggle("show");
//    };
//    
//    //旁邊關閉dropdown    
//    window.onclick = function(event) {    
//        if (!event.target.matches('#dropImg')) { 
//            if(NewDiv2.classList.contains('show')){
//                NewDiv2.classList.remove('show');
//            }
//        }
//    };


});