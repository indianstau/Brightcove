var player, text;
videojs.registerPlugin('overMsg',function(){
        player = this;
        console.log('>>> plugin inside line 4');
        player.on('ended',function(){
                text = document.getElementsByClassName('vjs-overlay vjs-overlay-top vjs-overlay-background')[0]
                console.log(text);
                console.log("here is text >>> line 7")
                setTimeout("text.style.display = 'none';",5000);
                console.log('Here is style');
                setTimeout("text.classList.add('hid');",5000);
                console.log('Here is classList');
        }) 
});
