import axios from 'axios';

const instance = axios.create({
  baseURL: "http://82.197.95.108:8003/",
});

export default instance;
