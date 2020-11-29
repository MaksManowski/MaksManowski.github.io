//CTRL K + SHIFT K to comment/out.
window.onload = onLoad;

function onLoad() {
	convertText();
	
	scaledBorders();
	//createCanvas();
	//window.setInterval(createCanvas, 80);
	document.onkeydown = keyDownEvent;
	console.log("Loaded JS");
}

function scaledBorders() { //Scale width of borders.
	const list = document.getElementsByTagName("H2");
	
	for(let i = 0; i<list.length; i++) {
		const e = list[i];
		e.style.width = (getTextWidth(e.textContent, e.style.fontFamily)*2.3+8) + "px";
	}
}

function toggleVisibility(id) {
	const x = document.getElementById(id);
	if (x.style.display === "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}
}

// Calculate width of text from DOM element or string. By Phil Freo <http://philfreo.com>
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}

function createCanvas() {
	let canvas = document.getElementById("bitmap");
	if(canvas==null) {
		canvas = document.createElement('canvas');
		canvas.id = "bitmap";
		canvas.width = 500;
		canvas.height = 500;

		let div = document.getElementById("bitmapDiv");
		if(div==null) {
			div = document.createElement("div");
			div.id = "bitmapDiv";
			document.body.appendChild(div);
		}

		div.appendChild(canvas);
	}

	const style = canvas.style;
	style.marginLeft = "auto";
	style.marginRight = "auto";

	const parentStyle = canvas.parentElement.style;
	parentStyle.textAlign = "center";
	parentStyle.width = "100%";

	const imageData = canvas.getContext("2d").createImageData(canvas.clientWidth, canvas.clientHeight);
	for(let x = 0; x<canvas.width; x++) {
		for(let y=0; y<canvas.height; y++) {
			setPixel(imageData, x, y, Math.random()*255,Math.random()*255,Math.random()*255,Math.random()*255)
		}
	}
	canvas.getContext("2d").putImageData(imageData, 0, 0);
}

function setPixel(imageData, x, y, r, g, b, a){
	const index = (x + y * imageData.width);
	imageData.data[index * 4] = r;
	imageData.data[index * 4 + 1] = g;
	imageData.data[index * 4 + 2] = b;
	imageData.data[index * 4 + 3] = a;
}

var keylogger = "";
function keyDownEvent(e) {
	e = e || window.event;

	//console.log(e.key);
	keylogger+= e.key;
	console.log(keylogger);

	if (e.key === 'ArrowUp') {
		console.log("up");
		// up arrow
	}
	else if (e.key === 'ArrowDown') {
		console.log("down");
		// down arrow
	}
	else if (e.key === 'ArrowLeft') {
		console.log("left");
		// left arrow
	}
	else if (e.key === 'ArrowRight') {
		console.log("right");
		// right arrow
	}
}

function convertText() {
	const dataElement = document.getElementById("data");
	var data = dataElement.innerText;
	console.log(text);
	data = data.split("\n");
	
	var hdiv = document.body;
	for(var i = 0; i<data.length; i++) {
		var text = data[i];
		//console.log(text);na Na
		var element;
		if(text.startsWith('!')) {
			var id = text.split(' ')[0].substring(1);
			element = document.createElement("h2");
			element.innerText = text.substring(1);
			//element.onclick = function() { toggleVisibility(id); };
			element.setAttribute("onclick","toggleVisibility('"+id+"');");
			document.body.appendChild(element);
			
			hdiv = document.createElement("div");
			hdiv.id = id;
			hdiv.className+= "hidden";
			document.body.appendChild(hdiv);
			continue;
		} else if(text.startsWith('-')) {
			element = document.createElement("h3");
			element.innerText = text.substring(1);
		} else if(text.startsWith('|')) {
			const parts = text.split('|');
			element = document.createElement("h4");
			element.innerText = parts[1];
			const unbold = document.createElement("span");
			unbold.className+= "nbold";
			unbold.innerText = parts.slice(2).join('|'); //, parts.length
			element.appendChild(unbold);
		} else {
			element = document.createElement("p");
			element.innerText = text;
		}
		hdiv.appendChild(element);
	}
}