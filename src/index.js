import './style.css';

class LazyLoading {

    constructor(element) {
        this.element = element;
        this.elementTopPosition = element.getBoundingClientRect().top

        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.init());
        window.addEventListener('load', this.init());
    }

    isElementIntersecting(threshold = 0) {
        return this.elementTopPosition <= (window.pageYOffset + threshold);
    }

    isElementLoaded() {
        return this.element.classList.contains('loaded');
    }

    isElementSeen() {
        return this.element.classList.contains('fadedIn');
    }
    
    loadImage() {
        if(this.isElementIntersecting(window.innerHeight + 200)) {
            this.element.src = this.element.dataset.src;
            this.element.classList.add('loaded');

            if(this.isElementIntersecting(window.innerHeight / 2)) {
                this.fadeInImage();
            }
        }
    }

    fadeInImage() {
        if(this.isElementIntersecting(window.innerHeight / 2)) {
            this.element.style.opacity = 1;
            this.element.classList.add('fadedIn');
        }
    }

    init() {
    
        if(this.isElementLoaded() && this.isElementSeen()) {
            return;
        }

        if(this.isElementLoaded()) {
            return this.fadeInImage();
        }

        this.loadImage();
    }

}

setTimeout(() => {
    document.querySelectorAll('img[data-src]').forEach((item) => {
        new LazyLoading(item)
    });
}, 1000)