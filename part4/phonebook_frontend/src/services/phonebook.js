import axios from "axios";

const baseURL = "/api/persons";

const getPhoneBook = () => {
  const request = axios.get(baseURL);
  return request.then(({ data }) => data);
};

const addEntry = (newEntry) => {
  const request = axios.post(baseURL, newEntry);
  return request.then(({ data }) => data)
};

const updateEntry = (updatedEntry) => {
  const { id } = updatedEntry;
  const request = axios.put(`${baseURL}/${id}`, updatedEntry);
  return request.then(({ data }) => data);
};

const deleteEntry = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request;
};

export default { getPhoneBook, addEntry, deleteEntry, updateEntry };
