videojs.plugin("ErrorMsg",function(){
var spacer = document.getElementsByClassName("vjs-spacer")[0]; 
var newP = document.createElement('p');
    newP.id ="eMark";
    newP.textContent = "!";
    newP.title = "Problem report";
    newP.setAttribute("style","font-family:serif;font-size:18px;font-weight:bold;color:#fff;cursor:pointer;margin-top:6px;");
    spacer.setAttribute("style","justify-content:flex-end;");
    spacer.appendChild(newP); 
    newP.onclick = function(){
        window.open('https://docs.google.com/forms/d/1L4dnmWEyZ0F9Ji_KETUaewwCEFw3-uHBnoOHydb-sOU/edit?usp=sharing','Brightcove問題回報');
    };
    
});