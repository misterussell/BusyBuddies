import User from './models/User';

export default class Store {
  constructor() {
    this.user = new User();
  }
};
