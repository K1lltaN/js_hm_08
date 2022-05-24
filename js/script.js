import imgArr from "./gallery_items.js";

class gallery {
    
  constructor(arr) {
    this.ulRef = document.querySelector(".js-gallery");
    this.modal = document.querySelector(".js-lightbox");
    this.lb__img = document.querySelector(".lightbox__image");
    this.i = 0;
    this.idx = 0;
    for (const item of arr) {
      let li = document.createElement("li");
      let aRef = document.createElement("a");
      let imgRef = document.createElement("img");
      li.classList.add("gallery__item");
      aRef.classList.add("gallery__link");
      imgRef.classList.add("gallery__image");
      aRef.href = item.original;
      imgRef.src = item.preview;
      imgRef.setAttribute("data-source", item.original);
      imgRef.setAttribute("data-id", this.i);
      imgRef.alt = item.description;
      aRef.append(imgRef);
      li.append(aRef);
      this.ulRef.append(li);
      this.i += 1;
    }
  }

  mouseClick = (evt) => {
    if (evt.target.nodeName === "IMG" && !this.modal.classList.contains("is-open")) {
      evt.preventDefault();
      this.idx = Number(evt.target.getAttribute("data-id"));
      this.open();
      this.modal.classList.add("is-open");
      this.modal.addEventListener("click", this.mouseClick);
      window.addEventListener("keydown", this.keyboardClick);
    } else if (evt.target.dataset.action === "close-lightbox" || evt.target.className === "lightbox__overlay") {
      this.close();
    }
  };

  keyboardClick = (key) => {
    if (key.code === "Escape") {
      this.close();
      return;
    } else if (key.code === "ArrowLeft") {
      this.idx > 0 ? this.idx -= 1 : this.idx = this.i - 1;
    } else if (key.code === "ArrowRight") {
      this.idx < this.i - 1 ? this.idx += 1 : this.idx = 0;
    }
    this.open();
  };
  
  open() {
    let currentImg = document.querySelector(`[data-id="${this.idx}"]`);
    this.lb__img.src = currentImg.getAttribute("data-source");
  }

  close() {
    window.removeEventListener("keydown", this.keyboardClick);
    this.modal.classList.remove("is-open");
  }

  init() {
    this.ulRef.addEventListener("click", this.mouseClick);
  }
}

let gal = new gallery(imgArr);
gal.init();