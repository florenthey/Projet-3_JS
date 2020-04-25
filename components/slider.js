class Slider {

    constructor(slider, delay) {
        this.currentSlide = 0; // counter qui permet d'accrémenter la valeur de l'index voulu du tableau
        this.delay = delay;

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

        this.player = this.setPlayer();
        this.pressKey();
        this.display();
    }

    // défilement automatique des slides
    setPlayer() {
        return window.setInterval(() => this.nextSlide(), this.delay);
    }

    // execute la fonction associée à la touche clavier correspondante
    pressKey() {
        document.onkeydown = () => {
            switch (window.event.keyCode) { 
                case 37:
                    this.prevSlide()
                    break;
                case 39:
                    this.nextSlide() 
                    break;
            }
        };
    }

    // met sur pause le slider automatique
    pauseInterval() {
        clearInterval(this.player);
        this.btnPlay.style.display = "flex";
        this.btnPause.style.display = "none";
    }

    // met sur play le slider automatique
    playInterval() {
        this.btnPlay.style.display = "none";
        this.btnPause.style.display = "flex";
        this.player = this.setPlayer();
    }

    // affiche le slide en court;
    display() { 
        // selectionne tout les slides qui ne sont pas la slide courante
        $(this.slidesArray)
            .not(this.slidesArray[this.currentSlide])
            .css("display", "none")
        ; 
        // la slide courante
        this.slidesArray[this.currentSlide].style.display = "flex";
    }

    // passe à la slide suivante
    nextSlide() { 
        this.currentSlide < this.slidesArray.length -1 ? this.currentSlide++ : this.currentSlide = 0;
        this.display();
    }

    // passe à la slide précédente
    prevSlide() {
        this.currentSlide <= 0 ? this.currentSlide = this.slidesArray.length - 1 : this.currentSlide--;
        this.display();
    }
}
