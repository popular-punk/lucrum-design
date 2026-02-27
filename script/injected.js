//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the video as if you were in the cinema.
Copyright (C) 2011 Stefan vd
www.stefanvd.net

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.


To view a copy of this license, visit http://creativecommons.org/licenses/GPL/2.0/

*/
//================================================

(ytCinema = {
	messageEvent: document.createEvent("Event"),
	playerStateChange: function (stateId) {
		var message = document.getElementById("ytCinemaMessage"),
			stateIO = "playerStateChange:".concat(stateId);
		if (message && message.innerText !== stateIO) {
			message.innerText = stateIO;
			message.dispatchEvent(this.messageEvent);
		}
	},
	initialize: function () {
		var that = this;
		this.messageEvent.initEvent("ytCinemaMessage", true, true);
		window.addEventListener("load", function () {
			var player = document.getElementById("movie_player") || document.getElementsByTagName("video")[0] || null;
			if (player !== null) {
				var interval = setInterval(function () {
					if (player.pause || player.pauseVideo) {
						clearInterval(interval);
						if (player.pauseVideo) {
							player.addEventListener("onStateChange", "ytCinema.playerStateChange");
						} else {
							player.addEventListener("pause", function () { that.playerStateChange.call(that, 2) });
							player.addEventListener("play",  function () { that.playerStateChange.call(that, 1) });
							player.addEventListener("ended", function () { that.playerStateChange.call(that, 0) });

							that.playerStateChange.call(that, player.paused ? 2 : 1);
						}
					}
				}, 10);
			}
		});
	}
}).initialize();