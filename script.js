var FIELD_SIZE = 4;
var BASE_NUMBER = 2;
var MULTI = 2;
var line_width = 0.05;
var f;
var start_x, start_y;
var m;

var c,i,k,n = FIELD_SIZE,f = 1;
var A;
var used;

function handle_click(x,y){
	console.log("handle");
	if(window.innerWidth > m){
		x-=((window.innerWidth-m)/2);
		start_x-=((window.innerWidth-m)/2);
	}
	if(window.innerHeight > m){
		y-=((window.innerHeight-m)/2);
		start_y-=((window.innerHeight-m)/2);
	}
	console.log(x,y);
	let alpha = Math.abs((y-start_y)/(x-start_x)); 
	   f = false;
	if(alpha > Math.sqrt(3)){
		if(5*(y - start_y) >= m) move_down();
		else if(5*(start_y - y) >= m) move_up();
	}
	else if(alpha < 1/Math.sqrt(3)){
		if(5*(x - start_x) >= m) move_right();
		else if(5*(start_x - x) >= m) move_left();
	}
	if(f){
            randomize(A,FIELD_SIZE*FIELD_SIZE);
            print_field(A,FIELD_SIZE);
        }
}

function mouseClick(e) {
   pressed = true;
   let z = window.getComputedStyle(canvas).zoom;
   let x = e.pageX / z - e.target.offsetLeft,
      y = e.pageY / z - e.target.offsetTop;
	start_x = x;
	start_y = y;
}

function mouseClickT(e) {
   if (e.touches && e.touches.length) e = e.touches[0];
   else if (e.changedTouches && e.changedTouches.length) e = e.changedTouches[0];
   else return;
   pressed = true;
   let z = window.getComputedStyle(canvas).zoom;
   let x = e.pageX / z - e.target.offsetLeft,
      y = e.pageY / z - e.target.offsetTop;
	start_x = x;
	start_y = y;
}

function mouseUnClick(e) {
   let z = window.getComputedStyle(canvas).zoom;
   var x = e.pageX / z - e.target.offsetLeft,
      y = e.pageY / z - e.target.offsetTop; 
	  console.log("mouse unclick");
	  console.log(x,y);
	handle_click(x,y);
}

function mouseUnClickT(e) {
   if (e.touches && e.touches.length) e = e.touches[0];
   else if (e.changedTouches && e.changedTouches.length) e = e.changedTouches[0];
   else return;
   let z = window.getComputedStyle(canvas).zoom;
   var x = e.pageX / z - e.target.offsetLeft,
      y = e.pageY / z - e.target.offsetTop;
	  console.log("sensor unclick");
	  console.log(x,y);
   handle_click(x,y);
}

function randomize(){
    let B = new Array;
    let r,i,k=0;
    for(i = 0; i < n*n; ++i){
        if(A[i] == 0){
            B[k] = i;
			k+=1;
        }
    }
    if(k == 0){
        //printf("\nGAME OVER...");
        return;
    }
    r = Math.floor(Math.random() * k);
    A[B[r]] = BASE_NUMBER;
}

window.onload = function () {
   StartGame();
}

function move_up(){
	let i,k;
	for(i = 0; i < n*n; ++i) used[i] = 0;
                for(k = 0; k < n; ++k){
                    for(i = 1; i < n; ++i){
                        if(A[i*n+k] == 0) continue;
                        if(i > 0 && A[(i-1)*n+k] == 0){
                            A[(i-1)*n+k] = A[i*n+k];
                            A[i*n+k] = 0;
                            i-=2;
                            f = true;
                        }
                        else if(i > 0 && A[(i-1)*n+k] == A[i*n+k] && !used[(i-1)*n+k]){
                            used[(i-1)*n+k] = 1;
                            A[i*n+k] = 0;
                            A[(i-1)*n+k]*=MULTI;
                            --i;
                            f = true;
                        }
                    }
				}
}

function move_down(){
	let i,k;
	for(i = 0; i < n*n; ++i) used[i] = 0;
                for(k = 0; k < n; ++k){
                    for(i = n-2; i > -1; --i){
                        if(A[i*n+k] == 0) continue;
                        if(i < n-1 && A[(i+1)*n+k] == 0){
                            A[(i+1)*n+k] = A[i*n+k];
                            A[i*n+k] = 0;
                            i+=2;
                            f = true;
                        }
                        else if(i < n-1 && A[(i+1)*n+k] == A[i*n+k] && !used[(i+1)*n+k]){
                            used[(i+1)*n+k] = 1;
                            A[i*n+k] = 0;
                            A[(i+1)*n+k]*=MULTI;
                            ++i;
                            f = true;
                        }
                    }
                }
}

function move_right(){
	let i,k;
	for(i = 0; i < n*n; ++i) used[i] = 0;
                for(i = 0; i < n; ++i){
                    for(k = n-2; k > -1; --k){
                        if(A[i*n+k] == 0) continue;
                        if(k < n-1 && A[i*n+k+1] == 0){
                            A[i*n+k+1] = A[i*n+k];
                            A[i*n+k] = 0;
                            k+=2;
                            f = true;
                        }
                        else if(k < n-1 && A[i*n+k+1] == A[i*n+k] && !used[i*n+k+1]){
                            used[i*n+k+1] = 1;
                            A[i*n+k] = 0;
                            A[i*n+k+1]*=MULTI;
                            ++k;
                            f = true;
                        }
                    }
                }
}

function move_left(){
	let i,k;
	for(i = 0; i < n*n; ++i) used[i] = 0;
                for(i = 0; i < n; ++i){
                    for(k = 1; k < n; ++k){
                        if(A[i*n+k] == 0) continue;
                        if(k > 0 && A[i*n+k-1] == 0){
                            A[i*n+k-1] = A[i*n+k];
                            A[i*n+k] = 0;
                            k-=2;
                            f = true;
                        }
                        else if(k > 0 && A[i*n+k-1] == A[i*n+k] && !used[i*n+k-1]){
                            used[i*n+k-1] = 1;
                            A[i*n+k] = 0;
                            A[i*n+k-1]*=MULTI;
                            --k;
                            f = true;
                        }
                    }
                }
}

function StartGame() {
	A = new Array(FIELD_SIZE*FIELD_SIZE).fill(0);
	used = new Array;
	let cnv = document.createElement("canvas");
   cnv.setAttribute("id", "canvas");
   let text_node = document.createTextNode("Sorry, your browser does not support this application :(");
   cnv.appendChild(text_node);
   document.body.appendChild(cnv);
   canvas = document.getElementById("canvas");
   context = canvas.getContext("2d");

   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   w = canvas.width;
   h = canvas.height; 
   randomize();
   print_field();
   document.onkeydown = function (e) {
	   let i,k;
	   f = false;
      if (e.keyCode == 38) { //up
         move_up();
      }
      else if (e.keyCode == 40) { // down
         move_down();
      }
      else if (e.keyCode == 39) { //right
         move_right();
      }
      else if (e.keyCode == 37) { // left
         move_left();
      }
        if(f){
            randomize(A,FIELD_SIZE*FIELD_SIZE);
            print_field(A,FIELD_SIZE);
        }
   }
   canvas.addEventListener('mousedown', mouseClick);
   canvas.addEventListener('mouseup', mouseUnClick);
   //canvas.addEventListener('mousemove', mouseMove);
   canvas.addEventListener("touchstart", mouseClickT);
   canvas.addEventListener("touchend", mouseUnClickT);
   //canvas.addEventListener("touchmove", mouseMoveT);
   //canvas.addEventListener("wheel", scaling);
};

function print_field() {
   w = canvas.width;
   h = canvas.height;
   m = Math.min(w,h);
   let cell_size = m/(n + line_width*(n+1));
   let line_size = m*line_width/(n + line_width*(n+1));
   let line_color = "black";
   context.fillStyle = "white";
   context.fillRect(0, 0, canvas.width, canvas.height/2);
   context.fillStyle = "white";
   context.fillRect(0, canvas.height/2, canvas.width, canvas.height);
   context.textAlign = "center";
   context.font = "30pt Arial";
	context.translate(w/2,h/2 + line_size/2);
   context.lineWidth = line_size;
   context.strokeStyle = line_color;
   console.log(m);
   console.log(line_size);
   console.log(cell_size);
   context.fillStyle = "blue";
		 context.stroke();
   let line_len = (FIELD_SIZE + 1)*line_size + FIELD_SIZE*cell_size;


	for(let i = 0; i < FIELD_SIZE; ++i){
		for(let k = 0; k < FIELD_SIZE; ++k){
			if(A[i*n+k] == 0) context.fillStyle = "lightGray";
			else if(A[i*n+k] == 2) context.fillStyle = "gray";
			else if(A[i*n+k] == 4) context.fillStyle = "#fed8b1";
			else if(A[i*n+k] == 8) context.fillStyle = "orange";
			else if(A[i*n+k] == 16) context.fillStyle = "#ffcccb";
			else if(A[i*n+k] == 32) context.fillStyle = "Red";
			else if(A[i*n+k] == 64) context.fillStyle = "Green";
			else if(A[i*n+k] == 128) context.fillStyle = "Cyan";
			else if(A[i*n+k] == 256) context.fillStyle = "lightBlue";
			else if(A[i*n+k] == 512) context.fillStyle = "Blue";
			else if(A[i*n+k] == 1024) context.fillStyle = "Purple";
			else if(A[i*n+k] >= 2048) context.fillStyle = "Magenta";
			//context.fillStyle = "rgb(" + String(100 + 155*Math.log2(A[i*n+k])/10) + ";" + String(100*A[i*n+k]) + ";" + String(100*A[i*n+k]) + ")";
			//console.log("rgb(" + String(100 + 155*A[i*n+k]/2048) + ";" + String(100*A[i*n+k]) + ";" + String(100*A[i*n+k]) + ")");
			if(A[i*n+k])context.fillRect(-m/2 + k*m/n, -m/2 + i*m/n, m/n, m/n);
			context.beginPath();
			context.fillStyle = "black";
			if(A[i*n+k])context.fillText(A[i*n+k], -m/2 + m/2/n + k*m/n, -m/2 + m/2/n + i*m/n);
			context.stroke();
		}
	}
	
	for(let i = 0; i < FIELD_SIZE + 1; ++i){
		context.beginPath();
         context.moveTo(-m/2, -m/2 + i*m/n);
         context.lineTo(m/2, -m/2 + i*m/n);
         context.closePath();
		 context.stroke();
		context.beginPath();
         context.moveTo(-m/2 + i*m/n, -m/2);
         context.lineTo(-m/2 + i*m/n, m/2);
         context.closePath();
		 context.stroke();
	}
	context.translate(-w/2,-h/2 - line_size/2);
}
