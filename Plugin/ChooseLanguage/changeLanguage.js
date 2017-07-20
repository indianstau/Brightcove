videojs.plugin('changeLanguage',function (options) {

//function initdata() {
var myplayer = videojs('vjs_video_3');
    myplayer.muted(true); 
    
    //放選單的content div
    var NewDiv1 = document.createElement('div');
        NewDiv1.setAttribute('id','dropdown');
    
    //上拉選單圖
    var NewImg = document.createElement('img');
        NewImg.src = 'https://cdn4.iconfinder.com/data/icons/bold-purple-free-samples/32/List_Text_Menu_Numbers_String_Burger-20.png';
        NewImg.setAttribute('id','dropImg');

    //control bar 放的位值  要掛上去
    var spacer = document.getElementsByClassName('vjs-spacer')[0];
        spacer.appendChild(NewImg);
        spacer.appendChild(NewDiv1);
        
    //上拉選單的選項 div
    var NewDiv2 = document.createElement('div');
        NewDiv2.setAttribute('class','mydropdown');
    
    var movieN = ["Vampire Diaries","Lost Girl","Orange Is the New Black",
                  "Orphan Black","Rizzoli & Isles","Teen Wolf"];
    
    //把選項掛上去
    for (var i=0; i<6; i++) {   
    var NewBS1 = document.createElement('div');//NewBS1會成為最後一個 而非全部Teen Wolf
        NewBS1.appendChild(document.createTextNode(movieN[i]));
        //NewBS1.setAttribute('id','option'+[i]);
        NewDiv2.appendChild(NewBS1);          
        spacer.appendChild(NewDiv2);
    };  
    
    //把click 切換影片位置掛上去選單上
    //var movieSec = [0,126,284,401,515,650];
    var node = NewDiv2.childNodes;
    //NewDiv2.childNodes[0].onclick = function() { myplayer.currentTime(movieSec[0]);}
    node[0].onclick = function() { myplayer.currentTime(sec[0]);}
    node[1].onclick = function() { myplayer.currentTime(sec[1]);}
    node[2].onclick = function() { myplayer.currentTime(sec[2]);}
    node[3].onclick = function() { myplayer.currentTime(sec[3]);}
    node[4].onclick = function() { myplayer.currentTime(sec[4]);}
    node[5].onclick = function() { myplayer.currentTime(sec[5]);}    
//}
    
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
    
/*****************************加入選語言字幕 同時改面版顯示的語言**************************************/ 
    
    //將data存在textTracks裡,從Json轉成JS物件存取出來   
    var tt, jsonData, sec, cn, fr, en;
    var liEn, liFr, liCh;
    myplayer.one("loadedmetadata", function () {
        tt = myplayer.textTracks()[3]; 
        datain();

        liEn = document.getElementsByTagName('li')[4];
        liFr = document.getElementsByTagName('li')[5];
        liCh = document.getElementsByTagName('li')[6];

    liFr.onclick = function changeFr() {for (i=0; i<6; i++) {node[i].innerHTML = fr[i];}}       
    liEn.onclick = function changeEn() {for (i=0; i<6; i++) {node[i].innerHTML = en[i];}} 
    liCh.onclick = function chengeCh() {for (i=0; i<6; i++) {node[i].innerHTML = cn[i];}}
    });

    //字幕掛brightcove UI 上  選單語言也是
    function datain() {
        if (tt.activeCues[0] !== undefined){
                jsonData = JSON.parse(tt.activeCues[0].text);
                sec = jsonData.sec;
                en = jsonData.language.English;
                fr = jsonData.language.France;
                cn = jsonData.language.Chinese;
        }   
    }
})
