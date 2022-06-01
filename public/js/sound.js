var sound = new Howl({
  src: ["../gamemusic.mp3"],
  loop: true,
  volume: 0.1,
  onend: function() {
    console.log('Finished!');
  }
});


var onpass_sound = new Howl({
  src: ["../onpass.mp3"],
  autoplay: false,
  volume: 0.2,
});

var onstar_sound = new Howl({
  src: ["../atstar.mp3"],
  autoplay: false,
  volume: 0.5,
});
sound.play()

var tik_sound = new Howl({
  src: ["../tiksound.wav"],
  autoplay: false,
  onend: function() {
    console.log('Finished!');
  }
});

var win_sound = new Howl({
   src:['../onwin.mp3'],
   volume:0.5
})


var out_sound = new Howl({
   src:['../out.mp3'],
   volume:0.5
})

