videojs.plugin('InplayerStyle',function(){
    
    var left_c, right_c;
    
    var inplayer = document.getElementById("inplayer-bc-plugin-preview");
    
    if (inplayer){ 
    
//     player.on("loadeddata",function(){  
        
    left_c = document.getElementsByClassName("left_container")[0];
    right_c = document.getElementsByClassName("right_container")[0];
    
    left_c.style.backgroundColor = "#8fbc8f";
    
    //[0] p
    right_c.childNodes[1].children[0].style.fontSize = "28px";
    right_c.childNodes[1].children[0].style.padding = "20px";
    right_c.childNodes[1].children[0].style.fontFamily = "-webkit-pictograph";
    
    //[2] div  loadstart  loadeddata
    right_c.childNodes[1].children[2].style.fontSize = "16px";
    right_c.childNodes[1].children[2].style.fontFamily = "-webkit-pictograph";
        
    }     
        
//     });
    
})
