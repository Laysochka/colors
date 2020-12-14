$(function() {

			var colors = $('#colors li');
			var mainColor = $('#main');
			var start = $('#start');
			var gameState = 'waiting';
			var gameSequence = new Array();
			var level = 1;
			var t;
			var flashNo;
			var clickedNo;
			var setupLightSequence = function() {
				var randomNum =  Math.floor(Math.random() * 4);
				gameSequence[level-1] = randomNum;
				showLightSequence();
			};
			var lightOn = function(no) {
				colors.eq(gameSequence[no]).addClass('on');
			};

			var lightOff = function() {
				colors.removeClass('on');
			};
			var showLightSequence = function() {
				lightOff();

				if(flashNo < level) {
					var on = setTimeout(function() {
						var off = setTimeout(function() {
							showLightSequence();
							flashNo++;
						}, 500);
						lightOn(flashNo);
					}, 500);
				}
				else {
					gameState = 'playing';
					$('body').addClass('playing');
					start.text('now you😉');
					clearTimeout(on);
				}
			};

			colors.click(function() {
				if(gameState == 'playing') {
					var selectedSquare = $(this).index();
					var selectedColor = $(this).css('background-color');

					if(gameSequence[clickedNo] == selectedSquare) {
						if(clickedNo == level-1) {
							gameState = 'waiting';
							$('body').removeClass('playing');
							start.text(' GOOD🔥! next level ⏩');
							level++;
						}

						lightOn(clickedNo);
						var off = setTimeout(function() {
							lightOff();
							clickedNo++;
						}, 200);
					}
					else {
						gameState = 'waiting';
						$('body').removeClass('playing');
						start.text('Game over😥');
						$('body').removeClass('playing').addClass('game-over');
						gameSequence = new Array();
				
					}
				}
			});
			var init = function() {
				$('#level').text('Level ' + level);
				flashNo = 0;
				clickedNo = 0;
				$(this).text('Memorize☝🏻');
				$('body').removeClass('game-over');
				setupLightSequence();
			}

			 start.click(init);
		});
