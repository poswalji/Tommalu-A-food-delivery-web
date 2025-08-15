# Tommalu Backend

Node.js + Express + MongoDB (Atlas) backend for **Tommalu** with:
- Auth (JWT) + Roles: admin / owner / user
- Admin approval for owners + restaurants
- Restaurants, Menu Items, Orders
- Payments: Stripe (card) + Razorpay (UPI)
- Local uploads for images (`/uploads`)
- Socket.io realtime for new orders + status updates

## Quick Start

```bash
# 1) Install
npm i

# 2) Copy env
cp .env.example .env

# 3) Fill .env with your Atlas URI, JWT secret and payment keys

# 4) Run (dev)
npm run dev

# (or) production
npm start
```

Seed admin will be created based on `.env`:
- Email: `ADMIN_EMAIL` (default: `tommalu@gmail.com`)
- Password: `ADMIN_PASSWORD` (default: `admin@9358`)

## Endpoints

### Auth
- `POST /api/auth/register` body: `{ name, email, password, role, restaurant? }`
  - For owner, include `role: "owner"` and `restaurant: { name, address, cuisine, deliveryTime, deliveryFee }`
  - Owner will be `pending` until admin approves
- `POST /api/auth/login` → `{ token, user }`

### Admin (requires admin token)
- `GET /api/admin/restaurants`
- `PATCH /api/admin/restaurants/:id/approve`
- `PATCH /api/admin/restaurants/:id/disable`
- `GET /api/admin/orders`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id/ban`

### Owner (requires owner/admin token)
- `GET /api/owner/menu`
- `POST /api/owner/menu` (multipart form: fields `name`, `price`, `description`, file `image`)
- `PATCH /api/owner/menu/:id` (multipart)
- `DELETE /api/owner/menu/:id`
- `GET /api/owner/orders`
- `PATCH /api/owner/orders/:id/status` body: `{ status }`

### User
- `GET /api/user/restaurants` (public)
- `GET /api/user/restaurants/:id/menu` (public)
- `POST /api/user/orders` (requires user token) body: `{ restaurantId, items:[{itemId,quantity}], totalAmount, paymentMethod }`

### Payments
- `POST /api/payment/stripe/checkout` body: `{ orderId }` → returns `{ url }`
- `POST /api/payment/stripe/webhook` (Stripe calls this; set endpoint URL in dashboard)
- `POST /api/payment/razorpay/order` body: `{ orderId }` → returns `{ orderId, amount, currency }`
- `POST /api/payment/razorpay/verify` body: `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }`

## Socket.io (Frontend Example)

```html
<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
<script>
  const socket = io("http://localhost:8080", { transports: ["websocket"] });
  // Owner after login: join restaurant room using restaurantId
  socket.emit("join", { type: "restaurant", id: "<restaurantId>" });
  socket.on("new_order", (data) => {
    console.log("New order:", data);
    // refresh orders list
  });

  // User after login: join their user room
  socket.emit("join", { type: "user", id: "<userId>" });
  socket.on("order_status", (data) => {
    console.log("Order status changed:", data);
    // update UI
  });
</script>
```

## Sample Fetch Calls

### Login (all panels)
```js
const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
});
const data = await res.json();
localStorage.setItem("token", data.token);
```

### List restaurants (user.html)
```js
const res = await fetch("/api/user/restaurants");
const list = await res.json();
```

### Owner add menu item (restaurant.html)
```js
const token = localStorage.getItem("token");
const fd = new FormData();
fd.append("name", "Veg Burger");
fd.append("price", 120);
fd.append("description", "Tasty");
fd.append("image", fileInput.files[0]);
const res = await fetch("/api/owner/menu", {
  method: "POST",
  headers: { "Authorization": "Bearer " + token },
  body: fd
});
```

### Place order (user.html)
```js
const token = localStorage.getItem("token");
const res = await fetch("/api/user/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
  body: JSON.stringify({
    restaurantId: "<id>",
    items: [{ itemId: "<menuItemId>", quantity: 2 }],
    totalAmount: 240,
    paymentMethod: "cod" // or "stripe" / "upi" (then call payment endpoints)
  })
});
const order = await res.json();
```

## Notes
- For Stripe, set webhook secret and endpoint to `/api/payment/stripe/webhook`.
- For Razorpay, use the returned `orderId` on the frontend and verify payment with `/api/payment/razorpay/verify` after success.
- Images are served from `/uploads/<filename>`.

## License
MIT
