import axios from 'axios';

export const addUserApi = user => {
  return axios
    .post('http://localhost:3000/users', user)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const getUsersApi = () => {
  return axios
    .get('http://localhost:3000/users')
    .then(res => res.data)
    .catch(err => console.log(err));
};
