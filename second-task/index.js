class FileManager{
    constructor() {
        this.selectedSquare = 'firstSquare';
        this.fileURL = ''
    }

    initiate(){
        this.#setRadioListeners();
        this.#setFileListener()
    }

    #setRadioListeners() {
        const radios = document.querySelectorAll('input[name="squareId"]')
        radios.forEach((radio) => radio.addEventListener('change', (e) => this.selectedSquare = e.target.value))
    }

    #setFileListener() {
        const fileInput = document.querySelector('input[type="file"]')
        fileInput.addEventListener('change', this.#changeSquareBackground.bind(this) )
    }

    #changeSquareBackground(e){
        this.#getFileURL(e);
        this.#setSquareImage()
    }

    #getFileURL(e){
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
        this.fileURL = fileURL ? fileURL : ''
    }

    #setSquareImage(){
        const square = document.getElementById(this.selectedSquare);
        console.log(square, this.fileURL)
        square.style.backgroundImage = `url(${this.fileURL})`;
        square.style.backgroundSize = 'contain';
    }
}

class ParallaxManager{
    constructor(firstId, secondId) {
    this.firstSquare = document.getElementById(firstId);
    this.secondSqare = document.getElementById(secondId);
    this.squareBlock = document.querySelector('.squaresBlock');
    }

    initiate(){
        this.#setScrollListener();
    }

    #setScrollListener(){
        this.squareBlock.addEventListener('scroll', this.#changeSquaresPosition.bind(this))
    }

    #changeSquaresPosition(){
        const [firstSquareOffset, secondSquareOffset] = this.#calculateOffsets();
        this.firstSquare.style.top = `${firstSquareOffset}px`
        this.secondSqare.style.top = `${secondSquareOffset}px`
    }

    #calculateOffsets() {
        const offsetPercent = this.squareBlock.scrollTop/(this.squareBlock.scrollHeight - this.squareBlock.offsetHeight);
        const firstSquareOffset = (this.squareBlock.offsetHeight - this.firstSquare.offsetHeight) * offsetPercent;
        const secondSquareOffset = (this.squareBlock.offsetHeight - this.firstSquare.offsetHeight) * offsetPercent * offsetPercent;
        return [firstSquareOffset, secondSquareOffset]
    }
}

const fileChanger = new FileManager();
const parallaxManager = new ParallaxManager('firstSquare', 'secondSquare');
fileChanger.initiate();
parallaxManager.initiate();
