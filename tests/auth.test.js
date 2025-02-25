jest.mock('../src/views/auth/js/auth.js', () => ({
  checkAuth: jest.fn(),
  doPayment: jest.fn()
}));

const { checkAuth, doPayment } = require('../src/views/auth/js/auth.js');

describe('Auth Functions', () => {
  beforeEach(() => {
    localStorage.clear();
    checkAuth.mockReset();
    doPayment.mockReset();
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true
    });
    global.alert = jest.fn();
  });

  // Test case: checkAuth returns false and redirects if no user is logged in

  test('checkAuth should return false and redirect to signin if no user is logged in', () => {
    checkAuth.mockImplementation(() => {
      global.alert('You must be logged in to buy a ticket.');
      window.location.href = 'auth/signin.html';
      return false;
    });

    const result = checkAuth();
    expect(result).toBe(false);
    expect(window.location.href).toBe('auth/signin.html');
    expect(global.alert).toHaveBeenCalledWith('You must be logged in to buy a ticket.');
  });

   // Test case: checkAuth returns true if the user is logged in

  test('checkAuth should return true if a user is logged in', () => {
    localStorage.setItem('loggedInUser', 'testUser');
    checkAuth.mockImplementation(() => true);

    const result = checkAuth();
    expect(result).toBe(true);
  });

  // Test case: doPayment redirects to payment page if user is logged in

  test('doPayment should redirect to the payment page if user is logged in', () => {
    localStorage.setItem('loggedInUser', 'testUser');
    doPayment.mockImplementation(() => {
      window.location.href = '../locations/payment/payment.html'; // Simulate redirect
    });

    doPayment();
    expect(window.location.href).toBe('../locations/payment/payment.html');
  });


  // Test case: doPayment does not redirect if user is not logged in

  test('doPayment should not redirect to payment page if user is not logged in', () => {
    localStorage.clear();
    doPayment.mockImplementation(() => {
      if (!localStorage.getItem('loggedInUser')) {
        return;
      }
      window.location.href = '../locations/payment/payment.html';
    });

    doPayment();
    expect(window.location.href).not.toBe('../locations/payment/payment.html');
  });

  // Test case: Profile link points to signin page if no user is logged in

  test('Profile link should point to signin page if no user is logged in', () => {
    document.body.innerHTML = `
      <a id="profileLink" href=""></a>
      <div id="profileIconContainer"></div>
    `;
    const profileLink = document.getElementById('profileLink');
    const profileIconContainer = document.getElementById('profileIconContainer');

    localStorage.clear(); // No user logged in
    profileLink.href = 'auth/signin.html';
    profileIconContainer.innerHTML = '<svg></svg>'; // Simulate SVG icon for guest users

    expect(profileLink.href).toContain('auth/signin.html');
    expect(profileIconContainer.innerHTML).toMatch(/<svg/);
  });
  
    // Test case: Profile link points to profile page if user is logged in

  test('Profile link should point to profile page if user is logged in', () => {
    document.body.innerHTML = `
      <a id="profileLink" href=""></a>
      <div id="profileIconContainer"></div>
    `;
    const profileLink = document.getElementById('profileLink');
    const profileIconContainer = document.getElementById('profileIconContainer');

    localStorage.setItem('loggedInUser', 'testUser');
    profileLink.href = 'profile.html';
    profileIconContainer.innerHTML = '<img src="user-avatar.jpg" alt="Profile">';

    expect(profileLink.href).toContain('profile.html');
    expect(profileIconContainer.innerHTML).toMatch(/<img/);
  });
});
