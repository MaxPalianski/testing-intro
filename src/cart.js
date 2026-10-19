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

function calculateCartSubtotal(cart) {
  return cart.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);
}
function calculateOrderTotal(cart, promoCode = '') {
  const subtotal = calculateCartSubtotal(cart);
  let discount = 0;
  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1);
  }
  const amountAfterDiscount = subtotal - discount;
  const delivery = amountAfterDiscount >= 50000 ? 0 : 30000;
  const total = amountAfterDiscount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
