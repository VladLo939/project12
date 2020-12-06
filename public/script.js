(function (){
  const placesList = document.querySelector('.places-list');
  const userPopup = document.querySelector('.popup');
  const editPopup = document.querySelector('#edit-popup');
  const editButton = document.querySelector('.user-info__edit-button');
  const popupInfoButton = document.querySelector('.user-info__button'); 
  const userName = document.querySelector('.user-info__name');
  const userJob = document.querySelector('.user-info__job');
  const zoomedImage = document.querySelector('.image-popup__zoomed')
  const imagePopup = document.querySelector('#image-popup')
  const avatar = document.querySelector('.user-info__photo')

  const userForm = document.forms.new;
  const editForm = document.forms.about;

  const { yourname, job } = editForm.elements;

  const config = {
    url: 'https://nomoreparties.co/cohort12',
    headers: {
      authorization: '543e6a46-79b5-4e39-8baf-9410e5f140a5',
      'Content-Type': 'application/json',
    }
  }
    
  const popupUser = new Popup(userPopup);
  const popupEdit = new Popup(editPopup);
  const popupImage = new ImagePopup(imagePopup, zoomedImage);
  const setInformation = new UserInfo(userName, userJob, avatar);
  const validationUser = new ValidateForm(userPopup);
  const validationEdit = new ValidateForm(editPopup);
  const api = new Api(config)


  function onFormSubmit() {
    /*
      Можно лучше: в ответ на запрос сервер возвращает обновленные данные
      лучше использовать их и передавать setUserInfo в блоке then
    */
    setInformation.setUserInfo(yourname.value, job.value);
    api.editUserData(yourname.value, job.value)
    .then((data) => {
      setInformation.updateUserInfo(yourname.value, job.value)
    })
    .catch((err) => {
      console.log(err)
    })


   }


  popupInfoButton.addEventListener('click', function(){
    popupUser.open()
  })




  editButton.addEventListener('click', function(){
    setInformation.showInfo(yourname, job);
    popupEdit.open();
  })



  userForm.addEventListener('submit', function(event){
    event.preventDefault();

    const { name, link } = userForm.elements;
    const card = new Card (name.value, link.value)

    cardList.addCard(card.createCard())
    popupUser.close()
  })

  editForm.addEventListener('submit', function(event){
    event.preventDefault();
    onFormSubmit()

    /*
      Надо исправить: перенесите закрытие попапа в блок then
      Попап должен закрываться только, если сервер ответил подтверждением
    
    */
    popupEdit.close()
    
  })

  placesList.addEventListener('click', function(){
    popupImage.openImage()
  })

  userForm.addEventListener('input', function(event){
    validationUser.handlerInputForm(event)
    validationUser.resetErrors
  })

  editForm.addEventListener('input', function(event){
    validationEdit.handlerInputForm(event)
    validationEdit.resetErrors
    
  })

  api.getUserData()
    .then((res) => {
    setInformation.updateFromServer(res)
  })
    .catch((err) => {
      console.log(err)
    })


  api.getCardsData()
    .then((res) => { 
    const initCards = res.map(cardData => {
      const card = new Card(cardData.name, cardData.link)
      cardElement = card.createCard();
      card.setEventListener(cardElement);
      return cardElement;
    });
    const serverCardList = new CardList(placesList, initCards)
    serverCardList.render()
  })
    .catch((err) => {
      console.log(err)
    })
 
})()

/*
  Ревью 9 проектной работы

  Неплохая работа, класс Api создан и запросы на вервер выполняются
  Но по организации обмена с сервером есть несколько замечаний:
  Надо исправить:
  - в методах класса Api не хватает проверки, что запрос выполнился успешно 
  - в конце цепочки обработки промиса должен быть блок catch обрабатывающий ошибку
  - все изменения на странице должны происходить, только после того, как сервер ответил подтверждением
  - добавлять карточки на страницу из массива не нужно, сейчас они загружаются с сервера


*/



/*
  Ревью 9 проектной работы

  Почти все критические замечания исправлены, но попап так же нужно закрывать
  только если сервер ответил подтверждением, разместите закрытие попапа в блоке then
  Это довольно легко испарвить и я уверен, что Вы справитесь самостоятельно, принимаю работу в таком виде.

  Самое главное, что нужно запомнить из этой проектной работы:
  - все действия на странице выполняем после ответа сервера
  - у запросов должна быть проверка, что сервер ответил подтверждением if (!res.ok)
  - у всех запросов должен быть обработчик ошибки
  - обработка ошибок должна быть в самом конце цепочки обработки промиса

  Успехов в дальнейшем обучении!
*/


/*
  Отлично, необходимые классы созданы, очень хорошо, что применено наследование для попапа изображения
  и содержимое script.js обернуто в IIFE. Но есть несколько замечаний, которые нужно исправить

  Надо исправить:
  - удалять обработчики событий с элементов карточки при её удалении 
  - не создавать в классе CardList экземпляры класса Card
  - не нужно вызывать навешивание обработчиков при каждом открытии попапа
  - класс UserInfo не должен взаимодействовать с формой, только отображать данные пользователя в шапке

  Можно лучше: 
  - вешать обработчик на открытие попапа в классе карточки и передавать в класс карточки колбэк на открытие попапа
    Передача колбэков - очень частый механизм связывания разных частей программы между собой, и будет очень здорово
    если Вы попрактикуетесь в этом
  - в Card лучше передавать не отдельные параметры, а сразу весь объект с данными карточки
  - создавать карточку не вручную через createElement, а использовать для этого разметку в виде шаблонной строки
  - в ImagePopup если класс никак не переопределяет метод родителя, можно просто использовать  метод родителя close
  - объект с сообщениями об ошибках передавать как параметр конструктора класса ValidateForm
 */

/*
  Болшьшая часть замечаний исправлена, но несколько ещё осталось:

  - не исправлено замечание по классу UserInfo - он не должен взаимодействовать с формой, а 
  данные должны передаваться как параметры метода

  - сделайте очистку ошибок валидации методом класса ValidateForm, а не создавайте отдельный класс

*/


/*
  Отлично, теперь сделано верно, работа принята
  Только не забудьте поправить ещё одно небольшое замечание - подставляйте в форму профиля данные при открытии попапа

  Если захотите углубиться в тему ООП и рефакторинга оставлю пару ссылок:
  https://ota-solid.now.sh/ - принципы проектирования SOLID применяемые для проектирования ООП программ  
  https://refactoring.guru/ru/design-patterns - паттерны проектирования
  https://refactoring.guru/ru/refactoring - рефакторинг

  Успехов в дальнейшем обучении!
*/

/**
 * У вас получилась хорошая работа, функционал выполнен согласно проектному заданию и работает без очевидных багов.
 *
 * Что понравилось:
 *    - Для валидации полей используется объект `.validity` и соответствующие html5 атрибуты.
 *    - Выполнено дополнительное задание - помимо формы редактирования профиля также валидируется и форма "Новое место"
 *
 * Что надо исправить для того, чтобы работа была принята:
 *    - Обратите внимание, если мы закроем модальное окно с ошибками валидации и затем откроем заново,
 *      то ошибки останутся. Также не сбрасываются данные из полей формы "Новое место" после закрытия/открытия
 *      (если мы что то введём в форму, затем закроем без сохранения и откроем заново, то данные останутся).
 *    - Удалите объявление несуществующего файла стилей edit-popup.css из index.css (ошибка в консоли)
 *    - Все комментарии в коде, отмеченные как "Надо исправить"
 *
 *  Что можно сделать лучше:
 *    - Функцию появления/скрытия модального окна можно представить одной функцией. Для этого функция переключения
 *      модального окна должна принимать минимум один параметр - модальное окно, которое требуется открыть.
 *      Повесьте слушатели событий точечно на необходимые кнопки: открытия и закрытия модального окна.
 *      Внутри этого слушателя вызывайте функцию переключения модального окна. В качестве параметра передайте то
 *      модальное окно, к которому относится кнопка открытия или закрытия модального
 *    - Все комментарии в коде, отмеченные как "Можно лучше".
 */

/**
 * 7-ой спринт, 2-ая итерация.
 * Хорошая работа, основная часть замечаний исправлена, осталось совсем немного.
 * Для того, чтобы работа была принята, исправьте, пожалуйста, все замечания в коде, отмеченные как "Надо исправить".
 */

/**
 * 7-ой спринт, 3-я итерация
 * Вы отлично справились, все комментарии проработаны и исправлены, успехов на следующих спринтах!
 */
