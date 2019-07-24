///////////////////
// Detail
// 
window.onload = function(){
    sendURLback('URLpath');
    pickFileName();
    showStat();
}

// From id to get URLpath to handle string 
// python get URL
function sendURLback(id){
    try{
        // Get Filepath string 
        URLpath = document.getElementById(id).textContent;
        string = "../../" + URLpath.slice(3);

        // Get Filename Extension 
        ffstrIndex = URLpath.lastIndexOf(".");
        fileForm = URLpath.substr(ffstrIndex + 1)

        // Get FileName
        fileNameIndex = URLpath.lastIndexOf("/");
        fileName = URLpath.substr(fileNameIndex+1);

        // img || a tag   
        screenShot1 = document.getElementById("screenShot1");
        pURLsite = document.getElementById("pRULsite");

        if(fileForm == "png" || fileForm == "jpg"){
            screenShot1.src = string;
        }else{
            pURLsite.href = string;
            pURLsite.textContent = fileName;
        }
    }catch(e){}
}

//upload file    
function pickFileName(){
    try{
        document.getElementById("file").addEventListener("change",function(){
            pickFileName = document.getElementById("pickFileName");
            pickFileName.innerHTML = file.value ;
        },false)
    }catch(e){}
}

//get statCode and show stat
function showStat(){
    try{
        statText = document.getElementById("statText");
        statCode = statText.textContent;
        stat = document.getElementById("stat");    
        stat.options[statCode].selected = true;
    }catch(e){}
}


///////////////////
// Question
// For Tabs 
function tabsOpen(id){
    tabs_m = document.getElementsByClassName("tabs-m")
    tab_content = document.getElementsByClassName("tabContent");
    
    /* 清空上一個顯示與樣式
       結構不同　line 59　視情況 i + 1*/
    for (var i = 0; i < tab_content.length ; i++){
        pill_id = tabs_m[0].children[i+1].id;
        document.getElementById(pill_id).classList.remove("selectOnG");
        tab_content[i].classList.remove("show");
    }
    document.getElementById(event.target.id).classList.add("selectOnG");
    document.getElementById(id).classList.add("show");
}
  
// Show search input clean btn  
searchClean = document.getElementById("searchClean");
inputSearchBtn = document.getElementsByClassName("inputSearchBtn");
function inputCleanBtnShow(){
        if(searchInput.value != ""){
            searchClean.classList.remove("hidden");
            inputSearchBtn[0].classList.add("mL-N");
            searchInput.style.width = "150px";
        }else{
            cleanKeyinChangeWidth();
        }
}

//when clean keyin show cross change input text width
function cleanKeyinChangeWidth(){
    searchClean.classList.add("hidden");
    inputSearchBtn[0].classList.remove("mL-N");
    searchInput.style.width = "183px";
}

// 點擊開啟視窗 代要開啟block的className for filter assign
function openWindown(classname){
    
    try{
        // 不同時開兩個視窗
        assignArea = document.getElementsByClassName("assignArea")[0];
        filterAreaA = document.getElementsByClassName("filterAreaA")[0];

        filterAreaA.style.display = "none";
        assignArea.style.display = "none";
    }catch(e){}
    
    className = document.getElementsByClassName(classname)[0];
    className.style.display = "block";    
}

// 點 X 關閉視窗 自動抓點擊位置className 上一層父元素className 代 cross index
function closeWindownCross(number){
    cross = document.getElementsByClassName("cross"); 
    f_className = cross[number].parentElement.className;
    s_site = document.getElementsByClassName(f_className)[0];
    s_site.style.display = "none";
} 

// 關閉視窗 代要關block的className for filter assign
function closeWindown(classname){
    try{
        className = document.getElementsByClassName(classname)[0];
        className.style.display = "none";
    }catch(e){}
}

// filter & input search clean 
 function filterClean(){
    cleanKeyinChangeWidth();
     
    selectOption = document.getElementsByClassName("selectStyle")
    datep = document.getElementById("datepicker");
    datep1 = document.getElementById("datepicker1");
    datep.value = "";
    datep1.value = "";
    searchInput.value = "";
    selectOption[0].options[0].selected = true;
 }  
 
// For question custion table datepicker
try{
    $("#datepicker1").datepicker({
        inline: true,
        changeMonth: true,
        changeYear:true,
        dateFormat:'yy-mm-dd',
        autoSize: true,
        maxDate:0,
        minDate:new Date(2017, 1, 01)
    });

    $("#datepicker").datepicker({
        inline: true,
        changeMonth: true,
        changeYear:true,
        dateFormat:'yy-mm-dd',
        autoSize: true,
        maxDate:0,
        minDate:new Date(2017, 1, 01),
        onSelect: function(dat, inst){
            $("#datepicker1").datepicker('option', 'minDate', dat);
        }
    });
}catch(e){}


///////////////////
// Question Admin   
// 分派的判斷
function checkPitch(){
    var site = [];
    member = document.getElementsByClassName("selectStyleP");
    for(var i = 0; i<3; i++){
        site[i] = member[i].value;
    }
    msgerror = document.getElementsByClassName("msgError")[0];
    if(site[0] == 0){
        msgerror.textContent = "*第一項空白";
        msgerror.style.visibility = "visible";
    }else if(site[1] == 0 || site[2] == 0){
        msgerror.style.visibility = "hidden";
        closeWindown('assignArea');
    }else if( site[0] == site[1] || site[1] == site[2] || site[0] == site[2]){
        msgerror.textContent = "*人員重覆";
        msgerror.style.visibility = "visible";
    }else{
        msgerror.style.visibility = "hidden";
        closeWindown('assignArea');
    }
}

// optin clean & Error msg hidden for pitch
//function cleanPitchContent(){
//    member = document.getElementsByClassName("selectStyleP");
//    for(var i = 0; i<3; i++){
//        member[i].options[0].selected ="true"
//    }
//    msgerror = document.getElementsByClassName("msgError")[0];
//    msgerror.style.visibility = "hidden";
//}
