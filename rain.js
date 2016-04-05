	(function () {
	    "use strict";
	    var canvas = document.getElementById("rain"),
	        ctx = canvas.getContext("2d"),
	        h = canvas.height = window.innerHeight,
	        w = canvas.width = window.innerWidth,
	        clearColor = 'rgba(0, 0, 0, .1)';

	    function getRandom(min, max) {
	        return Math.random() * (max - min) + min;
	    }

	    function createRain() {
	        this.rain = [];
	        this.xSpeed = [];
	        this.ySpeed = [];
	    }
	    createRain.prototype = {
	        init: function () {
	            return {
	                x: getRandom(0, w),
	                y: 0,
	                w: 3,
	                h: 2,
	                vw: 3,
	                vh: 1,
	                a: 1,
	                va: .96,
	                speedX: getRandom(0, 1),
	                speedY: getRandom(2, 3),
	                color: 'rgba(180,180,180,1)',
	                max: getRandom(h * 0.8, h * 0.9)
	            }
	        },
	        createRain: function () {
	            this.quantity = 5;
	            for (var i = 0; i < this.quantity; i++) {
	                this.rain.push(this.init());
	            }
	        },
	        draw: function () {
	            var This = this;
	            this.rain.forEach(function (v, i) {
	                if (v.y > v.max) {
	                    ctx.beginPath();
	                    ctx.moveTo(v.x, v.y - v.h / 2);
	                    ctx.bezierCurveTo(
	                        v.x + v.w / 2, v.y - v.h / 2,
	                        v.x + v.w / 2, v.y + v.h / 2,
	                        v.x, v.y + v.h / 2);
	                    ctx.bezierCurveTo(
	                        v.x - v.w / 2, v.y + v.h / 2,
	                        v.x - v.w / 2, v.y - v.h / 2,
	                        v.x, v.y - v.h / 2);
	                    ctx.strokeStyle = "rgba(180,180,180," + v.a + ")";
	                    ctx.stroke();
	                    ctx.closePath();
	                } else if (v.y < v.max) {
	                    ctx.beginPath();
	                    ctx.lineWidth = 3;
	                    ctx.lineCap = "round";
	                    ctx.strokeStyle = v.color;
	                    ctx.moveTo(v.x, v.y);
	                    ctx.lineTo(v.x + 0.1, v.y + 1);
	                    ctx.stroke();
	                }
	                This.update(v, i);
	            });
	            if (Math.random() > .99) {
	                this.createRain();
	            }
	        },
	        update: function (v, i) {
	            if (v.y < v.max) {
	                v.x += v.speedX;
	                v.y += v.speedY;
	                if (v.x < 0 || v.x > w) {
	                    this.rain.splice(i, 1);
	                    this.rain.push(this.init());
	                }
	            } else if (v.y > v.max) {
	                if (v.a > .03) {
	                    v.w += v.vw;
	                    v.h += v.vh;
	                    if (v.w > 150) {
	                        v.a *= v.va;
	                        v.vw *= .9;
	                        v.vh *= .9;
	                        this.rain.splice(i, 1);
	                    }
	                }
	            }
	        }
	    };

	    function resize() {
	        h = canvas.height = window.innerHeight();
	        w = canvas.width = window.innerWidth();
	    }
	    var rain = new createRain();
	    rain.createRain();

	    function anim() {
	        ctx.fillStyle = clearColor;
	        ctx.fillRect(0, 0, w, h);
	        rain.draw();
	        requestAnimationFrame(anim, 100);
	    }
	    window.addEventListener("resize", resize);
	    anim();
	})();
