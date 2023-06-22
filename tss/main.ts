//RULE DOES NOT WORK
//OR THE PROCESS ONE DOES NOT
//the canvas tag appears to be of type "HTMLCanvasElement"
const canvas : HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const c = canvas.getContext("2d") as CanvasRenderingContext2D;

let cell_size = 100;

const margin = 1;
let vert_cell_amount = canvas.width/cell_size;
let horz_cell_amount = canvas.height/cell_size;

let is_running : boolean = false;

let arr : cell[][] = [];

//fill up arr with cells
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

//given an x and y index in an array, checks all ofsets from -1 to 2 (exclusive)
//of that x and y index (except for when both ofsets are 0 which is the original point)
//counts the amount of cells that are alive
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
							 !(x_check == x && y_check == y)){
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

//given a rule function that takes in an array and indecies of a cell that returns a boolean
//processes weather or not each cell shoudl be alive and createas a new arr based on that finding
//sets the original array to have the same cell values as the secondary array
const process_scene = (arr : cell[][], rule: (arr:cell[][],x:number,y:number) => boolean) =>{
	let res : boolean[][] = [];
	for(let i = 0; i < arr.length; i++){
		res.push([]);
		for(let j = 0; j < arr[0].length; j++){
			res[i].push(rule(arr,j,i));
		}
	}

	for(let i = 0; i < arr.length; i++){
		for(let j = 0; j < arr[0].length; j++){
			if(res[i][j]){
				arr[i][j].state = cell_state.alive;
			}
			else{
				arr[i][j].state = cell_state.dead;
			}
		}
	}

	c.clearRect(0,0,canvas.width,canvas.height);
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

//ecent listners for clicking and keypresses
document.addEventListener("click",(e)=>{
	let x = Math.floor(e.x/cell_size);
	let y = Math.floor(e.y/cell_size);
	arr[y][x].conver();
	draw_cell(arr[y][x],margin);
});

document.addEventListener("keypress", (e)=>{
		switch(e.key){
			case ' ':
				process_scene(arr,rule);
			break;
			case 'r':
				console.log("reset");
				for(let i = 0; i < arr.length; i++){
				for(let j = 0; j < arr[0].length; j++){
					arr[i][j].state = cell_state.dead;
				}
			}
			process_scene(arr,rule);
			break;
			case 's':
				cell_size = parseInt(prompt("this works"));
			vert_cell_amount = canvas.width/cell_size;
			horz_cell_amount = canvas.height/cell_size;

			arr = [];

			for(let i = 0; i < horz_cell_amount; i++){
				arr.push([]);
				for(let j = 0; j < vert_cell_amount; j++){
					arr[i].push(new cell(j*cell_size,i*cell_size,cell_size,cell_size));
				}
			}
			process_scene(arr,rule);
			break;

		}
});

