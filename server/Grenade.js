'use strict';

var Victor = require('victor');

var EventQueue = require('./EventQueue');

var GRENADE_RAD = 4;
var EXPLOSION_RAD = 80;

var Grenade = function(pos, vel=new Victor(0, 0)) {
	this.pos = pos;
	this.vel = vel;
	this.radius = GRENADE_RAD;
};

Grenade.prototype.update = function(gameState) {
	this.pos.add(this.vel);

	var asteroids = gameState.agents.asteroids;
	for (var i = 0; i < asteroids.length; i++) {
		var asteroid = asteroids[i];

		var distSq = this.pos.clone()
			.subtract(asteroid.pos)
			.lengthSq();
		var minDist = this.radius + asteroid.radius;

		if (distSq < minDist * minDist) {
			this.explode(gameState);
			break;
		}
	}
};

Grenade.prototype.explode = function(gameState) {
	EventQueue.pushEvent('grenade', 'explode', this.key);
};

module.exports = Grenade;