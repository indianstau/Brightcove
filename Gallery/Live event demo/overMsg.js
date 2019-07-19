var player, box, text, a, b;
videojs.registerPlugin('overMsg',function(){
        player = this;
        console.log('>>> plugin inside line 4');
        text = document.getElementsByClassName('vjs-overlay vjs-overlay-top vjs-overlay-background')[0]
        console.log(text);
        console.log("here is text >>> line 5")
        player.on('ended',function(){
            setTimeout("text.style.display = 'none';",5000);
            console.log('Here is style');
            setTimeout("text.classList.add('hid');",5000);
            console.log('Here is classList');
        }) 
});
