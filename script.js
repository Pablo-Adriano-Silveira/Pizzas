// Data
const pizzas = [
  {
    id: 1,
    name: 'Calabresa',
    description: 'Mussarela, calabresa, cebola e orégano.',
    price: 3.00,
    image: 'https://images.pexels.com/photos/845802/pexels-photo-845802.jpeg'
  },
  {
    id: 2,
    name: 'Frango com Catupiry',
    description: 'Mussarela, frango desfiado, catupiry e orégano.',
    price: 3.00,
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg'
  },
  {
    id: 3,
    name: 'Margherita',
    description: 'Mussarela, tomate, manjericão e azeite.',
    price: 3.00,
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg'
  },
  {
    id: 4,
    name: 'Quatro Queijos',
    description: 'Mussarela, parmesão, provolone, gorgonzola e orégano.',
    price: 3.00,
    image: 'https://images.pexels.com/photos/3762069/pexels-photo-3762069.jpeg'
  }
];

const breads = [
  {
    id: 5,
    name: 'Pão Francês',
    description: 'Crocante e fresco, feito diariamente.',
    price: 3.00,
    unit: 'unidade',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg'
  }/*,
  {
    id: 6,
    name: 'Pão de Queijo',
    description: 'Tradicional mineiro com queijo minas.',
    price: 3.00,
    unit: '10 unidades',
    image: 'https://images.pexels.com/photos/4109996/pexels-photo-4109996.jpeg'
  },
  {
    id: 7,
    name: 'Pão Integral',
    description: 'Feito com farinha integral, sementes e grãos.',
    price: 4.50,
    unit: 'unidade',
    image: 'https://images.pexels.com/photos/137103/pexels-photo-137103.jpeg'
  },
  {
    id: 8,
    name: 'Baguete',
    description: 'Crocante por fora, macio por dentro.',
    price: 5.00,
    unit: 'unidade',
    image: 'https://images.pexels.com/photos/1387075/pexels-photo-1387075.jpeg'
  }*/
];

// Cart functionality
let cart = [];

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.cart-count').textContent = count;
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.querySelector('.total-amount').textContent = `€${total.toFixed(2)}`;
}

function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartCount();
  updateCartTotal();
  renderCartItems();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartCount();
  updateCartTotal();
  renderCartItems();
}

function updateQuantity(id, newQuantity) {
  if (newQuantity < 1) {
    removeFromCart(id);
    return;
  }
  
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity = newQuantity;
    updateCartCount();
    updateCartTotal();
    renderCartItems();
  }
}

function renderCartItems() {
  const cartItems = document.querySelector('.cart-items');
  
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-300 mb-4"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        <h3 class="text-lg font-medium text-gray-600">Seu carrinho está vazio</h3>
        <p class="text-gray-500 mt-2 mb-6">Adicione itens para começar seu pedido</p>
      </div>
    `;
    return;
  }
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <span class="cart-item-price">€${(item.price * item.quantity).toFixed(2)}</span>
        <div class="cart-item-quantity">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          <button class="quantity-btn text-red-500" onclick="removeFromCart(${item.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Cart modal
function openCart() {
  document.getElementById('cartModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartModal').classList.remove('open');
  document.body.style.overflow = 'auto';
}

// Header scroll effect
function handleScroll() {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.style.backgroundColor = '#a3807d';
    header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.backgroundColor = 'transparent';
    header.style.boxShadow = 'none';
  }
}

// Render products
function renderProducts() {
  const pizzasGrid = document.querySelector('#pizzas .product-grid');
  const breadsGrid = document.querySelector('#paes .product-grid');
  
  pizzasGrid.innerHTML = pizzas.map(product => `
    <div class="product-card">
      <div class="product-image">
        <span class="price-tag">€${product.price.toFixed(2)}</span>
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <button class="btn btn-primary" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `).join('');
  
  breadsGrid.innerHTML = breads.map(product => `
    <div class="product-card">
      <div class="product-image">
        <span class="price-tag">
          €${product.price.toFixed(2)}
          ${product.unit ? `<br><small>/${product.unit}</small>` : ''}
        </span>
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <button class="btn btn-primary" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `).join('');
}

// Contact form
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    const formData = new FormData(e.target);
    const response = await fetch(e.target.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      alert('Mensagem enviada com sucesso!');
      e.target.reset();
    } else {
      throw new Error('Falha ao enviar mensagem');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Houve um problema ao enviar a mensagem. Tente novamente.');
  }
});

// Event Listeners
window.addEventListener('scroll', handleScroll);
document.querySelector('.cart-btn').addEventListener('click', openCart);
document.querySelector('.close-cart').addEventListener('click', closeCart);
document.querySelector('.cart-backdrop').addEventListener('click', closeCart);
document.querySelector('.continue-shopping').addEventListener('click', closeCart);
document.querySelector('.checkout-btn').addEventListener('click', () => {
  alert('Checkout em Breve! Peça por WhatsApp ou Mensagem. Obrigado!');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();
  updateCartTotal();
  handleScroll();
});
