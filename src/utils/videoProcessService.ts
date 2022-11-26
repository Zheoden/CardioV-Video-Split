import axios from 'axios';
import { PROCESS_BACKEND_URL } from '../common/constants';
import { VideoProcessValue } from '../common/interfaces';

const client = axios.create({ baseURL: PROCESS_BACKEND_URL });

export const ProcessMediaFile = async (path: string, type: string, scale?: number): Promise<VideoProcessValue> => {
  return client
    .get(`getHeartValues?file=${path}&type=${type}&e=${scale ?? 1}`)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};
