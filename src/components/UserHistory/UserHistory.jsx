import { useUserHistory } from "../../context/UserHistoryContext";
import { useAuth } from "../../context/AuthContext";
import { useCurrency } from "../../context/CurrencyContext";
import { Package, Calendar, CreditCard } from "lucide-react";

export default function UserHistory() {
  const { getUserPurchases } = useUserHistory();
  const { user } = useAuth();
  const { formatPrice } = useCurrency();

  const purchases = getUserPurchases(user?.id);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Please log in to view your purchase history</h2>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Your Purchase History</h2>
        <p className="text-gray-600">You haven't made any purchases yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Purchase History</h2>
      <div className="space-y-6">
        {purchases.map((purchase, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="text-blue-600" size={20} />
                <span className="font-semibold">Order #{index + 1}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span>{new Date(purchase.date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-4">
              {purchase.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="text-green-600" size={20} />
                  <span className="font-medium">Total Amount:</span>
                </div>
                <span className="text-xl font-bold text-blue-600">
                  {formatPrice(purchase.items.reduce((total, item) => total + (item.price * item.quantity), 0))}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 