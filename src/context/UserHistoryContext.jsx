import { createContext, useContext, useState, useEffect } from "react";

const UserHistoryContext = createContext();

export function UserHistoryProvider({ children }) {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  // Load purchase history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("purchaseHistory");
    if (savedHistory) {
      setPurchaseHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save purchase history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
  }, [purchaseHistory]);

  const addPurchase = (order) => {
    setPurchaseHistory((prev) => [...prev, { ...order, date: new Date().toISOString() }]);
  };

  const hasPurchasedProduct = (userId, productId) => {
    return purchaseHistory.some(
      (purchase) => purchase.userId === userId && purchase.items.some((item) => item.id === productId)
    );
  };

  const getUserPurchases = (userId) => {
    return purchaseHistory.filter((purchase) => purchase.userId === userId);
  };

  return (
    <UserHistoryContext.Provider
      value={{
        purchaseHistory,
        addPurchase,
        hasPurchasedProduct,
        getUserPurchases,
      }}
    >
      {children}
    </UserHistoryContext.Provider>
  );
}

export function useUserHistory() {
  const context = useContext(UserHistoryContext);
  if (!context) {
    throw new Error("useUserHistory must be used within a UserHistoryProvider");
  }
  return context;
} 