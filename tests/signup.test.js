    /**
     * @jest-environment jsdom
     */

    describe('Signup Form Tests', () => {
        // Mock localStorage
        const localStorageMock = (() => {
        let store = {};
        return {
            getItem: jest.fn((key) => store[key] || null),
            setItem: jest.fn((key, value) => {
            store[key] = value;
            }),
            clear: jest.fn(() => {
            store = {};
            })
        };
        })();
    
        let alertMock;
        
        let originalLocation;
        
        beforeEach(() => {
        // Setup mock DOM
        document.body.innerHTML = `
            <form>
            <input id="nameInput" type="text">
            <input id="emailInput" type="email">
            <input id="passwordInput" type="password">
            <input id="phoneInput" type="tel">
            <button id="signupBtn" type="submit">Sign Up</button>
            </form>
        `;
        
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock
        });
        
        localStorageMock.clear();
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
        
        alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
        
        originalLocation = window.location;
        delete window.location;
        window.location = { href: '' };
        
        document.getElementById("signupBtn").addEventListener("click", function (e) {
            e.preventDefault();
            
            const name = document.getElementById("nameInput").value;
            const email = document.getElementById("emailInput").value;
            const password = document.getElementById("passwordInput").value;
            const phone = document.getElementById("phoneInput").value;
            
            if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return false;
            }
            
            // Check if the user already exists
            if (localStorage.getItem(email)) {
            alert("User already exists. Please use a different email or sign in to your acount!");
            return;
            }
            
            // Create a user object
            const user = { name, email, password, phone };
            
            localStorage.setItem(email, JSON.stringify(user));
            
            alert("Signup successful! You can now log in.");
            window.location.href = "./signin.html"; 
        });
        });
        
        afterEach(() => {
        jest.restoreAllMocks();
        
        window.location = originalLocation;
        });
        
        // Test case: Check if an error message is shown when required fields are missing

        test('should show error when fields are empty', () => {
        document.getElementById('signupBtn').click();
        expect(alertMock).toHaveBeenCalledWith('Please fill in all fields.');
        expect(localStorageMock.setItem).not.toHaveBeenCalled();
        expect(window.location.href).not.toBe('./signin.html');
        });

        // Test case: Simulate a successful registration of a new user
        
        test('should successfully register a new user', () => {
        // Set form values
        document.getElementById('nameInput').value = 'John Doe';
        document.getElementById('emailInput').value = 'john@example.com';
        document.getElementById('passwordInput').value = 'password123';
        document.getElementById('phoneInput').value = '555-123-4567';
        
        document.getElementById('signupBtn').click();
        
        const expectedUser = { 
            name: 'John Doe', 
            email: 'john@example.com', 
            password: 'password123', 
            phone: '555-123-4567' 
        };
        
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'john@example.com', 
            JSON.stringify(expectedUser)
        );
        expect(alertMock).toHaveBeenCalledWith('Signup successful! You can now log in.');
        expect(window.location.href).toBe('./signin.html');
        });
        

    // Test case: Check if an error message is shown when the user already exists

        test('should show error when user already exists', () => {
        // Pre-populate localStorage mock with existing user
        const existingUser = { 
            name: 'Jane Doe', 
            email: 'jane@example.com', 
            password: 'password456', 
            phone: '555-987-6543' 
        };
        
        // Mock the getItem to return a user for this specific email
        localStorageMock.getItem.mockImplementation((key) => {
            if (key === 'jane@example.com') {
            return JSON.stringify(existingUser);
            }
            return null;
        });
        
        // Set form values with existing email
        document.getElementById('nameInput').value = 'Jane Smith';
        document.getElementById('emailInput').value = 'jane@example.com';
        document.getElementById('passwordInput').value = 'newpassword';
        document.getElementById('phoneInput').value = '555-111-2222';
        
        alertMock.mockClear();
        document.getElementById('signupBtn').click();
        
        // Verify correct error message was shown
        expect(alertMock).toHaveBeenCalledWith(
            'User already exists. Please use a different email or sign in to your acount!'
        );
        expect(window.location.href).not.toBe('./signin.html');
        });

    // Test case: Check if the error is shown when a required field (password) is missing
        
        test('should show error when required fields are missing', () => {
        document.getElementById('nameInput').value = 'Alice';
        document.getElementById('emailInput').value = 'alice@example.com';
        document.getElementById('passwordInput').value = ''; // Missing required field
        document.getElementById('phoneInput').value = '555-444-3333';
        
        alertMock.mockClear();
        localStorageMock.setItem.mockClear();
        document.getElementById('signupBtn').click();
        expect(alertMock).toHaveBeenCalledWith('Please fill in all fields.');
        expect(localStorageMock.setItem).not.toHaveBeenCalledWith('alice@example.com', expect.any(String));
        expect(window.location.href).not.toBe('./signin.html');
        });
    });