var cell_state;
(function (cell_state) {
    cell_state["alive"] = "rgba(255,255,255,1)";
    cell_state["dead"] = "rgba(0,0,0,1)";
})(cell_state || (cell_state = {}));
class cell {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.state = cell_state.dead;
    }
    conver() {
        if (this.state == cell_state.alive) {
            this.state = cell_state.dead;
        }
        else {
            this.state = cell_state.alive;
        }
    }
}
