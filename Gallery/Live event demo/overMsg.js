/* 當Live 結束時  會有鑲入的問卷調查 在loading 時間  跳出提示msg 5s */
var player, box;
videojs.registerPlugin('overMsg',function(){
        player = this;
        console.log('>>> plugin inside line 4');
        player.on('ended',function(){
                box = document.getElementsByClassName('vjs-overlay vjs-overlay-top vjs-overlay-background')[0]
                console.log(box);
                console.log("here is box >>> line 7")
                setTimeout(function(){box.style.display = 'none';},5000);
                console.log('Here is style');
                setTimeout(function(){box.classList.add('hid');},5000);
                console.log('Here is classList');
        }) 
});
