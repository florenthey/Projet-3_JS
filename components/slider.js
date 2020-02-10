class Slider {

    constructor(slider, delay) {
        this.currentSlide = 0; // counter qui permet d'accrémenter la valeur de l'index voulu du tableau

        this.btnNext = document.getElementById("button-next"); // passer à la slide suivante
        this.btnPrev = document.getElementById("button-prev"); // passer à la slide précédente
        this.btnPause = document.getElementById("button-pause"); // stoper le défilement automatique des slides
        this.btnPlay = document.getElementById("button-play"); // reprendre le défilement automatique des slides

        this.slides = document.getElementById(slider); // conteneur des images
        this.slidesArray = Array.from(this.slides.querySelectorAll("img")); // transforme une NodeList en tableau

        // event listener
        this.btnNext.addEventListener("click", () => this.nextSlide());
        this.btnPrev.addEventListener("click", () => this.prevSlide()); 
        this.btnPause.addEventListener("click", () => this.pauseInterval());
        this.btnPlay.addEventListener("click", () => this.playInterval());

        this.delay = window.setInterval(() => this.nextSlide(), delay);

        this.pressKey();  // execute la fonction associée à la touche clavier correspondante
        this.display();   // affiche le slide en court;
        // this.btnPlay.style.display = "none";
    }

    pressKey() {
        document.onkeydown = () => {
            switch (window.event.keyCode) {
                case 40:
                    this.prevSlide()
                break;
                case 38:
                    this.nextSlide() 
                break;
            }
        };
    }

    pauseInterval() {
            clearInterval(this.delay);
            this.btnPause.style.display = "none";  
            this.btnPlay.style.display = "flex";
    }

    display() { 
        // selectionne tout les slides qui ne sont pas la slide courante
        $(this.slidesArray)
            .not(this.slidesArray[this.currentSlide])
            .css("display", "none")
        ; 
        // la slide courante
        this.slidesArray[this.currentSlide].style.display = "flex";
        console.log("this.currentSlide", this.currentSlide);
    }

    // passe à la slide suivante
    nextSlide() { 
        this.currentSlide < this.slidesArray.length -1 ? this.currentSlide++ : this.currentSlide = 0;
        this.display();
    }

    // passe à la slide précédente
    prevSlide() {
        console.log("length", this.slidesArray.length);
        this.currentSlide <= 0 ? this.currentSlide = this.slidesArray.length -1 : this.currentSlide--;
        // this.currentSlide = this.currentSlide = 0 ? this.slidesArray.length : this.currentSlide-- ;
        this.display();
    }
}
