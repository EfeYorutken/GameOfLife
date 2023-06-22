enum cell_state{
	alive =  "rgba(255,255,255,1)",
	dead =  "rgba(0,0,0,1)"
}

 interface cell_if{
	x : number,
	y : number,
	width : number,
	height : number,
	state : cell_state,
	conver() : void
}

 class cell implements cell_if{
	x : number;
	y : number;
	width : number;
	height : number;
	state : cell_state;
	constructor(x : number,y : number,w : number, h : number){
		this.x  = x;
		this.y  = y;
		this.width  = w;
		this.height  = h;
		this.state  = cell_state.dead;
	}
	conver(){
		if(this.state == cell_state.alive){this.state = cell_state.dead;}
		else{this.state = cell_state.alive;}
	}
}
