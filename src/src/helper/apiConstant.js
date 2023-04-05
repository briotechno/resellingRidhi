// API url lists
export const api = {
  // Base URL
  baseURL: 'https://fyfmedia.app/Resellingapp/api/v1/',

  // Auth URL
  login: 'auth/login',
  register: 'register/users',
  forgotPwd: 'users/forgot-password',
  logout: 'logout',

  // Profile URL
  getProfile: 'get/profile',
  updateProfile: 'edit/profile',
  getPlan: 'get/plan',
  getIAP: 'inapp-plan-purchase',
  // Home URL
  getDashboard: 'get/dashboard',

  //brand URL
  getBrandList: 'get/brand',
  //shop URL
  getShopList: 'get/shop',
  //offer URL
  getOfferList: 'get/offer-list',
  getEmojiOffer: 'offer/emoji',
  getemojirate: 'count/emoji-offer',

  //news URL
  getNewsList: 'get/news',
  getAnalyticsList: 'get/analytics',
  getCoupansList: 'get/coupons',
  //aboutus and privacypolicy URL
  getAboutUS: 'get/aboutus',
  getPrivacyPolicy: 'get/privacy-policy',

  //filter URL
  getCategorywithBrand: 'get/category/brand',
  getfilter: 'offer/filter',
};
