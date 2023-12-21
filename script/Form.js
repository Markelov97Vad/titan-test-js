export default class Form {
  constructor(nameForm, handleFormSubmit, handleButtonPlan) {
    this._handleFormSubmit = handleFormSubmit;
    this._handleButtonPlan = handleButtonPlan;
    this._form = document.querySelector(`.${nameForm}`);
    this._inputList = this._form.querySelectorAll(`.${nameForm}__input`);
    this._buttonPlan = this._form.querySelector('#button-plan')
  }

  _getInputValue() {
    this._formValues = {};
    console.log(this._inputList);
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValue());

      if(this._getInputValue().time.length > 0){

        const inputData = this._form.querySelector('#date');
        inputData.setAttribute('disabled', '')

      }
    })
    
    this._buttonPlan.addEventListener('click', () => {
      this._handleButtonPlan(this._getInputValue());
    })
  }
}
