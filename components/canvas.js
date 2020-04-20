class Canvas {
    constructor() {
        this.canvas = document.getElementById("signature");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.count = 0;
        

        // listener desktop
        this.canvas.addEventListener("mousedown", e => this.startClick(e));
        this.canvas.addEventListener("mouseup", () => this.finishLine());
        this.canvas.addEventListener("mousemove", e => this.draw(e));

        // listener mobile
        this.canvas.addEventListener("touchstart", e => this.startTouch(e));
        this.canvas.addEventListener("touchend", () => this.finishLine());
        this.canvas.addEventListener("touchmove", e => this.draw(e));

        window.addEventListener('resize', e => this.resize()); 

        this.resize();

        this.painting = false;
    }   

    resize() {
        this.canvas.width = 250;
        this.canvas.height = 100;
    }
    
    startClick(e) {
        this.startX = e.clientX - this.canvas.getBoundingClientRect().left;
        this.startY = e.clientY - this.canvas.getBoundingClientRect().top;
     
        this.painting = true;
        this.draw(e);
    }   

    startTouch(e) {
        e.preventDefault(); // évite le scroll accompagnent le déplacement de la souris
        this.startX = e.touches[0].clientX - this.canvas.getBoundingClientRect().left;
        this.startY = e.touches[0].clientY - this.canvas.getBoundingClientRect().top;

        this.painting = true;
        this.draw(e);
    }

    finishLine() {
        this.painting = false;
    }

    draw(e) {   
        this.endX = e.clientX - this.canvas.getBoundingClientRect().left || e.touches[0].clientX - this.canvas.getBoundingClientRect().left;
        this.endY = e.clientY - this.canvas.getBoundingClientRect().top || e.touches[0].clientY - this.canvas.getBoundingClientRect().top;

        if(this.painting) {
            this.ctx.lineWidth = 6;
            this.ctx.lineCap = "round";
            this.ctx.beginPath(); // créer un nouveau chemin
            this.ctx.moveTo(this.startX, this.startY); // point de départ de la nouvelle ligne
            this.ctx.lineTo(this.endX, this.endY); 
            this.ctx.closePath();
            this.ctx.stroke();

            this.startX = this.endX;
            this.startY = this.endY;

            this.count++;

            if(this.count >= 15) {
                this.displayButton();
            }
        }
    }

    displayButton() {
        document.getElementById("form-submit").style.display = "flex";
    }
}   