import { addUserApi, getUsersApi } from './js/jsonServerApi';
import createUserItem from './tamplate/userTemplate.hbs';
import createUsersList from './tamplate/usersListItems.hbs';

const refs = {
  formRef: document.querySelector('.form'),
  usersListRef: document.querySelector('.js-users'),
};

const formSubmitHandler = e => {
  e.preventDefault();

  const userData = {};
  const formElements = e.target.elements;

  for (const key in formElements) {
    if (formElements.hasOwnProperty(key) && isNaN(key)) {
      userData[key] = formElements[key].value;
      console.log(userData);
    }
  }
  addUserApi(userData).then(data => console.log(data));
  refs.usersListRef.insertAdjacentHTML('beforeend', createUserItem(userData));
  refs.formRef.reset();
};

getUsersApi().then(
  data => (refs.usersListRef.innerHTML = createUsersList(data))
);

refs.formRef.addEventListener('submit', formSubmitHandler);
