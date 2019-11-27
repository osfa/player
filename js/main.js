

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onPlayerReady(event) {
    console.log('onPlayerReady', event);
    event.target.setLoop(true);
    event.target.setShuffle(true);
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        console.log(event.target);
        console.log(event.target.getDuration());
        // event.target.seekTo(30, true);
        // event.target.setVolume(50); // 0 - 100
    }
}  

window.onYouTubePlayerAPIReady = function(){
    console.log('onYouTubePlayerAPIReady');
    $(document).ready(function() {
        $('.starter').click(function(e){
            e.preventDefault();
            console.log('go');
            $('.starter').hide();
            init();
        });
        // setTimeout(function(){
        //     $('.starter').trigger('click'); 
        // }, 1000);
        init();

    }); 
}

var url_string = window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("interval");

var interval = c || 58000;

var leftPlayer;
var rightPlayer;

var leftCurrentlyPlaying = {};
var rightCurrentlyPlaying = {};

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var switchVideo = function(sources, player, currentlyPlaying){
    // console.log('switchVideo');
    // var selected = sources.randomElement();
    // while(currentlyPlaying.id === selected.id){
    //     selected = sources.randomElement();
    // }
    // currentlyPlaying = selected;
    // var pos = getRandomInt(selected.duration);
    // var intervalInSeconds = interval/1000;
    // if(pos > intervalInSeconds){
    //     pos = pos - intervalInSeconds;
    // }
    // player.loadVideoById(selected.id, pos);
    // player.setVolume(selected.volume);
};

var init = function() {

    console.log('init');
    $('.starter').hide();
    var playlistID = 'PLs_sKoRQdjxQq-fPoMoyBnq1zSS_srj4j';
    playlistID = 'PLs_sKoRQdjxRbUozay8KjHyN8-eryh1XL';

    var events = {  'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange };
    leftPlayer = new YT.Player('left', {
        // videoId: vids.randomElement().id, 
        playerVars: 
        {
            listType:'playlist',
            list: playlistID
        },
        events: events,
        // host: 'https://www.youtube.com',
        // playerVars: { 'origin': 'http://localhost:8000', 'enablejsapi': 1 }
    });

    // rightPlayer = new YT.Player('right', { 
    //     videoId: vids.randomElement().id,
    //     events: events,
    //     // host: 'https://www.youtube.com',
    //     // playerVars: { 'autoplay': 0, 'controls': 0, 'autohide':1, 'wmode':'opaque', 'origin':'http://localhost:8000', 'enablejsapi': 1 },
    // });

    setInterval(function(){
        leftPlayer.nextVideo()
        // player.playVideoAt(index:Number):Void
        //switchVideo(vids, leftPlayer, leftCurrentlyPlaying)
    }, interval);

    setTimeout(function(){
        setInterval(function(){
            //switchVideo(vids, rightPlayer, rightCurrentlyPlaying)
        }, interval);
    }, interval/2);

    // <iframe id="left" src='https://www.youtube.com/embed/aXEl7QmXTMk?theme=dark&autoplay=0&autohide=0&rel=0&enablejsapi=1' frameborder='0' allowfullscreen></iframe>
}