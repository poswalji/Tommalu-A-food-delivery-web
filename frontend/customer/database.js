const db = {
            users: [
                { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password456' }
            ],
            restaurants: [
                {
                    id: 1,
                    name: 'Burger King',
                    cuisine: 'Fast Food • Burgers',
                    rating: 4.5,
                    deliveryTime: '20-30 min',
                    deliveryFee: 2.99,
                    image: 'burger',
                    type: 'restaurant',
                    menu: [
                        { id: 101, name: 'Whopper', description: 'Flame-grilled beef patty with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced onions on a toasted sesame seed bun.', price: 5.99, image: 'whopper' },
                        { id: 102, name: 'Chicken Royale', description: 'Crispy chicken fillet topped with lettuce and creamy mayonnaise on a toasted sesame seed bun.', price: 4.99, image: 'chicken' },
                        { id: 103, name: 'Fries', description: 'Golden and crispy French fries, perfectly salted.', price: 2.49, image: 'fries' },
                        { id: 104, name: 'Onion Rings', description: 'Crispy battered onion rings with dipping sauce.', price: 2.99, image: 'onion' },
                        { id: 105, name: 'Coca-Cola', description: 'Refreshing Coca-Cola served with ice.', price: 1.99, image: 'coke' },
                        { id: 106, name: 'Chocolate Shake', description: 'Creamy chocolate milkshake topped with whipped cream.', price: 3.49, image: 'shake' }
                    ]
                },
                {
                    id: 2,
                    name: 'Pizza Hut',
                    cuisine: 'Italian • Pizza',
                    rating: 4.3,
                    deliveryTime: '25-40 min',
                    deliveryFee: 3.99,
                    image: 'pizza',
                    type: 'restaurant',
                    menu: [
                        { id: 201, name: 'Pepperoni Pizza', description: 'Classic pizza with tomato sauce, mozzarella cheese, and pepperoni slices.', price: 12.99, image: 'pepperoni' },
                        { id: 202, name: 'Veggie Supreme', description: 'Pizza topped with bell peppers, onions, mushrooms, olives, and tomatoes.', price: 13.99, image: 'veggie' },
                        { id: 203, name: 'Meat Lovers', description: 'Pizza loaded with pepperoni, sausage, bacon, and ham.', price: 14.99, image: 'meat' },
                        { id: 204, name: 'Garlic Bread', description: 'Warm bread topped with garlic butter and herbs.', price: 4.99, image: 'garlic' },
                        { id: 205, name: 'Chicken Wings', description: 'Spicy buffalo wings served with blue cheese dip.', price: 8.99, image: 'wings' },
                        { id: 206, name: 'Chocolate Chip Cookie', description: 'Warm chocolate chip cookie dessert.', price: 5.99, image: 'cookie' }
                    ]
                },
                {
                    id: 3,
                    name: 'Sushi Palace',
                    cuisine: 'Japanese • Sushi',
                    rating: 4.8,
                    deliveryTime: '30-45 min',
                    deliveryFee: 4.99,
                    image: 'sushi',
                    type: 'restaurant',
                    menu: [
                        { id: 301, name: 'California Roll', description: 'Crab, avocado, and cucumber wrapped in seaweed and rice.', price: 7.99, image: 'california' },
                        { id: 302, name: 'Spicy Tuna Roll', description: 'Fresh tuna mixed with spicy sauce, wrapped in seaweed and rice.', price: 8.99, image: 'tuna' },
                        { id: 303, name: 'Dragon Roll', description: 'Eel and cucumber roll topped with avocado and eel sauce.', price: 12.99, image: 'dragon' },
                        { id: 304, name: 'Miso Soup', description: 'Traditional Japanese soup with tofu, seaweed, and green onions.', price: 3.99, image: 'miso' },
                        { id: 305, name: 'Edamame', description: 'Steamed soybeans sprinkled with sea salt.', price: 4.99, image: 'edamame' },
                        { id: 306, name: 'Green Tea Ice Cream', description: 'Creamy green tea flavored ice cream.', price: 4.99, image: 'greentea' }
                    ]
                }
            ],
            groceryStores: [
                {
                    id: 101,
                    name: 'Fresh Market',
                    type: 'Supermarket • Grocery',
                    rating: 4.7,
                    deliveryTime: '30-45 min',
                    deliveryFee: 3.99,
                    image: 'supermarket',
                    type: 'grocery',
                    categories: [
                        { id: 'fruits', name: 'Fruits & Vegetables' },
                        { id: 'dairy', name: 'Dairy & Eggs' },
                        { id: 'bakery', name: 'Bakery' },
                        { id: 'meat', name: 'Meat & Seafood' },
                        { id: 'pantry', name: 'Pantry Essentials' }
                    ],
                    items: [
                        { id: 1001, categoryId: 'fruits', name: 'Organic Bananas', description: 'Bunch of fresh organic bananas.', price: 1.99, unit: 'bunch', image: 'bananas' },
                        { id: 1002, categoryId: 'fruits', name: 'Red Apples', description: 'Fresh red apples, perfect for snacking.', price: 2.49, unit: 'lb', image: 'apples' },
                        { id: 1003, categoryId: 'fruits', name: 'Avocados', description: 'Ripe Hass avocados.', price: 1.99, unit: 'each', image: 'avocados' },
                        { id: 1004, categoryId: 'fruits', name: 'Baby Spinach', description: 'Fresh baby spinach leaves.', price: 3.99, unit: 'bag', image: 'spinach' },
                        { id: 1005, categoryId: 'fruits', name: 'Cherry Tomatoes', description: 'Sweet cherry tomatoes.', price: 2.99, unit: 'pint', image: 'tomatoes' },

                        { id: 1006, categoryId: 'dairy', name: 'Whole Milk', description: 'Fresh whole milk.', price: 3.49, unit: 'gallon', image: 'milk' },
                        { id: 1007, categoryId: 'dairy', name: 'Large Eggs', description: 'Farm fresh large eggs.', price: 2.99, unit: 'dozen', image: 'eggs' },
                        { id: 1008, categoryId: 'dairy', name: 'Cheddar Cheese', description: 'Sharp cheddar cheese block.', price: 4.99, unit: '8 oz', image: 'cheese' },
                        { id: 1009, categoryId: 'dairy', name: 'Greek Yogurt', description: 'Plain Greek yogurt.', price: 1.99, unit: '6 oz', image: 'yogurt' },
                        { id: 1010, categoryId: 'dairy', name: 'Butter', description: 'Unsalted butter sticks.', price: 3.99, unit: '16 oz', image: 'butter' },

                        { id: 1011, categoryId: 'bakery', name: 'Whole Wheat Bread', description: 'Freshly baked whole wheat bread.', price: 3.49, unit: 'loaf', image: 'bread' },
                        { id: 1012, categoryId: 'bakery', name: 'Bagels', description: 'Plain bagels, pack of 6.', price: 4.99, unit: 'pack', image: 'bagels' },
                        { id: 1013, categoryId: 'bakery', name: 'Croissants', description: 'Butter croissants, pack of 4.', price: 5.99, unit: 'pack', image: 'croissants' },

                        { id: 1014, categoryId: 'meat', name: 'Chicken Breast', description: 'Boneless, skinless chicken breasts.', price: 5.99, unit: 'lb', image: 'chicken_breast' },
                        { id: 1015, categoryId: 'meat', name: 'Ground Beef', description: 'Lean ground beef, 90% lean.', price: 6.99, unit: 'lb', image: 'ground_beef' },
                        { id: 1016, categoryId: 'meat', name: 'Salmon Fillet', description: 'Fresh Atlantic salmon fillet.', price: 12.99, unit: 'lb', image: 'salmon' },

                        { id: 1017, categoryId: 'pantry', name: 'Pasta', description: 'Spaghetti pasta.', price: 1.99, unit: '16 oz', image: 'pasta' },
                        { id: 1018, categoryId: 'pantry', name: 'Rice', description: 'Long grain white rice.', price: 2.99, unit: '32 oz', image: 'rice' },
                        { id: 1019, categoryId: 'pantry', name: 'Olive Oil', description: 'Extra virgin olive oil.', price: 8.99, unit: '16.9 oz', image: 'olive_oil' },
                        { id: 1020, categoryId: 'pantry', name: 'Cereal', description: 'Whole grain breakfast cereal.', price: 3.99, unit: '18 oz', image: 'cereal' }
                    ]
                },
                {
                    id: 102,
                    name: 'Organic Greens',
                    type: 'Organic • Specialty',
                    rating: 4.9,
                    deliveryTime: '35-50 min',
                    deliveryFee: 4.99,
                    image: 'organic',
                    type: 'grocery',
                    categories: [
                        { id: 'organic_produce', name: 'Organic Produce' },
                        { id: 'organic_dairy', name: 'Organic Dairy' },
                        { id: 'health_foods', name: 'Health Foods' },
                        { id: 'supplements', name: 'Supplements' }
                    ],
                    items: [
                        { id: 2001, categoryId: 'organic_produce', name: 'Organic Kale', description: 'Fresh organic kale bunch.', price: 2.99, unit: 'bunch', image: 'kale' },
                        { id: 2002, categoryId: 'organic_produce', name: 'Organic Blueberries', description: 'Sweet organic blueberries.', price: 4.99, unit: 'pint', image: 'blueberries' },
                        { id: 2003, categoryId: 'organic_produce', name: 'Organic Sweet Potatoes', description: 'Nutritious organic sweet potatoes.', price: 2.49, unit: 'lb', image: 'sweet_potatoes' },

                        { id: 2004, categoryId: 'organic_dairy', name: 'Organic Almond Milk', description: 'Unsweetened organic almond milk.', price: 3.99, unit: '32 oz', image: 'almond_milk' },
                        { id: 2005, categoryId: 'organic_dairy', name: 'Organic Eggs', description: 'Free-range organic eggs.', price: 5.99, unit: 'dozen', image: 'organic_eggs' },

                        { id: 2006, categoryId: 'health_foods', name: 'Quinoa', description: 'Organic white quinoa.', price: 6.99, unit: '16 oz', image: 'quinoa' },
                        { id: 2007, categoryId: 'health_foods', name: 'Chia Seeds', description: 'Organic chia seeds.', price: 7.99, unit: '12 oz', image: 'chia_seeds' },
                        { id: 2008, categoryId: 'health_foods', name: 'Coconut Oil', description: 'Organic virgin coconut oil.', price: 9.99, unit: '16 oz', image: 'coconut_oil' },

                        { id: 2009, categoryId: 'supplements', name: 'Multivitamin', description: 'Daily multivitamin tablets.', price: 12.99, unit: '60 count', image: 'multivitamin' },
                        { id: 2010, categoryId: 'supplements', name: 'Protein Powder', description: 'Plant-based protein powder.', price: 24.99, unit: '1 lb', image: 'protein_powder' }
                    ]
                },
                {
                    id: 103,
                    name: 'Quick Mart',
                    type: 'Convenience • Essentials',
                    rating: 4.2,
                    deliveryTime: '15-25 min',
                    deliveryFee: 2.49,
                    image: 'convenience',
                    type: 'grocery',
                    categories: [
                        { id: 'snacks', name: 'Snacks & Candy' },
                        { id: 'beverages', name: 'Beverages' },
                        { id: 'household', name: 'Household' },
                        { id: 'personal_care', name: 'Personal Care' }
                    ],
                    items: [
                        { id: 3001, categoryId: 'snacks', name: 'Potato Chips', description: 'Classic potato chips.', price: 2.99, unit: '8 oz', image: 'chips' },
                        { id: 3002, categoryId: 'snacks', name: 'Chocolate Bar', description: 'Milk chocolate bar.', price: 1.49, unit: 'each', image: 'chocolate' },
                        { id: 3003, categoryId: 'snacks', name: 'Mixed Nuts', description: 'Salted mixed nuts.', price: 4.99, unit: '6 oz', image: 'nuts' },

                        { id: 3004, categoryId: 'beverages', name: 'Bottled Water', description: 'Purified bottled water.', price: 1.49, unit: '20 oz', image: 'water' },
                        { id: 3005, categoryId: 'beverages', name: 'Soda', description: 'Cola soda.', price: 1.99, unit: '2 liter', image: 'soda' },
                        { id: 3006, categoryId: 'beverages', name: 'Energy Drink', description: 'Energy drink can.', price: 2.99, unit: '16 oz', image: 'energy_drink' },

                        { id: 3007, categoryId: 'household', name: 'Paper Towels', description: 'Paper towel roll.', price: 2.99, unit: 'roll', image: 'paper_towels' },
                        { id: 3008, categoryId: 'household', name: 'Dish Soap', description: 'Liquid dish soap.', price: 3.49, unit: '16 oz', image: 'dish_soap' },

                        { id: 3009, categoryId: 'personal_care', name: 'Toothpaste', description: 'Mint toothpaste.', price: 3.99, unit: 'tube', image: 'toothpaste' },
                        { id: 3010, categoryId: 'personal_care', name: 'Hand Sanitizer', description: 'Antibacterial hand sanitizer.', price: 2.99, unit: '8 oz', image: 'hand_sanitizer' }
                    ]
                }
            ]
        };

        // State management
        let currentUser = null;
        let cartItems = [];
        let currentPage = 'home';
        let selectedRestaurant = null;
        let selectedGroceryStore = null;
        let currentSection = 'food'; // Default section is food
