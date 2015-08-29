

	
var canvas1 = document.getElementById('canvas1');
var ctx = canvas1.getContext('2d');
var canvas_width = canvas1.width = window.innerWidth;
var canvas_height = canvas1.height = window.innerHeight;


// device detection
function isIpad() {
	var navString = navigator.userAgent.toLowerCase();
	return (navString.indexOf('ipad') > -1);
}
function isIphone() {
	var navString = navigator.userAgent.toLowerCase();
	return (navString.indexOf('ipod') > -1 || navString.indexOf('iphone') > -1);
}
// reverse sign if not iOS for accelerometer
var sign = isIphone() || isIpad() ? 1 : -1;



var FPS = 60;
var delta = 1000/FPS;
var moveparam = 0.2;


playerdelaytime = 30;

socoe = {
	total: 0,
	hit : 0,
	gametime: 15,
	playerdelaytime : 0 
}

movenum = 10;


window.tmpimg = new Image();
tmpimg.src = './images/g2.png';
// tmpimg.width = 33;
// tmpimg.height = 115;
tmpimg.width = 8;
tmpimg.height = 16;


window.playerImg = new Image();
playerImg.src = './images/g3.jpg';
playerImg.width=50;
playerImg.height =90;



window.playerdelayImg = new Image();
playerdelayImg.src = './images/g4.jpg';
playerdelayImg.width=50;
playerdelayImg.height =90;

function point  () {
	this.initx = Math.floor(Math.random()* window.innerWidth *0.9);
	this.inity = 10;
	this.Notoverflow = true;
	this.Ishit = false;
}

point.prototype.move = function() {
	if (this.inity < canvas_height) {
		this.inity += 10;
	}
	else{
		this.Notoverflow = false;
	};
};


function collides(a, b) {
	return a.initx   < b.initx + playerImg.width && a.initx + tmpimg.width  > b.initx && a.inity  < b.inity + playerImg.height && a.inity + tmpimg.height  > b.inity;
}

point.prototype.validishit = function() {

	var ishit = collides(this,p1);
	
	if (ishit) {
		this.Ishit = true;
	};
}


emarr = [];
emarr.push(new point());





function player () {
	this.initx = 1;
	this.inity = window.innerHeight - 100;
}

// player.prototype.move = function(keycode) {
// 	if (keycode==39 && ((this.initx+ movenum) <= (canvas_width- playerImg.width ) )) {
// 		this.initx += movenum;		
// 	}

// 	if (keycode==37 && ( (this.initx- movenum) >= 0)) {
// 			this.initx -= movenum;
// 	}
// };

gyro.frequency = delta;

player.prototype.move = function() {
	
	var orient = gyro.getOrientation();

	var orientX = orient.x * sign;

	if ( orientX>0 && (this.initx+ movenum) <= (canvas_width- playerImg.width ) ) {
		this.initx += movenum * moveparam;
	};

	if (orientX < 0 && ( (this.initx- movenum) >= 0) ){
		this.initx -= movenum * moveparam;
	};
	// if ((orientX > 0 && player.x < CANVAS_WIDTH - player.width + player.xAdj) || (orientX < 0 && player.x + player.xAdj > 0)) {
	// 	player.x += orientX * delta * 0.3;
	// }

};

player.prototype.drow = function() {


	var img = socoe.playerdelaytime >= 0 ?  playerdelayImg : playerImg;
	
	ctx.drawImage(img, this.initx,this.inity,img.width,img.height);
};

function canvasdrowWord  (word,width,height) {
	ctx.font="20px Georgia";
	ctx.fillText(word,width,height);
}


function drow (player){

	ctx.clearRect(0,0, canvas_width, canvas_height);

	canvasdrowWord('遊戲剩下時間 '+ socoe.gametime +' 秒 ' +'總共子彈 '+ (socoe.total) +' 顆',10,50);
	canvasdrowWord('閃過子彈 ' +(socoe.total-socoe.hit)+' 顆' + '  中槍 ' +(socoe.hit)+' 顆' ,10,80);

	player.move();
	emarr.forEach(
		function  (element,index) {

			var img = tmpimg;
			element.move();
			
			element.validishit();

			if (!element.Ishit) {
				ctx.drawImage(img, element.initx, element.inity,img.width,img.height);
			}
			else{
				socoe.hit+=1;
				socoe.playerdelaytime = playerdelaytime;
			}
			
			// ctx.drawImage(img, element.initx, element.inity,img.width,img.height);	
			
		}
	);

	socoe.playerdelaytime -= 1;

	emarr =  emarr.filter(function  (a) {
		return a.Notoverflow == true  && a.Ishit == false ;
	});
	
	player.drow();
}



window.onload = function  () {

	p1 = new player();



	(function () {
		
		var generationInterval = 	setInterval(function  () {
																emarr.push(new point());

																socoe.total += 1;
																socoe.gametime -= 1;
															},1000);

		var dpsInterval =	setInterval(function  () {
												drow(p1);
											},delta);


		setTimeout(function  () {
			clearInterval(generationInterval);
			clearInterval(dpsInterval);
		},15300);
		
	})();



	// window.onkeydown = function  (e) {
	// 	if (e.keyCode ==37 || e.keyCode == 39 ) {
	// 			// console.log('觸碰左右方向鍵');
	// 			p1.move(e.keyCode );
	// 	};
		
	// }
}

