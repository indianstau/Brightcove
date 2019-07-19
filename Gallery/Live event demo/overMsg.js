var player, box, text, a, b;
videojs.registerPlugin('overMsg',function(){
        player = this;
        console.log('Here is plugin inside');
        text = document.getElementsByClassName('vjs-overlay vjs-overlay-top vjs-overlay-background')[0]
        console.log(box);
//         text = document.getElementsByClassName('text')[0];
        player.on('ended',function(){
            setTimeout("text.classList.add('hid')",5000);
            console.log('Here is ended event!');
//         }) 
//     });
});
