/*jshint undef:false */
var AudioController = Class.extend({
	init:function(){

		this.audioList = [
			{
				label:'ambient1',
				urls: ['dist/audio/trilhak.mp3'],
				// urls: ['dist/audio/star.mp3'],
				volume: 0.1,
				loop: true
			},
			{
				label:'god',
				urls: ['dist/audio/god.mp3'],
				volume: 0.3,
				loop: false
			},
			{
				label:'pop',
				urls: ['dist/audio/pop.mp3'],
				volume: 0.3,
				loop: false
			},
			{
				label:'bubble1',
				urls: ['dist/audio/bubble1.mp3'],
				volume: 0.3,
				loop: false
			},
			{
				label:'bubble2',
				urls: ['dist/audio/bubble2.mp3'],
				volume: 0.3,
				loop: false
			},
			{
				label:'bubble3',
				urls: ['dist/audio/bubble3.mp3'],
				volume: 0.3,
				loop: false
			},
			{
				label:'grunhido',
				urls: ['dist/audio/grunhido.mp3'],
				volume: 0.3,
				loop: false
			},
			{
				label:'shoot2',
				urls: ['dist/audio/kill.mp3'],
				volume: 0.3,
				loop: false
			},
			{
				label:'shoot3',
				urls: ['dist/audio/pop2.mp3'],
				volume: 0.3,
				loop: false
			},
			{
				label:'bublenoize',
				urls: ['dist/audio/bublenoize.mp3'],
				volume: 0.2,
				loop: false
			},
			{
				label:'star',
				urls: ['dist/audio/star.mp3'],
				volume: 0.3,
				loop: false
			},
		];
		this.onCompleteCallback = null;
		this.loadedAudioComplete = false;
		this.audios = [];
		var self = this;
		function end(){
			// console.log('end');
			self.updateAudioList(this);
		}
		function load(){
			self.currentLoaded ++;
			// console.log(self.currentLoaded);
			if(self.currentLoaded >= self.audioList.length){
				self.loadedAudioComplete = true;
				// console.log('all loaded');
				if(self.onCompleteCallback){
					self.onCompleteCallback();
				}
			}
		}
		for (var i = this.audioList.length - 1; i >= 0; i--) {
			// console.log(this.audioList[i].loop);
			var tempObj = {
				label:this.audioList[i].label,
				audio:new Howl({
					urls:this.audioList[i].urls,
					volume: this.audioList[i].volume,
					// sprite: this.audioList[i].sprite?this.audioList[i].sprite:null,
					loop: this.audioList[i].loop,
					onend: end,
					onload: load
				})
			};
			// console.log(this.audioList[i].loop,'audio');
			if(!this.audioList[i].loop){
				// console.log('set');
				tempObj.audio.onend = end;
			}
			this.audios.push(tempObj);
			// });
		}
		
		this.currentLoaded = 0;
		// this.ambientSound1 = new Howl({
		// 	urls: ['dist/audio/trilha.mp3', 'dist/audio/trilha.ogg'],
		// 	volume: 0.1,
		// 	loop: true,
		// });

		// this.alcemar = new Howl({
		// 	urls: ['dist/audio/aves_raras.mp3', 'dist/audio/aves_raras.ogg'],
		// 	volume: 0.8,
		// 	sprite: {
		// 		audio1: [0, 7000]
		// 	}
		// });

		this.playingAudios = [];
		this.ambientLabel = '';
	},
	updateAudioList:function(target){
		if(this.ambientPlaying === target){
			this.playSound(this.ambientLabel);
			// console.log('isAmbient', this.ambientLabel);
			return;
		}
		for (var j = this.playingAudios.length - 1; j >= 0; j--) {
			if(this.playingAudios[j] === target){
				this.playingAudios.splice(j,1);
			}
		}
		// console.log(this.playingAudios);
	},
	playSound:function(id){
		var audioP = null;
		for (var i = this.audios.length - 1; i >= 0; i--) {
			if(this.audios[i].label === id){
				audioP = this.audios[i].audio;
				audioP.play();
				this.playingAudios.push(audioP);
			}
		}
		// console.log(audioP);
		return audioP;
	},
	stopSound:function(id){
		var audioP = null;
		for (var i = this.audios.length - 1; i >= 0; i--) {
			if(this.audios[i].label === id){
				audioP = this.audios[i].audio;
				audioP.stop();
				for (var j = this.playingAudios.length - 1; j >= 0; j--) {
					if(this.playingAudios[j] === audioP){
						this.playingAudios.splice(j,1);
					}
				}
			}
		}
		return audioP;
	},
	playAmbientSound:function(id){
		if(this.ambientLabel === id){
			return;
		}

		if(this.ambientPlaying){
			// this.ambientPlaying.stop();
			this.stopSound(this.ambientLabel);
		}
		this.ambientLabel = id;
		this.ambientPlaying = this.playSound(id);
	}
});