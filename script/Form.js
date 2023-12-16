export default class Form {
  constructor(nameForm, handleFormSubmit, handleButtonPlan) {
    this._handleFormSubmit = handleFormSubmit;
    this._handleButtonPlan = handleButtonPlan;
    this._form = document.querySelector(`.${nameForm}`);
    this._inputList = this._form.querySelectorAll(`.${nameForm}__input`);
    this._buttonPlan = this._form.querySelector('#button-plan')
    // this._inputDate = this._form.querySelector(`.${nameForm}__input`)
    // console.log(this._inputDate);
    // this._inputDate = this._inputList.filter(input => )
  }

  _getInputValue() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('Значение инпутов',this._getInputValue());
      this._handleFormSubmit(this._getInputValue())
      if(this._getInputValue().date.length > 0){
        // const inputData = this._inputList[0];
        const inputData = this._form.querySelector('#date');
        // const inputPlan = this._form.querySelector('#plan');
        inputData.classList.add('menu__input_disabled')
        // inputPlan.classList.add('menu__input_disabled')
      }
    })
    
    this._buttonPlan.addEventListener('click', () => {
      console.log('Значение инпута План',this._getInputValue());
      this._handleButtonPlan(this._getInputValue());
      // if(this.this._getInputValue().plan.length > 0) {

      // }
    })
  }
}
