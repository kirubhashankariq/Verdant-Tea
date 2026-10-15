/**
 * VERDANT TEA ATELIER - GLOBAL JAVASCRIPT
 * Handles:
 * 1. Dark/Light theme toggle & persistence (Icons only)
 * 2. RTL/LTR Double Arrow toggle & persistence (Icons only)
 * 3. Mobile Hamburger Menu (100% elements included, high z-index)
 * 4. Shopping Cart Drawer & Global Toast Notifications
 * 5. Active Link Detection
 */

(function () {
  'use strict';

  // State Management
  const CART_STORAGE_KEY = 'verdant_cart_items';
  const THEME_STORAGE_KEY = 'verdant_theme_pref';
  const DIR_STORAGE_KEY = 'verdant_dir_pref';

  // --- 1. THEME INITIALIZATION & TOGGLE ---
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateThemeIcons();
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    updateThemeIcons();
    showToast(isDark ? 'Dark Mode Activated' : 'Light Mode Activated');
  }

  function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    const sunIcons = document.querySelectorAll('.theme-sun-icon');
    const moonIcons = document.querySelectorAll('.theme-moon-icon');

    sunIcons.forEach(icon => {
      if (isDark) {
        icon.classList.remove('hidden');
      } else {
        icon.classList.add('hidden');
      }
    });

    moonIcons.forEach(icon => {
      if (isDark) {
        icon.classList.add('hidden');
      } else {
        icon.classList.remove('hidden');
      }
    });
  }

  // --- 2. RTL / LTR DIRECTION TOGGLE (DOUBLE ARROW ICON ONLY) ---
  function initDirection() {
    const savedDir = localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
  }

  function toggleDirection() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', nextDir);
    localStorage.setItem(DIR_STORAGE_KEY, nextDir);
    showToast(nextDir === 'rtl' ? 'Swapped to RTL (Right-to-Left)' : 'Swapped to LTR (Left-to-Right)');
  }

  // --- 3. MOBILE MENU (HAMBURGER < 1024px) ---
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const closeBtn = document.getElementById('mobileMenuCloseBtn');
    const drawer = document.getElementById('mobileMenuDrawer');
    const backdrop = document.getElementById('mobileMenuBackdrop');

    if (!menuBtn || !drawer || !backdrop) return;

    function openMenu() {
      drawer.classList.remove('translate-x-full', '-translate-x-full');
      backdrop.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRtl) {
        drawer.classList.add('-translate-x-full');
      } else {
        drawer.classList.add('translate-x-full');
      }
      backdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !backdrop.classList.contains('hidden')) {
        closeMenu();
      }
    });

    const mobileLinks = drawer.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- 4. CART & TOAST NOTIFICATION SYSTEM ---
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch (e) {
    cart = [];
  }

  function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadges();
    renderCartItems();
  }

  function updateCartBadges() {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-counter-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.remove('scale-0');
        badge.classList.add('scale-100');
      } else {
        badge.classList.remove('scale-100');
        badge.classList.add('scale-0');
      }
    });
  }

  window.addToCart = function (product) {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += (product.quantity || 1);
    } else {
      cart.push({
        id: product.id || 'prod-' + Date.now(),
        name: product.name,
        price: parseFloat(product.price) || 32,
        image: product.image || 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
        weight: product.weight || '50g / 1.76oz',
        category: product.category || 'Specialty Tea',
        quantity: product.quantity || 1
      });
    }
    saveCart();
    showToast(`Added to Basket: ${product.name}`);
    openCartDrawer();
  };

  function renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const subtotalEl = document.getElementById('cartSubtotalAmount');
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="py-16 text-center text-stone-500 dark:text-stone-400">
          <svg class="w-12 h-12 mx-auto mb-4 stroke-current opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <p class="text-sm font-medium">Your tea basket is currently empty.</p>
          <a href="products.html" class="inline-block mt-4 px-6 py-2.5 bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold uppercase tracking-widest hover:opacity-90">
            Explore Collection
          </a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '$0.00';
      return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map(item => {
      const lineTotal = item.price * item.quantity;
      subtotal += lineTotal;
      return `
        <div class="flex items-center gap-4 py-4 border-b border-stone-200 dark:border-stone-800">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover border border-stone-200 dark:border-stone-800 flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-medium truncate">${item.name}</h4>
            <p class="text-xs text-stone-500 dark:text-stone-400">${item.weight} &bull; $${item.price.toFixed(2)}</p>
            <div class="flex items-center gap-3 mt-2">
              <div class="flex items-center border border-stone-300 dark:border-stone-700">
                <button type="button" onclick="window.updateCartQuantity('${item.id}', ${item.quantity - 1})" class="px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800">&minus;</button>
                <span class="px-2 py-0.5 text-xs font-mono font-medium">${item.quantity}</span>
                <button type="button" onclick="window.updateCartQuantity('${item.id}', ${item.quantity + 1})" class="px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800">&plus;</button>
              </div>
              <button type="button" onclick="window.removeCartItem('${item.id}')" class="text-xs text-red-600 dark:text-red-400 hover:underline">Remove</button>
            </div>
          </div>
          <div class="text-right">
            <span class="text-sm font-semibold text-stone-900 dark:text-stone-100">$${lineTotal.toFixed(2)}</span>
          </div>
        </div>
      `;
    }).join('');

    if (subtotalEl) {
      subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    }
  }

  window.updateCartQuantity = function (id, newQty) {
    if (newQty <= 0) {
      window.removeCartItem(id);
      return;
    }
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity = newQty;
      saveCart();
    }
  };

  window.removeCartItem = function (id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    showToast('Item removed from basket');
  };

  function openCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (!drawer || !backdrop) return;
    drawer.classList.remove('translate-x-full', '-translate-x-full');
    backdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (!drawer || !backdrop) return;
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    if (isRtl) {
      drawer.classList.add('-translate-x-full');
    } else {
      drawer.classList.add('translate-x-full');
    }
    backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function initCartDrawer() {
    const openBtns = document.querySelectorAll('.open-cart-btn');
    const closeBtn = document.getElementById('closeCartDrawerBtn');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    const checkoutBtn = document.getElementById('checkoutBtn');

    openBtns.forEach(btn => btn.addEventListener('click', openCartDrawer));
    if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
    if (backdrop) backdrop.addEventListener('click', closeCartDrawer);

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
          showToast('Your basket is empty. Please select tea blends first.');
          return;
        }
        showToast('Initiating Secure Checkout Vault...');
        setTimeout(() => {
          alert('Thank you for choosing Verdant Tea Atelier! This is a luxury demonstration checkout.');
          cart = [];
          saveCart();
          closeCartDrawer();
        }, 600);
      });
    }
  }

  // --- 5. TOAST NOTIFICATIONS ---
  function showToast(message) {
    let toast = document.getElementById('globalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalToast';
      toast.className = 'fixed bottom-6 right-6 z-toast max-w-sm px-5 py-3.5 bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 border border-stone-700 dark:border-stone-300 shadow-xl transition-all duration-300 transform translate-y-12 opacity-0 flex items-center justify-between gap-4 pointer-events-none';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <svg class="w-4 h-4 text-emerald-400 dark:text-emerald-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        <span class="text-xs font-semibold tracking-wide">${message}</span>
      </div>
    `;

    toast.classList.remove('translate-y-12', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    if (window._toastTimer) clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-12', 'opacity-0', 'pointer-events-none');
    }, 3200);
  }
  window.showToast = showToast;

  // --- 6. HOME DROPDOWN TOGGLE (Desktop & Mobile) ---
  function initHomeDropdown() {
    // Desktop Dropdown
    const dropdownBtn = document.getElementById('homeDropdownBtn');
    const dropdownMenu = document.getElementById('homeDropdownMenu');
    const chevron = dropdownBtn ? dropdownBtn.querySelector('.dropdown-chevron') : null;

    if (dropdownBtn && dropdownMenu) {
      function toggleDropdown(e) {
        if (e) e.stopPropagation();
        const isHidden = dropdownMenu.classList.contains('hidden');
        if (isHidden) {
          dropdownMenu.classList.remove('hidden');
          dropdownBtn.setAttribute('aria-expanded', 'true');
          if (chevron) chevron.classList.add('rotate-180');
        } else {
          closeDropdown();
        }
      }

      function closeDropdown() {
        dropdownMenu.classList.add('hidden');
        dropdownBtn.setAttribute('aria-expanded', 'false');
        if (chevron) chevron.classList.remove('rotate-180');
      }

      dropdownBtn.addEventListener('click', toggleDropdown);

      // Close when clicking anywhere outside
      document.addEventListener('click', (e) => {
        if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
          closeDropdown();
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !dropdownMenu.classList.contains('hidden')) {
          closeDropdown();
        }
      });
    }

    // Mobile Drawer Dropdown Accordion
    const mobileBtn = document.getElementById('mobileHomeDropdownBtn');
    const mobileMenu = document.getElementById('mobileHomeDropdownMenu');
    const mobileChevron = mobileBtn ? mobileBtn.querySelector('.mobile-dropdown-chevron') : null;

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isClosed = mobileMenu.classList.contains('hidden');
        if (isClosed) {
          mobileMenu.classList.remove('hidden');
          mobileBtn.setAttribute('aria-expanded', 'true');
          if (mobileChevron) mobileChevron.classList.add('rotate-180');
        } else {
          mobileMenu.classList.add('hidden');
          mobileBtn.setAttribute('aria-expanded', 'false');
          if (mobileChevron) mobileChevron.classList.remove('rotate-180');
        }
      });
    }
  }

  // --- 7. ATTACH GLOBAL LISTENERS ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDirection();
    initMobileMenu();
    initHomeDropdown();
    initCartDrawer();
    updateCartBadges();
    renderCartItems();

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleDirection);
    });

    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          showToast(`Welcome to the Reserve Circle, ${input.value}!`);
          input.value = '';
        }
      });
    });
  });

})();
