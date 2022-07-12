import axios from 'axios';

export const addUserApi = user => {
  return axios.post('http://localhost:3000/users', user).then(res => res.data);
};

export const getUsersApi = () => {
  return axios
    .get('http://localhost:3000/users')
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const updateUserData = (data, id) => {
  return axios
    .patch('http://localhost:3000/users/' + id, data)
    .then(res => res.data)
    .catch(err => console.log(err));
};
