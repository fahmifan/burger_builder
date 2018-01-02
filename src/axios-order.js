import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-myburger-19cb8.firebaseio.com/'
});

export default instance;