import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, orderBump, OrderBump, OTOOffer } from "@/data/products";

interface CartItem {
  product: Product;
  variantId: string;
  quantity: number;
}

interface CouponData {
  code: string;
  discount: number;
  expiresAt: number;
}

interface CartContextType {
  items: CartItem[];
  orderBumpAdded: boolean;
  otos: OTOOffer[];
  email: string;
  promoCode: string;
  paymentMethod: 'cod' | 'online';
  quizResult: string | null;
  selectedProductId: string | null;
  coupon: CouponData | null;
  addItem: (product: Product, variantId: string) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  toggleOrderBump: () => void;
  addOTO: (oto: OTOOffer) => void;
  setEmail: (email: string) => void;
  setPromoCode: (code: string) => void;
  setPaymentMethod: (method: 'cod' | 'online') => void;
  setQuizResult: (result: string) => void;
  setSelectedProductId: (id: string | null) => void;
  setCoupon: (coupon: CouponData | null) => void;
  clearCart: () => void;
  subtotal: number;
  orderBumpTotal: number;
  otoTotal: number;
  total: number;
  itemCount: number;
  getOrderBump: () => OrderBump;
  isCouponValid: () => boolean;
  getCouponTimeRemaining: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const COUPON_STORAGE_KEY = "mugsmith_coupon";
const CART_STORAGE_KEY = "mugsmith_cart";
const COUPON_DURATION_MS = 60 * 60 * 1000; // 60 minutes

interface StoredCart {
  items: { productId: string; variantId: string; quantity: number }[];
  orderBumpAdded: boolean;
  promoCode: string;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderBumpAdded, setOrderBumpAdded] = useState(false);
  const [otos, setOtos] = useState<OTOOffer[]>([]);
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [coupon, setCouponState] = useState<CouponData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart and coupon from localStorage on mount
  useEffect(() => {
    // Load coupon
    const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
    if (storedCoupon) {
      try {
        const parsed = JSON.parse(storedCoupon) as CouponData;
        if (parsed.expiresAt > Date.now()) {
          setCouponState(parsed);
        } else {
          localStorage.removeItem(COUPON_STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    }

    // Load cart
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart) as StoredCart;
        // We need to import products to reconstruct cart items
        import("@/data/products").then(({ getProductById }) => {
          const loadedItems: CartItem[] = [];
          parsed.items.forEach(item => {
            const product = getProductById(item.productId);
            if (product) {
              loadedItems.push({ product, variantId: item.variantId, quantity: item.quantity });
            }
          });
          setItems(loadedItems);
          setOrderBumpAdded(parsed.orderBumpAdded || false);
          setPromoCode(parsed.promoCode || "");
          setIsInitialized(true);
        });
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
        setIsInitialized(true);
      }
    } else {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;
    
    const cartToStore: StoredCart = {
      items: items.map(item => ({
        productId: item.product.id,
        variantId: item.variantId,
        quantity: item.quantity,
      })),
      orderBumpAdded,
      promoCode,
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartToStore));
  }, [items, orderBumpAdded, promoCode, isInitialized]);

  const setCoupon = (newCoupon: CouponData | null) => {
    setCouponState(newCoupon);
    if (newCoupon) {
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(newCoupon));
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  };

  const isCouponValid = () => {
    return coupon !== null && coupon.expiresAt > Date.now();
  };

  const getCouponTimeRemaining = () => {
    if (!coupon) return 0;
    return Math.max(0, coupon.expiresAt - Date.now());
  };

  const addItem = (product: Product, variantId: string) => {
    setSelectedProductId(product.id);
    setItems(prev => {
      const existing = prev.find(
        item => item.product.id === product.id && item.variantId === variantId
      );
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.variantId === variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, variantId, quantity: 1 }];
    });
  };

  const removeItem = (productId: string, variantId: string) => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && item.variantId === variantId)
    ));
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems(prev => prev.map(item =>
      item.product.id === productId && item.variantId === variantId
        ? { ...item, quantity }
        : item
    ));
  };

  const toggleOrderBump = () => {
    setOrderBumpAdded(prev => !prev);
  };

  const addOTO = (oto: OTOOffer) => {
    // Prevent duplicate OTOs
    setOtos(prev => {
      if (prev.some(o => o.id === oto.id)) return prev;
      return [...prev, oto];
    });
  };

  const clearCart = () => {
    setItems([]);
    setOrderBumpAdded(false);
    setOtos([]);
    setPromoCode("");
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const subtotal = items.reduce((sum, item) => {
    const variant = item.product.variants.find(v => v.id === item.variantId);
    return sum + (variant?.price || item.product.price) * item.quantity;
  }, 0);

  const orderBumpTotal = orderBumpAdded ? orderBump.price : 0;
  const otoTotal = otos.reduce((sum, oto) => sum + oto.price, 0);
  const total = subtotal + orderBumpTotal + otoTotal;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const getOrderBump = () => orderBump;

  return (
    <CartContext.Provider
      value={{
        items,
        orderBumpAdded,
        otos,
        email,
        promoCode,
        paymentMethod,
        quizResult,
        selectedProductId,
        coupon,
        addItem,
        removeItem,
        updateQuantity,
        toggleOrderBump,
        addOTO,
        setEmail,
        setPromoCode,
        setPaymentMethod,
        setQuizResult,
        setSelectedProductId,
        setCoupon,
        clearCart,
        subtotal,
        orderBumpTotal,
        otoTotal,
        total,
        itemCount,
        getOrderBump,
        isCouponValid,
        getCouponTimeRemaining,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { COUPON_DURATION_MS };
