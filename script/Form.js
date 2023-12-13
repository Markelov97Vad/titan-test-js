export default class Form {
  constructor(nameForm, handleFormAddPoint) {
    this._handleFormAddPoint = handleFormAddPoint;
    this._form = document.querySelector(`.${nameForm}`);
    this._inputList = this._form.querySelectorAll(`.${nameForm}__input`)
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
      console.log(this._getInputValue());
      this._handleFormAddPoint(this._getInputValue())
      if(this._getInputValue().date.length > 0 && this._getInputValue().plan.length > 0){
        // const inputData = this._inputList[0];
        const inputData = this._form.querySelector('#date');
        const inputPlan = this._form.querySelector('#plan');
        inputData.classList.add('menu__input_disabled')
        inputPlan.classList.add('menu__input_disabled')
      }
    })
  }
}
