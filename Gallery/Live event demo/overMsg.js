var player, box, text, a, b;
videojs.registerPlugin('overMsg',function(){
//     videojs.getPlayer('performPlayer_html5_api').ready(function(){
//         a = document.getElementById('performPlayer_html5_api');
//         console.log(a);
//         b = videojs('performPlayer_html5_api');
//         console.log(b);
        player = this;
        console.log('Here is plugin inside');
        box = document.getElementsByClassName('vjs-overlay vjs-overlay-top vjs-overlay-background')[0]
        text = document.getElementsByClassName('text')[0];
        player.on('ended',function(){
            setTimeout('box.style.display = "none";',5000);
            console.log('Here is ended event!');
//         }) 
//     });
});
