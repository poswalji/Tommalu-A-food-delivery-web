 function showLoading() {
            document.getElementById('loading-spinner').classList.remove('hidden');
        }

        function hideLoading() {
            document.getElementById('loading-spinner').classList.add('hidden');
        }

        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');

            toastMessage.textContent = message;
            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            if (type === 'success') {
                toast.classList.add('bg-green-600');
                toast.classList.remove('bg-red-600', 'bg-gray-800');
            } else if (type === 'error') {
                toast.classList.add('bg-red-600');
                toast.classList.remove('bg-green-600', 'bg-gray-800');
            } else {
                toast.classList.add('bg-gray-800');
                toast.classList.remove('bg-green-600', 'bg-red-600');
            }

            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
                toast.classList.remove('translate-y-0', 'opacity-100');
            }, 3000);
        }

        // Navigation functions
        function showPage(pageId) {
            document.getElementById('home-page').classList.add('hidden');
            document.getElementById('restaurant-detail-page').classList.add('hidden');
            document.getElementById('grocery-detail-page').classList.add('hidden');

            document.getElementById(pageId).classList.remove('hidden');
            currentPage = pageId.replace('-page', '');
        }

        function switchSection(section) {
            if (section === 'food') {
                document.getElementById('food-section').classList.remove('hidden');
                document.getElementById('grocery-section').classList.add('hidden');
                document.getElementById('food-tab').classList.add('active');
                document.getElementById('grocery-tab').classList.remove('active');
                currentSection = 'food';
            } else {
                document.getElementById('food-section').classList.add('hidden');
                document.getElementById('grocery-section').classList.remove('hidden');
                document.getElementById('food-tab').classList.remove('active');
                document.getElementById('grocery-tab').classList.add('active');
                currentSection = 'grocery';
            }
        }

        async function loadHomePage() {
            showPage('home-page');
            showLoading();

            try {
                // Load restaurants
             const response = await fetch('http://localhost:8080/api/restaurants');
  if (!response.ok) throw new Error('Failed to fetch restaurants');

  const restaurants = await response.json();
                const restaurantsContainer = document.getElementById('restaurants-container');
                restaurantsContainer.innerHTML = '';

                restaurants.forEach(restaurant => {
                    console.log(restaurant.image);
                    const restaurantCard = document.createElement('div');
                    restaurantCard.className = 'restaurant-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300';
                    restaurantCard.innerHTML = `
                        <div class="relative h-48 bg-gray-200">
                            <img src="${restaurant.image}" alt="${restaurant.name}" class="w-full h-full object-cover" />


                            <div class="absolute top-4 left-4 bg-white rounded-full px-3 py-1 text-sm font-medium text-red-500">
                                ${restaurant.rating} ★
                            </div>
                            <div class="absolute top-4 right-4 bg-red-500 rounded-full px-3 py-1 text-sm font-medium text-white">
                                ${restaurant.deliveryTime}
                            </div>
                        </div>
                        <div class="p-4">
                            <h3 class="text-lg font-semibold mb-1">${restaurant.name}</h3>
                            <p class="text-sm text-gray-500 mb-3">${restaurant.cuisine}</p>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">$${restaurant.deliveryFee.toFixed(2)} delivery fee</span>
                                <button class="view-restaurant bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300" data-key="menu" data-id="${restaurant.id}">View Menu</button>
                            </div>
                        </div>
                    `;
                    restaurantsContainer.appendChild(restaurantCard);
                });

                // Load grocery stores
                const groceryStores = await api.getGroceryStores();
                const groceryStoresContainer = document.getElementById('grocery-stores-container');
                groceryStoresContainer.innerHTML = '';

                groceryStores.forEach(store => {
                    const storeCard = document.createElement('div');
                    storeCard.className = 'grocery-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300';
                    storeCard.innerHTML = `
                        <div class="relative h-48 bg-gray-200">
                            <svg class="w-full h-full text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                                <path d="M128 0C110.3 0 96 14.3 96 32V64H48C21.5 64 0 85.5 0 112v80c0 26.5 21.5 48 48 48H64v208c0 35.3 28.7 64 64 64s64-28.7 64-64V240h384v208c0 35.3 28.7 64 64 64s64-28.7 64-64V240h16c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H544V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32zM48 160c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H592c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H48z"/>
                            </svg>
                            <div class="absolute top-4 left-4 bg-white rounded-full px-3 py-1 text-sm font-medium text-green-500">
                                ${store.rating} ★
                            </div>
                            <div class="absolute top-4 right-4 bg-green-500 rounded-full px-3 py-1 text-sm font-medium text-white">
                                ${store.deliveryTime}
                            </div>
                        </div>
                        <div class="p-4">
                            <h3 class="text-lg font-semibold mb-1">${store.name}</h3>
                            <p class="text-sm text-gray-500 mb-3">${store.type}</p>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">$${store.deliveryFee.toFixed(2)} delivery fee</span>
                                <button class="view-grocery bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300" data-id="${store.id}">Shop Now</button>
                            </div>
                        </div>
                    `;
                    groceryStoresContainer.appendChild(storeCard);
                });

                // Add event listeners to view buttons
                document.querySelectorAll('.view-restaurant').forEach(button => {
                    button.addEventListener('click', async () => {
                        const restaurantId = button.getAttribute('data-id');
                        await loadRestaurantDetail(restaurantId);
                    });
                });

                document.querySelectorAll('.view-grocery').forEach(button => {
                    button.addEventListener('click', async () => {
                        const storeId = button.getAttribute('data-id');
                        await loadGroceryStoreDetail(storeId);
                    });
                });

                // Add event listeners to category tabs
                document.querySelectorAll('.category-tab').forEach(tab => {
                    tab.addEventListener('click', () => {
                        const tabGroup = tab.closest('div').querySelectorAll('.category-tab');
                        tabGroup.forEach(t => {
                            t.classList.remove('active');
                            t.classList.add('bg-gray-100');
                        });
                        tab.classList.add('active');
                        tab.classList.remove('bg-gray-100');
                    });
                });

                // Show the current section
                switchSection(currentSection);

            } catch (error) {
                console.error('Error loading home page:', error);
                showToast('Failed to load content', 'error');
            } finally {
                hideLoading();
            }
        }

        async function loadRestaurantDetail(restaurantId) {
            showPage('restaurant-detail-page');
            showLoading();

            try {
                const restaurant = await api.getRestaurantById(restaurantId);
                selectedRestaurant = restaurant;

                const restaurantDetails = document.getElementById('restaurant-details');
                restaurantDetails.innerHTML = `
                    <div class="bg-gray-100 rounded-xl overflow-hidden mb-8">
                        <div class="relative h-64 bg-gray-200">
                            <svg class="w-full h-full text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                                <path d="M320 64c-59.7 0-115.3 17.2-162.1 47.1C116.1 140.1 80 199.3 80 264c0 38 14.8 72.8 38.9 100.2 12.1 13.8 27.2 25.7 44.1 35.6V464c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32h128v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64.3c16.9-9.9 32-21.8 44.1-35.6 24.1-27.4 38.9-62.2 38.9-100.2 0-64.7-36.1-123.9-93.9-153-46.8-29.9-102.4-47.1-162.1-47.1zM160 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm160-96c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm160 96c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/>
                            </svg>
                        </div>
                        <div class="p-6">
                            <h1 class="text-3xl font-bold mb-2">${restaurant.name}</h1>
                            <div class="flex flex-wrap items-center gap-4 mb-4">
                                <div class="bg-white rounded-full px-3 py-1 text-sm font-medium text-red-500 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    ${restaurant.rating} (200+ ratings)
                                </div>
                                <div class="text-sm text-gray-600">
                                    <span class="font-medium">Delivery:</span> ${restaurant.deliveryTime}
                                </div>
                                <div class="text-sm text-gray-600">
                                    <span class="font-medium">Delivery Fee:</span> $${restaurant.deliveryFee.toFixed(2)}
                                </div>
                            </div>
                            <p class="text-gray-600">${restaurant.cuisine}</p>
                        </div>
                    </div>
                `;

                const menuContainer = document.getElementById('menu-container');
                menuContainer.innerHTML = '';

                restaurant.menu.forEach(item => {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'food-item bg-white rounded-lg p-4 border border-gray-100 flex justify-between items-center transition duration-300';
                    menuItem.innerHTML = `
                        <div>
                            <h3 class="font-medium text-lg">${item.name}</h3>
                            <p class="text-gray-600 text-sm mb-2">${item.description}</p>
                            <span class="font-medium">$${item.price.toFixed(2)}</span>
                        </div>
                        <div class="ml-4">
                            <button class="add-to-cart bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium transition duration-300" data-id="${item.id}" data-type="food">
                                Add to Cart
                            </button>
                        </div>
                    `;
                    menuContainer.appendChild(menuItem);
                });

                // Add event listeners to add to cart buttons
                document.querySelectorAll('.add-to-cart').forEach(button => {
                    button.addEventListener('click', () => {
                        const itemId = parseInt(button.getAttribute('data-id'));
                        const menuItem = restaurant.menu.find(item => item.id === itemId);
                        if (menuItem) {
                            addToCart(menuItem, 'restaurant', restaurant.id, restaurant.name);
                        }
                    });
                });
            } catch (error) {
                console.error('Error loading restaurant details:', error);
                showToast('Failed to load restaurant details', 'error');
            } finally {
                hideLoading();
            }
        }

        async function loadGroceryStoreDetail(storeId) {
            showPage('grocery-detail-page');
            showLoading();

            try {
                const store = await api.getGroceryStoreById(storeId);
                selectedGroceryStore = store;

                const storeDetails = document.getElementById('grocery-store-details');
                storeDetails.innerHTML = `
                    <div class="bg-gray-100 rounded-xl overflow-hidden mb-8">
                        <div class="relative h-64 bg-gray-200">
                            <svg class="w-full h-full text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                                <path d="M128 0C110.3 0 96 14.3 96 32V64H48C21.5 64 0 85.5 0 112v80c0 26.5 21.5 48 48 48H64v208c0 35.3 28.7 64 64 64s64-28.7 64-64V240h384v208c0 35.3 28.7 64 64 64s64-28.7 64-64V240h16c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H544V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32zM48 160c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H592c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H48z"/>
                            </svg>
                        </div>
                        <div class="p-6">
                            <h1 class="text-3xl font-bold mb-2">${store.name}</h1>
                            <div class="flex flex-wrap items-center gap-4 mb-4">
                                <div class="bg-white rounded-full px-3 py-1 text-sm font-medium text-green-500 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    ${store.rating} (150+ ratings)
                                </div>
                                <div class="text-sm text-gray-600">
                                    <span class="font-medium">Delivery:</span> ${store.deliveryTime}
                                </div>
                                <div class="text-sm text-gray-600">
                                    <span class="font-medium">Delivery Fee:</span> $${store.deliveryFee.toFixed(2)}
                                </div>
                            </div>
                            <p class="text-gray-600">${store.type}</p>
                        </div>
                    </div>
                `;

                // Add category tabs
                const categoriesContainer = document.getElementById('grocery-categories');
                categoriesContainer.innerHTML = '';

                store.categories.forEach((category, index) => {
                    const categoryTab = document.createElement('button');
                    categoryTab.className = `category-tab whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition duration-300 ${index === 0 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`;
                    categoryTab.setAttribute('data-category', category.id);
                    categoryTab.textContent = category.name;
                    categoriesContainer.appendChild(categoryTab);
                });

                // Add grocery items by category
                const groceryItemsContainer = document.getElementById('grocery-items-container');
                groceryItemsContainer.innerHTML = '';

                store.categories.forEach(category => {
                    const categoryItems = store.items.filter(item => item.categoryId === category.id);

                    const categorySection = document.createElement('div');
                    categorySection.className = 'mb-8';
                    categorySection.innerHTML = `
                        <h2 class="text-2xl font-bold mb-4" id="category-${category.id}">${category.name}</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${categoryItems.map(item => `
                                <div class="grocery-item bg-white rounded-lg p-4 border border-gray-100 flex justify-between items-center transition duration-300">
                                    <div>
                                        <h3 class="font-medium text-lg">${item.name}</h3>
                                        <p class="text-gray-600 text-sm mb-2">${item.description}</p>
                                        <div class="flex items-center">
                                            <span class="font-medium">$${item.price.toFixed(2)}</span>
                                            <span class="text-sm text-gray-500 ml-2">/ ${item.unit}</span>
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <button class="add-to-cart bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium transition duration-300" data-id="${item.id}" data-type="grocery">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    groceryItemsContainer.appendChild(categorySection);
                });

                // Add event listeners to category tabs
                document.querySelectorAll('#grocery-categories .category-tab').forEach(tab => {
                    tab.addEventListener('click', () => {
                        // Update active tab
                        document.querySelectorAll('#grocery-categories .category-tab').forEach(t => {
                            t.classList.remove('bg-green-500', 'text-white');
                            t.classList.add('bg-gray-100', 'text-gray-700');
                        });
                        tab.classList.add('bg-green-500', 'text-white');
                        tab.classList.remove('bg-gray-100', 'text-gray-700');

                        // Scroll to category section
                        const categoryId = tab.getAttribute('data-category');
                        document.getElementById(`category-${categoryId}`).scrollIntoView({ behavior: 'smooth' });
                    });
                });

                // Add event listeners to add to cart buttons
                document.querySelectorAll('.add-to-cart[data-type="grocery"]').forEach(button => {
                    button.addEventListener('click', () => {
                        const itemId = parseInt(button.getAttribute('data-id'));
                        const groceryItem = store.items.find(item => item.id === itemId);
                        if (groceryItem) {
                            addToCart(groceryItem, 'grocery', store.id, store.name);
                        }
                    });
                });
            } catch (error) {
                console.error('Error loading grocery store details:', error);
                showToast('Failed to load grocery store details', 'error');
            } finally {
                hideLoading();
            }
        }