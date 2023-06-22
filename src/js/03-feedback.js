import storageApi from './storage';
import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const STORAGE_FORM_KEY = "feedback-form-state";


const refs = {
    form: document.querySelector('.feedback-form'),
}

initPage()

function initPage (){
    const savedValue = storageApi.load(STORAGE_FORM_KEY);

    if(!savedValue){
      return
    }

    Object.entries(savedValue).forEach(([name, value])=>{

        refs.form.elements[name].value = value;

    })
}

const saveToLocalStorage = (event) => {

    let savedValue = storageApi.load(STORAGE_FORM_KEY);

    if(!savedValue){
        savedValue = {};
      }

    const {name, value} = event.target;
    savedValue[name] = value;
    storageApi.save(STORAGE_FORM_KEY, savedValue);
}
refs.form.addEventListener('input',throttle(saveToLocalStorage, 500));

const handleSubmit = (event) =>{

    event.preventDefault();
    const {email,message}=event.target;

    if(email.value==='' ||message.value===''){
        Notify.warning('Nie wszystkie pola są wypełnione');
        return
    }
    const userData = storageApi.load(STORAGE_FORM_KEY);
    console.log(userData);
    localStorage.removeItem(STORAGE_FORM_KEY);
    refs.form.reset();
    Notify.success('wszystko w porzątku');

}

refs.form.addEventListener('submit', handleSubmit);