function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Invalid quantity');
  } if (quantity > product.stock) {
    throw new RangeError('Exceeds stock');
  }
  const exestingItem = cart.find((item) => item.id === product.id);
  if (exestingItem) {
    const newQuantity = exestingItem.quantity + quantity;
    if (newQuantity > product.stock) {
      throw new RangeError('Exceed stock');
    }
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item
    );
  } else {
    return [...cart, { ...product, quantity }];
  }
}

function changeQuantity(cart, productId, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Invalid quantity');
  }
  const item = cart.find((i) => i.id === productId);
  if (!item) {
    return cart;
  }
  if (quantity > item.stock) {
    throw new RangeError('Exceeds stock');
  }
  return cart.map((cartItem) =>
    cartItem.id === productId ? { ...cartItem, quantity } : cartItem
  );
}

function removeFromCart(cart, productId) { 
  return cart.filter(item => item.id !== productId);
 }

function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
