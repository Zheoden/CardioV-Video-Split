import axios from 'axios';
import { PROCESS_BACKEND_URL } from '../common/constants';
import { VideoProcessValue } from '../common/interfaces';

const client = axios.create({ baseURL: PROCESS_BACKEND_URL });

export const ProcessMediaFile = async (path: string): Promise<VideoProcessValue> => {
  return client
    .get(`getHeartValues?file=${path}&type=i`)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};
