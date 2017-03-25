(function(){
	// var canvas = document.getElementById("mycanvas");
	// canvas.width = window.innerWidth;
	// canvas.height = window.innerHeight;
	// console.log(canvas);
	// 
	
	// Get a regular interval for drawing to the screen
	window.requestAnimFrame = (function (callback) {
		return window.requestAnimationFrame || 
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimaitonFrame ||
					function (callback) {
					 	window.setTimeout(callback, 1000/60);
					};
	})();

	var canvas = document.getElementById('sig-canvas');
	var ctx = canvas.getContext("2d");
	var positionDiv = document.getElementById('position');

	var path = "http://wonderfl.net/images/icon/e/ec/ec3c/ec3c37ba9594a7b47f1126b2561efd35df2251bfm";
	var image1 = new DragImage(path, 50, 50);
	var drawing = false;
	var mousePos = {x:0, y:0};
	var lastPos = mousePos;
	var mouseX = 0,
    	mouseY = 0;
	var mousePressed = false;
	var dragging = false;

	var loop = setInterval(function() {

    	// ctx.fillStyle = "gray";
   		ctx.fillRect(0, 0, 200, 200);

    	image1.update();
	}, 30);

	canvas.addEventListener("mousedown", function(e){
		drawing = true;
		lastPos = getMousePos(canvas, e);
		mousePressed = true;
	}, false);

	canvas.addEventListener("mouseup", function(e){
		drawing = false;
		mousePressed = false;
		dragging = false;
	}, false);

	canvas.addEventListener("mousemove", function(e){
		mousePos = getMousePos(canvas, e);
		mouseX = e.offsetX;
		mouseY = e.offsetY;
	}, false);

	// Set up touch events for mobile, etc
	canvas.addEventListener("touchstart", function (e) {
		mousePos = getTouchPos(canvas, e);
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	
	canvas.addEventListener("touchend", function (e) {
		var mouseEvent = new MouseEvent("mouseup", {});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	
	canvas.addEventListener("touchmove", function (e) {
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);

	// Prevent scrolling when touching the canvas
	document.body.addEventListener("touchstart", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchend", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchmove", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);

	// Get the position of the mouse relative to the canvas
	function getMousePos(canvasDom, mouseEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: mouseEvent.clientX - rect.left,
			y: mouseEvent.clientY - rect.top
		};
	}

	// Get the position of a touch relative to the canvas
	function getTouchPos(canvasDom, touchEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: touchEvent.touches[0].clientX - rect.left,
			y: touchEvent.touches[0].clientY - rect.top
		};
	}


	function DragImage(src, x, y) {
    	var that = this;
    	var startX = 0,
       		startY = 0;
    	var drag = false;
    	
   		this.x = x;
    	this.y = y;
    	var img = new Image();
    	img.src = src;
    	this.update = function() {
        	if (mousePressed ) {
            
                var left = that.x;
                var right = that.x + img.width;
                var top = that.y;
                var bottom = that.y + img.height;
                if (!drag) {
                    startX = mouseX - that.x;
                    startY = mouseY - that.y;
                }
                if (mouseX < right && mouseX > left && mouseY < bottom && mouseY > top) {
                    if (!dragging){
            			dragging = true;
                        drag = true;
                    }
                    
                }
            
        	} else {
            	drag = false;
        	}
        	if (drag) {
            	that.x = mouseX - startX;
            	that.y = mouseY - startY;
        		positionDiv.innerHTML = "x" + that.x + "y" + that.y;
        	}
        	ctx.drawImage(img, that.x, that.y);
    	}
	}

	// Allow for animation
	// (function drawLoop () {
	// 	requestAnimFrame(drawLoop);
	// 	// renderCanvas();
	// 	image1.update();
	// })();

})();