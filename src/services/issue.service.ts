import axios from 'axios';
import Issue from '../types/issue.interface';

const http = axios.create({
  baseURL: 'https://mocki.io/',
});

class IssueService {
  async findAll() {
    return http.get<Issue[]>('/v1/250bb0eb-a420-4f07-a6ba-9363616d6edd');
  }
}

export default new IssueService();
