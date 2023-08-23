import axios from "axios";

class HTTPRequest {
  constructor() {
    this.data = [];
    this.endpoint = "http://localhost:3000/api/todos/";
  }

  async getAll() {
    const response = await axios.get(this.endpoint);
    this.data = response.data;
    return this.data;
  }

  async getOne(id) {
    const response = await axios.get(`${this.endpoint}${id}`);
    return response.data;
  }

  async postTodo(data) {
    return axios.post(this.endpoint, data);
  }

  async putTodo(data) {
    const { task, time, id } = data;
    return axios.put(`${this.endpoint}${id}`, { task, time });
  }

  async deleteTodo(id) {
    return axios.delete(`${this.endpoint}${id}`);
  }
}

export default HTTPRequest;
