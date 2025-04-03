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

The frontend currently uses a static JSON file (`public/data/products.json`) for product data.

## State Management

The application uses React Context for state management:

1. **CartContext**: Manages shopping cart state
2. **CurrencyContext**: Handles currency selection and formatting
3. **AuthContext**: Manages user authentication state

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
## Backend Integration Steps

1. Replace static data with API calls:
   - Update `ProductListing.jsx` to fetch from `/api/products`
   - Update `ProductPage.jsx` to fetch from `/api/products/:id`
   - Update `Cart.jsx` to use cart API endpoints

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request
