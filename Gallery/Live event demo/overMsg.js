var player, box, text, a, b;
videojs.registerPlugin('overMsg',function(){
        player = this;
        console.log('Here is plugin inside');
        text = document.getElementsByClassName('vjs-overlay vjs-overlay-top vjs-overlay-background')[0]
        console.log(text);
        player.on('ended',function(){
            setTimeout("text.style.display = 'none';",5000);
            console.log('Here is ended event!');
//         }) 
//     });
});
