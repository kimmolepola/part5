import axios from 'axios';

const baseUrl = '/api/blogs';

let token;

const setToken = (t) => {
  token = `bearer ${t}`;
};

const create = async (content) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, content, config);
  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll, setToken, create };
