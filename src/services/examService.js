import axiosInstance from './axiosConfig';
import { store } from '../store/store';
import { setFullScreenLoading } from '../store/slices/fullLoaderSlice';
import { setTransparentLoading } from '../store/slices/transparentLoaderSlice';

export const examService = {
  async submitGuardianKey(key) {
    try {
      store.dispatch(setTransparentLoading(true));
      console.log('Submitting guardian key',key);
      const response = await axiosInstance.post('/exams/submit-key',  key );
      console.log('Key submitted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error submitting key:', error);
      throw error;
    } finally {
      store.dispatch(setTransparentLoading(false));
    }
  },

  async checkKeyStatus() {
    try {
      store.dispatch(setFullScreenLoading(true));
      console.log('Checking key submission status');
      const response = await axiosInstance.get('/exams/key-status');
      console.log('Key status checked successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error checking key status:', error);
      throw error;
    } finally {
      store.dispatch(setFullScreenLoading(false));
    }
  }
}; 