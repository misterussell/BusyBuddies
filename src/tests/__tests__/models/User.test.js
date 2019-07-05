import User from '../../../models/User';
import Store from '../../../Store';

describe('the User class', () => {
  it('should be unauthenticated by default', () => {
    const user = new User();
    expect(user.isAuthenticated).toBe(false);
  });
});
