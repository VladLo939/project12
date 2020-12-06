class ImagePopup extends Popup{
    constructor (popup, imageSrc){
        super(popup);
        this.imageSrc = imageSrc;
        
    }

    findLink (){ 
        return this.imageSrc.src = event.target.style.backgroundImage.slice(5, -2)
    }

    /*
        Можно лучше: класс ImagePopup знает откуда брать картинку карточки, т.е.
        знает о структуре карточки описанной в классе Card. Это нарушает принцип единственно
        ответсвенности, поэтому лучше вешать обработчик на саму карточку в классе Card.
        Этот обработчик берет ссылку на изображение и передает её методу открытия попапа изображения.
        Таким образом вся информация о структуре карточки остается внутри класс Card

        Пример кода:
        const popupImg = new ImagePopup (...................);

        //функция которая принимает картинку и открывает попап
        function openImagePopup(imageLink) {
            popupImg.openImage(imageLink);
        }

        //в класс карточки передается колбэк, Card вызывает переданный ей колбэк передавая в него url картинки
        class Card {
            constructor(name, link, openImageCallback) {
                ......
                this.openImageCallback = openImageCallback;
            }

            openImage() { 
                this.openImageCallback(this.link);
            }
        }

        или не создавать функцию openImagePopup, а в качестве колбэка openImageCallback в Card
        можно использовать метод openImage класса ImagePopup привязанный к классу ImagePopup через bind
        https://learn.javascript.ru/bind#reshenie-2-privyazat-kontekst-s-pomoschyu-bind
        https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
        или стрелочную функцию
    */
    openImage (){
        if (event.target.classList.contains('place-card__image')){
            this.findLink()
            this.open()
        }
    }
}