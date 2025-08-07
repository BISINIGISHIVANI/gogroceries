# 🛒 Go Groceries - MERN E-commerce Platform

A full-stack grocery shopping application with Stripe payments, admin/user authentication, and comprehensive e-commerce features.

## 🚀 Features
- **Dual Authentication** - JWT-based user/admin login systems
- **E-commerce Core** - Cart, wishlist, orders, categories, product management
- **Stripe Integration** - Secure payment processing
- **Responsive Design** - Mobile-first with TailwindCSS
- **Real-time Updates** - Persistent cart/wishlist across sessions

## 🛠️ Tech Stack
**Client:** React.js, TypeScript, TailwindCSS, Axios  
**Server:** Node.js, Express.js, MongoDB, Mongoose  
**Services:** Stripe API, Cloudinary, JWT Authentication

## ⚡ Quick Setup
```bash
# Clone repository
git clone https://github.com/BISINIGISHIVANI/go-groceries.git

# Backend setup
cd server && npm install
# Add .env with MongoDB, Stripe, JWT secrets
npm run dev

# Frontend setup  
cd client && npm install
# Add .env with Stripe publishable key
npm run dev
```

## 🔑 Key APIs
- Authentication: `/api/user/login`, `/api/admin/login`
- Products: `/api/product/list`, `/api/product/add`
- Cart/Wishlist: `/api/cart/update`, `/api/wishlist/update` 
- Orders: `/api/order/create`, `/api/order/stripe`

## 👤 Developer
**Shivani Bisinigi**  
 🔗 [Live Demo](https://gogroceries.vercel.app)

---
