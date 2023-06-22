//RULE DOES NOT WORK
//OR THE PROCESS ONE DOES NOT
//the canvas tag appears to be of type "HTMLCanvasElement"
const canvas : HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const c = canvas.getContext("2d") as CanvasRenderingContext2D;

const margin = 1;
const cell_size = 100;
const vert_cell_amount = canvas.width/cell_size;
const horz_cell_amount = canvas.height/cell_size;

let is_running : boolean = false;

let arr : cell[][] = [];

for(let i = 0; i < horz_cell_amount; i++){
	arr.push([]);
	for(let j = 0; j < vert_cell_amount; j++){
		arr[i].push(new cell(j*cell_size,i*cell_size,cell_size,cell_size));
	}
}

const draw_cell = (subject : cell, margin : number) =>{
		c.fillStyle = subject.state;
		let w = subject.width - margin;
		let h = subject.height - margin;
		let x = subject.x + margin;
		let y = subject.y + margin;
		c.fillRect(x,y,w,h);
		c.fill();
}

const get_amount_of_neighbors = (arr:cell[][],x:number,y:number): number =>{
	let res : number = 0;
	for(let i = -1; i < 2; i++){
		for(let j = -1; j < 2; j++){
			let x_check = x + j; 
			let y_check = y + i; 
			if(x_check > -1 &&
				 y_check > -1 &&
					 x_check < arr[0].length &&
						 y_check < arr.length &&
							 (x_check != x && y_check != y)){
				if(arr[y_check][x_check].state == cell_state.alive){
					res++;
				}
			}
		}
	}
	return res;
}

//this is the original rule for convays game of life
//for an alternative ruleset, alter this function
const rule = (arr:cell[][],x:number,y:number):boolean  =>{
	let res = get_amount_of_neighbors(arr,x,y);

	if(arr[y][x].state == cell_state.alive){
		return res == 2 || res == 3;
	}
	else if(arr[y][x].state == cell_state.dead){
		return res == 3;
	}
}

let f = new cell(0,0,0,0);
let t = new cell(0,0,0,0);
t.state = cell_state.alive;

let test : cell[][] = [
	[f,f,t],
	[f,t,f],
	[t,f,t]
];

let s = "";
for(let i = 0; i < 3; i++){
	for(let j = 0; j < 3; j++){
		if(rule(test,j,i)){s += '+';}
		else{s += '.';}
	}
	s += "\n";
}
console.log(s);

const process_scene = (arr : cell[][], rule: (arr:cell[][],x:number,y:number) => boolean) =>{
	let res : cell[][] = [];
	for(let i = 0; i < arr.length; i++){
		res.push([]);
		for(let j = 0; j < arr[0].length; j++){
			let current = new cell(arr[i][j].x,arr[i][j].y,arr[i][j].width,arr[i][j].height)
			res[i].push(current);
		}
	}

	for(let i = 0; i < res.length; i++){
		for(let j = 0; j < res[0].length; j++){
			let current = new cell(arr[i][j].x,arr[i][j].y,arr[i][j].width,arr[i][j].height);
			if(rule(res,j,i)){
				current.state = cell_state.alive;
			}
			arr[i][j] = current;
		}
	}

	arr.forEach(a =>{
		a.forEach(elem =>{
			draw_cell(elem,margin);
		});
	});
}

arr.forEach(line =>{
	line.forEach(elem=>{
		draw_cell(elem,margin);
	});
});

document.addEventListener("click",(e)=>{
	let x = Math.floor(e.x/cell_size);
	let y = Math.floor(e.y/cell_size);
	arr[y][x].conver();
	draw_cell(arr[y][x],margin);
});

document.addEventListener("keypress", (e)=>{
	if(e.key == ' '){
		process_scene(arr,rule);
	}
});
