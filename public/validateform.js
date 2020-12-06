/*
  Можно лучше: объект с сообщениями об ошибках передавать как параметр конструктора класса ValidateForm
  Это позволит передавать разные объекты, если нужно будет перевести приложение на другой язык
*/

const errorMessages = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    wrongUrl: 'Здесь должна быть ссылка',
  }

  class ValidateForm{
      constructor(form){
        this.form = form
        this.form.addEventListener(`click`, event => {
          if (event.target.classList.contains(`popup__close`)) this.resetErrors();
      });
      }

      isValidate(input){
    input.setCustomValidity(""); 
  
        if (input.validity.valueMissing) {
            input.setCustomValidity(errorMessages.empty);
        return false
    }
  
        if (input.validity.tooShort || input.validity.tooLong) {
            input.setCustomValidity(errorMessages.wrongLength);
        return false
    } 
  
        if (input.validity.typeMismatch && input.type === 'url') {
            input.setCustomValidity(errorMessages.wrongUrl);
        return false
    }
  
        return input.checkValidity();
      }

      validateInput(input) {
        
        const errorElem = input.closest('.popup__form').querySelector(`#${input.id}-error`);
        this.errorElem = errorElem
        this.isValidate(input)
        errorElem.textContent = input.validationMessage;
      }

      setSubmitButtonState(button, state) {
        if (state) {
            button.removeAttribute('disabled');
            button.classList.add(`popup__button_enabled`);
        } else {
            button.setAttribute('disabled', true);
            button.classList.remove(`popup__button_enabled`);
        }
      }


      handlerInputForm(evt){
        const submit = evt.currentTarget.querySelector('.popup__button');
        const [...inputs] = evt.currentTarget.elements;
        
        
        this.validateInput(evt.target)
        
        if (inputs.every(this.isValidate)) { 
          this.setSubmitButtonState(submit, true);
        } else {
          this.setSubmitButtonState(submit, false);
        }
      }

      resetErrors(){
          const errorSpans = this.form.querySelectorAll('.error');
          errorSpans.forEach(span => span.textContent = '');
      }
      

  }