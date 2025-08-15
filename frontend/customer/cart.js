function openCart() {
            const cartModal = document.getElementById('cart-modal');
            const cartContainer = document.getElementById('cart-container');

            cartModal.classList.remove('hidden');
            setTimeout(() => {
                cartContainer.classList.remove('translate-x-full');
            }, 10);
        }

        function closeCart() {
            const cartContainer = document.getElementById('cart-container');
            const cartModal = document.getElementById('cart-modal');

            cartContainer.classList.add('translate-x-full');
            setTimeout(() => {
                cartModal.classList.add('hidden');
            }, 300);
        }

        function addToCart(item, type, storeId, storeName) {
            const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({
                    ...item,
                    quantity: 1,
                    type: type,
                    storeId: storeId,
                    storeName: storeName
                });
            }

            updateCart();
            showToast(`Added ${item.name} to cart`, 'success');
        }

        function updateCart() {
            const cartItemsContainer = document.getElementById('cart-items');
            const emptyCartMessage = document.getElementById('empty-cart-message');
            const cartCount = document.getElementById('cart-count');
            const cartSubtotal = document.getElementById('cart-subtotal');
            const cartTotal = document.getElementById('cart-total');

            // Update cart count
            cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);

            // Clear cart items container
            while (cartItemsContainer.firstChild && cartItemsContainer.firstChild !== emptyCartMessage) {
                cartItemsContainer.removeChild(cartItemsContainer.firstChild);
            }

            // Show/hide empty cart message
            if (cartItems.length === 0) {
                emptyCartMessage.classList.remove('hidden');
            } else {
                emptyCartMessage.classList.add('hidden');

                // Group items by store
                const storeGroups = {};
                cartItems.forEach(item => {
                    const key = `${item.type}-${item.storeId}`;
                    if (!storeGroups[key]) {
                        storeGroups[key] = {
                            name: item.storeName,
                            type: item.type,
                            items: []
                        };
                    }
                    storeGroups[key].items.push(item);
                });

                // Add items to cart grouped by store
                Object.values(storeGroups).forEach(group => {
                    const storeHeader = document.createElement('div');
                    storeHeader.className = 'font-medium text-gray-800 mt-4 mb-2 flex items-center';

                    // Add icon based on type
                    if (group.type === 'restaurant') {
                        storeHeader.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            ${group.name}
                        `;
                    } else {
                        storeHeader.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            ${group.name}
                        `;
                    }

                    cartItemsContainer.insertBefore(storeHeader, emptyCartMessage);

                    group.items.forEach((item, index) => {
                        const cartItem = document.createElement('div');
                        cartItem.className = 'fade-in flex justify-between items-center py-3 border-b';
                        cartItem.innerHTML = `
                            <div>
                                <h4 class="font-medium">${item.name}</h4>
                                <div class="flex items-center mt-1">
                                    <button class="decrease-quantity px-2 py-1 border rounded-l-md" data-id="${item.id}">-</button>
                                    <span class="px-3 py-1 border-t border-b">${item.quantity}</span>
                                    <button class="increase-quantity px-2 py-1 border rounded-r-md" data-id="${item.id}">+</button>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="font-medium">$${(item.price * item.quantity).toFixed(2)}</p>
                                <button class="remove-item text-sm text-red-500" data-id="${item.id}">Remove</button>
                            </div>
                        `;
                        cartItemsContainer.insertBefore(cartItem, emptyCartMessage);
                    });
                });

                // Add event listeners to quantity buttons
                document.querySelectorAll('.decrease-quantity').forEach(button => {
                    button.addEventListener('click', () => {
                        const id = parseInt(button.getAttribute('data-id'));
                        const itemIndex = cartItems.findIndex(item => item.id === id);
                        if (itemIndex !== -1) {
                            if (cartItems[itemIndex].quantity > 1) {
                                cartItems[itemIndex].quantity -= 1;
                            } else {
                                cartItems.splice(itemIndex, 1);
                            }
                            updateCart();
                        }
                    });
                });

                document.querySelectorAll('.increase-quantity').forEach(button => {
                    button.addEventListener('click', () => {
                        const id = parseInt(button.getAttribute('data-id'));
                        const item = cartItems.find(item => item.id === id);
                        if (item) {
                            item.quantity += 1;
                            updateCart();
                        }
                    });
                });

                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', () => {
                        const id = parseInt(button.getAttribute('data-id'));
                        const itemIndex = cartItems.findIndex(item => item.id === id);
                        if (itemIndex !== -1) {
                            cartItems.splice(itemIndex, 1);
                            updateCart();
                        }
                    });
                });
            }

            // Update subtotal and total
            const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            const deliveryFee = cartItems.length > 0 ? 2.99 : 0;
            const total = subtotal + deliveryFee;

            cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }

        async function checkout() {
            if (cartItems.length === 0) {
                showToast('Your cart is empty', 'error');
                return;
            }

            if (!currentUser) {
                showToast('Please sign in to checkout', 'error');
                closeCart();
                openLoginModal();
                return;
            }

            showLoading();
            closeCart();

            try {
                const order = await api.placeOrder(cartItems, '123 Main St', 'Credit Card');
                cartItems = [];
                updateCart();
                showToast(`Order #${order.orderId} placed successfully!`, 'success');
            } catch (error) {
                showToast('Failed to place order', 'error');
            } finally {
                hideLoading();
            }
        }