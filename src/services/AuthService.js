class AuthService {
  static instance = null;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }
    this.user = null;
    this.isAuthenticated = false;
    AuthService.instance = this;
  }

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  login(userData) {
    this.user = userData;
    this.isAuthenticated = true;
    localStorage.setItem('user', JSON.stringify(userData));
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return this.user;
  }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }
}

export default AuthService.getInstance(); 