  const api = {
            login: (email, password) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const user = db.users.find(u => u.email === email && u.password === password);
                        if (user) {
                            const { password, ...userWithoutPassword } = user;
                            resolve(userWithoutPassword);
                        } else {
                            reject(new Error('Invalid email or password'));
                        }
                    }, 1000);
                });
            },

            register: (name, email, password) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (db.users.some(u => u.email === email)) {
                            reject(new Error('Email already in use'));
                            return;
                        }

                        const newUser = {
                            id: db.users.length + 1,
                            name,
                            email,
                            password
                        };

                        db.users.push(newUser);
                        const { password: _, ...userWithoutPassword } = newUser;
                        resolve(userWithoutPassword);
                    }, 1500);
                });
            },

            getRestaurants: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(db.restaurants);
                    }, 800);
                });
            },

            getGroceryStores: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(db.groceryStores);
                    }, 800);
                });
            },

            getRestaurantById: (id) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const restaurant = db.restaurants.find(r => r.id === parseInt(id));
                        if (restaurant) {
                            resolve(restaurant);
                        } else {
                            reject(new Error('Restaurant not found'));
                        }
                    }, 800);
                });
            },

            getGroceryStoreById: (id) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const store = db.groceryStores.find(s => s.id === parseInt(id));
                        if (store) {
                            resolve(store);
                        } else {
                            reject(new Error('Grocery store not found'));
                        }
                    }, 800);
                });
            },

            placeOrder: (items, address, paymentMethod) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const orderId = Math.floor(100000 + Math.random() * 900000);
                        resolve({
                            orderId,
                            status: 'confirmed',
                            estimatedDelivery: '30-45 minutes'
                        });
                    }, 2000);
                });
            }
        };