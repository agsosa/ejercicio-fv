import axios from 'axios';
import Issue from '../types/issue.interface';

const http = axios.create({
  baseURL: 'https://mocki.io/',
});

class ComposerService {
  async findOne(orderId: string, productGroupingType: string, issueId: string) {
    return http.get<Issue[]>('/v1/86dd4882-29f8-4607-ad10-f388b4d1f009'); // TODO: Cambiar a post endpoint real cuando tenga acceso al VPN
  }
}

export default new ComposerService();
