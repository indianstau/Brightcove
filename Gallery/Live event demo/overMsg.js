videojs.registerPlugin('overMsg',function(){
    var player = document.getElementById('performPlayer_html5_api');
    box = document.getElementsByClassName('vjs-overlay vjs-overlay-top vjs-overlay-background')[0]
    text = document.getElementsByClassName('text')[0];
        player.on('ended',function(){
            setTimeout('box.style.display = "none";',5000);
            console.log('Here is ended event!');
        }) 
});
