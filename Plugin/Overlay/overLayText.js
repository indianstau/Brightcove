videojs.plugin('plugintry',function (options) {
    var myplayer = this;
    myplayer.overlay({
        overlays:
        [
            {   align:'top-right',
                content:'<div id="one">'+
                        '<img id="close1">'+
                        '<input id="ad" title="海尼根">'+
                        '</div>',
                start:1,
                end:30
            },{ 
                align:'bottom-left',
                content:'<div id="two">'+
                        '<img id="close2">'+
                        '<input id="ad2" title="參加抽獎">'+
                        '<a id="linkToweb"></a>'+
                        '</div>',
                start:2,
                end:60
            }
        ]//lays
    });//myplayer.overlay

    var divOne = document.getElementById('one'); 
    var nodeID = document.getElementById('close1');        
       nodeID.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/High-contrast-dialog-close.svg/768px-High-contrast-dialog-close.svg.png";
       nodeID.style = "height:20px;width:20px;position:absolute;left:7px;cursor:pointer;"  

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
        ad1.src = 'http://www.ezpr.com.tw/wp-content/uploads/2015/04/heineken-logo.png';
        ad1.style = "height:75px;width:100px;";             
    ad1.onclick = function link() {
        window.open("https://www.heineken.com/tw/agegateway?returnurl=%2ftw","_blank");
    };

    var ad2 = document.getElementById('ad2');
        ad2.setAttribute('type','image');
        ad2.src = "http://www.biosmonthly.com/uploads/content/%E3%80%90%E5%9C%96%E8%AA%AA%E4%B8%80%E3%80%91%E6%89%93%E9%96%8B%E6%B5%B7%E5%B0%BC%E6%A0%B9%EF%BC%8C%E4%B8%80%E5%90%8C%E5%8F%83%E5%8A%A0%E4%B8%96%E7%95%8C%E5%9F%8E%E5%B8%82%E5%A4%A7%E6%8A%BD%E7%8D%8E%EF%BC%81.jpg";
        ad2.style = "width:160px;height:120px;";        
    ad2.onclick = function openYu(){
        window.open("https://www.youtube.com/watch?v=VBljxzguKVw","_blank");
    };     
    var linkTo = document.getElementById('linkToweb');
        linkTo.href = "https://www.heineken.com/tw/agegateway?returnurl=%2ftw";
        linkTo.target = "_blank";
        linkTo.style = "padding-left:10px;color:#F9F900;";
        linkTo.innerHTML = "我以為海尼根不會再更過火，但是我錯了";    
});
