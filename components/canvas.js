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

    // si redimensionnement de la fenêtre du navigateur, positionnement du canvas reinitialisé par rapport au viewport.
    resize() {
        this.canvas.width = 250;
        this.canvas.height = 100;
    }
    
    // point de début du tracé au clique par rapport à sa position sur le viewport
    startClick(e) {
        this.startX = e.clientX - this.canvas.getBoundingClientRect().left;
        this.startY = e.clientY - this.canvas.getBoundingClientRect().top;
     
        this.painting = true;
        this.draw(e);
    }   

    // point de début du tracé au touché (smartphone) par rapport à sa position sur le viewport
    startTouch(e) {
        e.preventDefault(); // évite le scroll accompagnent le déplacement de la souris (annule le comportement de base)
        this.startX = e.touches[0].clientX - this.canvas.getBoundingClientRect().left;
        this.startY = e.touches[0].clientY - this.canvas.getBoundingClientRect().top;

        this.painting = true;
        this.draw(e);
    }

    // point de fin du tracé lors du relâchement du click ou du touché
    finishLine() {
        this.painting = false;
    }

    // initialisation des fonctions de tracés
    draw(e) {   
        // point de fin du tracé par rapport à sa position sur le viewport
        this.endX = e.clientX - this.canvas.getBoundingClientRect().left || e.touches[0].clientX - this.canvas.getBoundingClientRect().left;
        this.endY = e.clientY - this.canvas.getBoundingClientRect().top || e.touches[0].clientY - this.canvas.getBoundingClientRect().top;

        if(this.painting) {
            this.ctx.lineWidth = 6;
            this.ctx.lineCap = "round";
            this.ctx.beginPath(); // initialise un nouveau tracé
            this.ctx.moveTo(this.startX, this.startY); // l'endroit où commence le tracé
            this.ctx.lineTo(this.endX, this.endY);  // le point suivant du tracé
            this.ctx.stroke(); // ferme la forme

            // Le point de départ du nouveau tracé est le point d'arrivé du tracé précédent
            this.startX = this.endX;
            this.startY = this.endY;

            this.count++;

            if(this.count >= 15) {
                this.displayButton();
            }
        }
    }

    // si canvas valide, affiche le bouton de validation
    displayButton() {
        document.getElementById("form-submit").style.display = "flex";
    }
}   