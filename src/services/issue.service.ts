import axios from 'axios';
import Issue from '../types/issue.interface';

const http = axios.create({
  baseURL: 'https://mocki.io/',
});

class IssueService {
  async findAll(/* page */) {
    return http.get<Issue[]>('/v1/250bb0eb-a420-4f07-a6ba-9363616d6edd');
  }

  /*get(id: string) {
    return http.get(`/tutorials/${id}`);
  }

  create(data: ITutorialData) {
    return http.post('/tutorials', data);
  }

  update(data: ITutorialData, id: any) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title: string) {
    return http.get(`/tutorials?title=${title}`);
  }*/
}

export default new IssueService();
