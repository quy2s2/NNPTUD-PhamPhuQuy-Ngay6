const axios = require('axios');

async function test() {
    try {
        console.log('--- REGISTER ---');
        try {
            const reg = await axios.post('http://localhost:3000/api/v1/auth/register', {
                username: 'testu123',
                password: 'Password123!',
                email: 'test123@example.com'
            });
            console.log('Register successful:', reg.data.username);
        } catch (e) {
            console.log('Register error (maybe user exists):', e.response ? e.response.data : e.message);
        }

        console.log('\n--- LOGIN (JWT RS256) ---');
        const login = await axios.post('http://localhost:3000/api/v1/auth/login', {
            username: 'testu123',
            password: 'Password123!'
        });
        const token = login.data;
        console.log('Login successful. Token:', token.substring(0, 50) + '...');

        console.log('\n--- GET /ME ---');
        const me = await axios.get('http://localhost:3000/api/v1/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Get /me successful:', me.data.username);

        console.log('\n--- CHANGE PASSWORD ---');
        const change = await axios.post('http://localhost:3000/api/v1/users/changepassword', {
            oldpassword: 'Password123!',
            newpassword: 'NewPassword123@'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Change Password successful:', change.data.message);

    } catch (error) {
        console.error('Test error:', error.response ? error.response.data : error.message);
    }
}

test();
