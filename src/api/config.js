export const API_BASE_URL = 'https://hle-backend.onrender.com';

export const API_ENDPOINTS = {
  // Auth - NO /api prefix
  LOGIN: '/auth/login/',
  REGISTER: '/auth/register/',
  
  // Complaints
  COMPLAINTS: '/complaints/',
  
  // Notices
  NOTICES: '/notices/',
  
  // Mess
  MESS_MENU: '/mess/menu/',
  MESS_MENU_TODAY: '/mess/menu/today',
  MESS_FEEDBACK: '/mess/feedback/',
  
  // Bills
  MY_BILLS: '/bills/my-bills',
  PENDING_TOTAL: '/bills/pending-total',
};
