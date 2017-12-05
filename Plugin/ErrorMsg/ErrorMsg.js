videojs.registerPlugin("ErrorMsg",function(){
    
var player = this;
    
    player.one("loadstart",function(){
        var spacer = document.getElementsByClassName("vjs-spacer")[0]; 
        var newElbtn = document.createElement('button');
        newElbtn.id = "eMarkBtn";
        newElbtn.style.width = "30px";
        newElbtn.style.height = "20px";
        newElbtn.style.marginTop = "6px";
        newElbtn.style.display = "block";
        newElbtn.style.paddingRight = "12px";

        var newEli = document.createElement('i');
        newEli.id ="eMarki";
        newEli.title = "Problem report";
        newEli.setAttribute("style",";cursor:pointer;font-size: 15px;padding-left: 8px;");

        var newEla = document.createElement('a');
        newEla.id = "itema";
        newEla.textContent = "問題回報";
        newEla.className = "errorReporta";
        newEla.setAttribute("href","https://docs.google.com/forms/d/1L4dnmWEyZ0F9Ji_KETUaewwCEFw3-uHBnoOHydb-sOU/prefill");
        newEla.setAttribute("target","_blank");

        spacer.setAttribute("style","justify-content:flex-end;");
        newElbtn.appendChild(newEla);
        newElbtn.appendChild(newEli); 
        spacer.appendChild(newElbtn);    

        var btn = document.getElementById("eMarkBtn");
        btn.onclick = function(){
            newEla.classList.toggle("show");
        };

        window.onclick = function(event){
            if(!event.target.matches('#eMarki')){
                if(newEla.classList.contains('show')){
                    newEla.classList.remove('show');
                }
            }
        }; 
    });   
});
