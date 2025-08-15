 document.addEventListener('DOMContentLoaded', () => {
            // Load initial data
            loadHomePage();

            // Navigation
            document.getElementById('logo').addEventListener('click', loadHomePage);
            document.getElementById('home-link').addEventListener('click', loadHomePage);
            document.getElementById('food-tab').addEventListener('click', () => switchSection('food'));
            document.getElementById('grocery-tab').addEventListener('click', () => switchSection('grocery'));
            document.getElementById('explore-food-button').addEventListener('click', () => {
                switchSection('food');
                document.getElementById('food-section').scrollIntoView({ behavior: 'smooth' });
            });
            document.getElementById('explore-grocery-button').addEventListener('click', () => {
                switchSection('grocery');
                document.getElementById('grocery-section').scrollIntoView({ behavior: 'smooth' });
            });
            document.getElementById('back-to-home').addEventListener('click', loadHomePage);
            document.getElementById('back-to-home-grocery').addEventListener('click', loadHomePage);

            // Cart
            document.getElementById('cart-button').addEventListener('click', openCart);
            document.getElementById('close-cart').addEventListener('click', closeCart);
            document.getElementById('cart-overlay').addEventListener('click', closeCart);
            document.getElementById('checkout-button').addEventListener('click', checkout);

            // Authentication
            document.getElementById('user-button').addEventListener('click', openLoginModal);
            document.getElementById('user-button-mobile').addEventListener('click', openLoginModal);
            document.getElementById('close-login').addEventListener('click', closeLoginModal);
            document.getElementById('login-overlay').addEventListener('click', closeLoginModal);
            document.getElementById('show-register').addEventListener('click', () => {
                closeLoginModal();
                openRegisterModal();
            });
            document.getElementById('close-register').addEventListener('click', closeRegisterModal);
            document.getElementById('register-overlay').addEventListener('click', closeRegisterModal);
            document.getElementById('show-login').addEventListener('click', () => {
                closeRegisterModal();
                openLoginModal();
            });

            document.getElementById('login-form').addEventListener('submit', handleLogin);
            document.getElementById('register-form').addEventListener('submit', handleRegister);
        });