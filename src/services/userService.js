//Storing the API call in this file[makes it easier to manage]


import axios from "axios";

export const fetchUsersFromAPI = async (page) => {
  const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
  return response.data.data;
};

