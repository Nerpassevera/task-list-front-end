import axios from 'axios';

// const kbaseURL = 'http://127.0.0.1:5000';
const kbaseURL = 'https://task-list-api-a1l3.onrender.com';

export const getAllInstancesApi = (type) => {
  return axios.get(`${kbaseURL}/${type}`).then((response) => response.data);
};

export const addInstanceApi = (type, item) => {
  return axios
    .post(`${kbaseURL}/${type}`, item)
    .then((response) => response.data);
};

export const markTaskCompleteApi = (id, isComplete) => {
  const completeAction = isComplete ? 'mark_complete' : 'mark_incomplete';
  const completedAt =
    completeAction === 'mark_complete' ? new Date().toISOString() : null;
  return axios
    .patch(`${kbaseURL}/tasks/${id}/${completeAction}`, {
      completed_at: completedAt,
    })
    .then((response) => {
      if (!response.data) {
        throw new Error('No response data received');
      }
      return response.data;
    });
};

export const deleteInstanceApi = (type, id) => {
  return axios
    .delete(`${kbaseURL}/${type}/${id}`);
}