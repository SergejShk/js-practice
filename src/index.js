import { addUserApi, getUsersApi, updateUserData } from './js/jsonServerApi';
import createUserItem from './tamplate/userTemplate.hbs';
import createUsersList from './tamplate/usersListItems.hbs';

const refs = {
  formRef: document.querySelector('.form'),
  usersListRef: document.querySelector('.js-users'),
};

let userId = null;
let editedEL = null;

const formSubmitHandler = async e => {
  e.preventDefault();

  const userData = {};
  const formElements = e.target.elements;

  for (const key in formElements) {
    if (formElements.hasOwnProperty(key) && isNaN(key)) {
      userData[key] = formElements[key].value;
    }
  }
  try {
    if (!userId) {
      const user = await addUserApi(userData);
      refs.usersListRef.insertAdjacentHTML('beforeend', createUserItem(user));
    } else {
      const updatedUser = await updateUserData(userData, userId);
      userId = null;
      console.log(editedEL);
      editedEL.forEach(el => {
        const [prevContent] = el.textContent.split(' ');
        el.textContent = prevContent + ' ' + updatedUser[el.dataset.input];

        console.log(el);
      });
    }

    refs.formRef.reset();
  } catch (error) {
    console.log(error);
  }
};

const editButtonClickHandler = e => {
  if (e.target.dataset.action !== 'edit') return;
  const itemEl = e.target.closest('li');
  userId = itemEl.dataset.id;

  const userDescriptionArr = itemEl.querySelectorAll('.user__descr');
  editedEL = userDescriptionArr;

  userDescriptionArr.forEach(userEl => {
    const userData = userEl.textContent.split(' ')[1];
    const inputKey = userEl.dataset.input;
    refs.formRef.elements[inputKey].value = userData;
  });
};

getUsersApi().then(
  data => (refs.usersListRef.innerHTML = createUsersList(data))
);

refs.formRef.addEventListener('submit', formSubmitHandler);
refs.usersListRef.addEventListener('click', editButtonClickHandler);
