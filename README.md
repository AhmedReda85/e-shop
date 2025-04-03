# E-Shop Frontend

A modern e-commerce frontend built with React and Vite.

## Project Structure

```
e-shop/
├── public/
│   ├── data/
│   │   └── products.json    # Product data
│   └── images/
│       └── products/        # Product images
├── src/
│   ├── components/         # React components
│   ├── context/           # React context providers
│   ├── assets/            # Static assets
│   └── App.jsx            # Main application component
└── package.json           # Project dependencies
```

## Tech Stack

- React 18
- Vite
- TailwindCSS
- Framer Motion
- Lucide Icons
- React Router DOM

## Key Features

1. **Product Management**
   - Product listing with filtering
   - Detailed product pages
   - Category-based navigation
   - Related products

2. **Shopping Cart**
   - Add/remove items
   - Quantity management
   - Price calculations
   - Size and color selection

3. **User Interface**
   - Responsive design
   - Mobile-first approach
   - Smooth animations
   - Loading states

4. **Currency Support**
   - Multiple currency support
   - Automatic currency detection
   - Price formatting

## API Integration Points

The frontend currently uses a static JSON file (`public/data/products.json`) for product data. The backend developer should implement the following endpoints:

1. **Products API**
   ```typescript
   GET /api/products
   GET /api/products/:id
   GET /api/products/category/:category
   ```

2. **Cart API**
   ```typescript
   POST /api/cart
   GET /api/cart
   PUT /api/cart/:id
   DELETE /api/cart/:id
   ```

3. **User API**
   ```typescript
   POST /api/auth/register
   POST /api/auth/login
   GET /api/auth/me
   ```

4. **Reviews API**
   ```typescript
   GET /api/products/:id/reviews
   POST /api/products/:id/reviews
   ```

## State Management

The application uses React Context for state management:

1. **CartContext**: Manages shopping cart state
2. **CurrencyContext**: Handles currency selection and formatting
3. **AuthContext**: Manages user authentication state

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
VITE_CURRENCY_API_KEY=your_api_key
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Build for Production

```bash
npm run build
```

## Backend Integration Steps

1. Replace static data with API calls:
   - Update `ProductListing.jsx` to fetch from `/api/products`
   - Update `ProductPage.jsx` to fetch from `/api/products/:id`
   - Update `Cart.jsx` to use cart API endpoints

2. Implement authentication:
   - Add login/register forms
   - Integrate with auth API
   - Add protected routes

3. Add error handling:
   - Implement API error handling
   - Add loading states
   - Show error messages

4. Add image handling:
   - Implement image upload
   - Add image optimization
   - Handle image loading errors

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT
