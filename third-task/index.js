class UploadHandler{
  #correctExtensions = ['png', 'jpg', 'jpeg']

    constructor(){
        this.containerDnD = document.getElementById('DnDContainer');
        this.uploadInput = document.createElement("input");
        this.infoParagraph = document.createElement('p');
        this.fileURL = ''
    }

    initiate(){
        this.#setFileUploadListener();
        this.#setClickListener();
        this.#setDnDListener();
    }

    #setFileUploadListener(){
        this.uploadInput.addEventListener('input', this.#setBackground.bind(this));
    }

    #setBackground(e){
        this.#processFile(e);
        this.containerDnD.style.backgroundImage = `url(${this.fileURL})`
    }

    #processFile(e){
      this.#cleanUp();
      const files = e.target?.files || e.dataTransfer?.files;
      const file = files[0];
      this.#isExtensionCorrect(file.name) ? this.#setFileURL(file) : this.#showFileInfo(file);
    }

    #cleanUp(){
      this.infoParagraph.remove();
      this.fileURL = '';
    }

    #isExtensionCorrect(fileName){
        const extension = fileName.split('.').at(-1).split('-')[0];
        return this.#correctExtensions.includes(extension);
    }

    #setFileURL(file){
        this.fileURL = URL.createObjectURL(file);
    }

    #showFileInfo(file){
        this.infoParagraph = document.createElement('p');
        this.infoParagraph.textContent = `Название: ${file.name}, Размер: ${file.size/1000}МБ`
        this.containerDnD.append(this.infoParagraph);
    }

    #setClickListener(){
        const uploadButton = document.querySelector('#DnDContainer button');
        uploadButton.addEventListener('click', this.#openFileManager.bind(this));
    }

    #openFileManager(){
        this.uploadInput.type = 'file';
        this.uploadInput.click();
    }

    #setDnDListener(){
        this.containerDnD.addEventListener('dragover', (e) => e.preventDefault() );
        this.containerDnD.addEventListener('drop', this.#dropHandle.bind(this));
    }

    #dropHandle(e){
        e.preventDefault();
      if(e.target === this.containerDnD){
        this.#setBackground(e);
      }
    }
}

const uploadHandler = new UploadHandler();
uploadHandler.initiate();