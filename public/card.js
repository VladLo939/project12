class Card{
    /* 
        Можно лучше: лучше передавать не отдельные параметры, а сразу весь объект с данными карточки,
        т.к. представьте что у карточки появится ещё одно свойство (например author) которое нужно будет отобразить
        Если у нас создание карточки вызывается как new Card(name,link), придется во всех местах
        где вызывается создание карточки переписывать её вызов с new Card(name,link)  на new Card(name, link, author) 
        Если ли же мы передаем просто объект карточки в функцию ( new Card(cardData) ) нам придется гораздо меньше менять программу
    */
    constructor(name, link){
      this.name = name;
      this.link = link;
    }
    createCard(){
      /*
        Можно лучше: создавать карточку не вручную через createElement, а использовать
        для этого разметку в виде шаблонной строки.

        Стоит обратить внимание, что вставка данных с помощью интерполяции шаблонной строки и insertAdjacentHTML
        может привести к уязвимости XSS, т.к. данные вставляются на страницу как обычный html, а если они придут
        с сервера в данных может быть код злоумышленника и он будет вставлен на страницу как html и исполнится.
        Поэтому необходимо фильтровать html теги во вставляемых данных (такая процедура называется HTML sanitization
          пример как это сделать есть здесь 
          https://gomakethings.com/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/ )

        или вставлять данные с помощью textContent и style.backgroundImage уже после создания разметки
        элемента как показано на примере ниже:

        const template = document.createElement("div");
        template.insertAdjacentHTML('beforeend', `
          <div class="place-card">
          <div class="place-card__image">
            <button class="place-card__delete-icon"></button>
          </div>
          <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <button class="place-card__like-icon"></button>
          </div>
          </div>`);
        const placeCard = template.firstElementChild;
        placeCard.querySelector(".place-card__name").textContent = name;
        placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${link})`;
          
          
        Так же для создания разметки можно использовать тег tempate
        https://learn.javascript.ru/template-tag
        https://frontender.info/template/
      */
      const placeCard = document.createElement('div');
      placeCard.classList.add('place-card');
    
      const cardImage = document.createElement('div');
      cardImage.classList.add('place-card__image');
      cardImage.style.backgroundImage = `url(${this.link})`;
    
      const delButton = document.createElement('button');
      delButton.classList.add('place-card__delete-icon');
    
      const cardDescript = document.createElement('div');
      cardDescript.classList.add('place-card__description');
    
      const cardName = document.createElement('h3');
      cardName.classList.add('place-card__name');
      cardName.textContent = this.name
    
      const likeButton = document.createElement('button');
      likeButton.classList.add('place-card__like-icon');
    
      placeCard.appendChild(cardImage);
      cardImage.appendChild(delButton);
      cardDescript.appendChild(cardName);
      cardDescript.appendChild(likeButton);
      placeCard.appendChild(cardDescript);
    
      this.cardElement = placeCard;
      this.setEventListener()
      return placeCard
    }
  
    setEventListener() {
      this
        .cardElement
        .querySelector(".place-card__like-icon")
        .addEventListener("click", this.like);
  
      this
        .cardElement
        .querySelector(".place-card__delete-icon")
        .addEventListener("click", this.remove);
    }

    openImage = () => { 
      this.openImageCallback(this.link)
      console.log(this.link)
  }
  
    like = () => {
      event.target.classList.toggle('place-card__like-icon_liked')
    }
  
    remove = () => {
      this.cardElement.remove();
      this.deleteEventListener();
    }
  

    deleteEventListener(){
      this
        .cardElement
        .querySelector(".place-card__like-icon")
        .removeEventListener("click", this.like);

        this
        .cardElement
        .querySelector(".place-card__like-icon")
        .removeEventListener("click", this.remove);
    }
  }