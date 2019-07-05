import User from '../../models/User';
import Store from '../../Store';
jest.mock('../../models/User');

beforeEach(() => {
  User.mockClear();
});

describe('the User class', () => {
  it('should be called when a new store is created', () => {
    expect(User).not.toHaveBeenCalled();
    const store = new Store();
    expect(User).toHaveBeenCalledTimes(1);
    User.mockClear();
  });
});
