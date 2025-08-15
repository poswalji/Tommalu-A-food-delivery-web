function openLoginModal() {
            document.getElementById('login-modal').classList.remove('hidden');
        }

        function closeLoginModal() {
            document.getElementById('login-modal').classList.add('hidden');
        }

        function openRegisterModal() {
            document.getElementById('register-modal').classList.remove('hidden');
        }

        function closeRegisterModal() {
            document.getElementById('register-modal').classList.add('hidden');
        }

        async function handleLogin(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            showLoading();

            try {
                const user = await api.login(email, password);
                currentUser = user;
                updateUserUI();
                closeLoginModal();
                showToast(`Welcome back, ${user.name}!`, 'success');
            } catch (error) {
                showToast(error.message, 'error');
            } finally {
                hideLoading();
            }
        }

        async function handleRegister(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }

            showLoading();

            try {
                const user = await api.register(name, email, password);
                currentUser = user;
                updateUserUI();
                closeRegisterModal();
                showToast('Account created successfully!', 'success');
            } catch (error) {
                showToast(error.message, 'error');
            } finally {
                hideLoading();
            }
        }

        function handleLogout() {
            currentUser = null;
            updateUserUI();
            showToast('You have been logged out', 'info');
        }

        function updateUserUI() {
            const userButton = document.getElementById('user-button');

            if (currentUser) {
                userButton.innerHTML = `
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center text-red-600 font-medium">
                            ${currentUser.name.charAt(0)}
                        </div>
                        <span>${currentUser.name}</span>
                    </div>
                `;
                userButton.onclick = () => {
                    const confirmed = confirm('Do you want to log out?');
                    if (confirmed) handleLogout();
                };
            } else {
                userButton.innerHTML = `Sign In`;
                userButton.onclick = openLoginModal;
            }
        }
