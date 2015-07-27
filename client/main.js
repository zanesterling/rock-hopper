document.body.onload = function() {
	var config = require('./config');
	var Renderer = require('./Renderer');
	var GameState = require('./GameState');

	var renderer;
	var gameState;

	var init = function() {
		gameState = new GameState();
		renderer = new Renderer(canvas);

		loop();
	};

	//main loop
	var loop = function() {
		gameState.update();
		renderer.draw(gameState);

		setTimeout(loop, 1000 / config.fps);
	};

	init();
};