/**
 * VERDANT TEA ATELIER - PRODUCTS JAVASCRIPT
 * Handles:
 * 1. Vanilla JS Category filtering (All, Green, Black, Oolong, Herbal, White/Pu-erh)
 * 2. Sorting (Price, Rating, Name)
 * 3. Quick View Modal with full product specs
 * 4. Add to Cart integration
 */

(function () {
  'use strict';

  // Sample catalog data matching 12 distinct cards
  const catalogData = [
    {
      id: 'prod-01',
      name: 'Uji Ceremonial Gyokuro "Jade Dew"',
      category: 'green',
      categoryLabel: 'Green Tea',
      terroir: 'Kyoto Prefecture, Japan',
      elevation: '420m High Canopy',
      harvest: 'Spring First Flush 2026',
      price: 48.00,
      weight: '50g / 1.76oz',
      rating: 5.0,
      reviews: 42,
      notes: ['Sweet Umami', 'Fresh Kelp', 'Spring Bamboo'],
      description: 'Shaded under reed screens for 24 days prior to plucking. Exceptional l-theanine concentration creating an unmatched broth-like umami sweetness.',
      image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=80',
      badge: 'Single Shaded Lot'
    },
    {
      id: 'prod-02',
      name: 'Castleton Vintage Muscatel First Flush',
      category: 'black',
      categoryLabel: 'Black Tea',
      terroir: 'Darjeeling, Himalayan Foothills',
      elevation: '1,800m Mist Ridge',
      harvest: 'March Alpine Flush 2026',
      price: 42.00,
      weight: '60g / 2.1oz',
      rating: 4.9,
      reviews: 38,
      notes: ['Muscatel Grape', 'Almond Blossom', 'Crisp Pine'],
      description: 'Known as the champagne of teas. Delicately withered leaves harvested under morning fog yielding a golden liquor with natural muscatel perfume.',
      image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80',
      badge: 'Estate Reserve'
    },
    {
      id: 'prod-03',
      name: 'Da Hong Pao "Big Red Robe" Wuyi Cliff',
      category: 'oolong',
      categoryLabel: 'Oolong Tea',
      terroir: 'Wuyi Mountains, Fujian, China',
      elevation: '950m Volcanic Crag',
      harvest: 'Charcoal Roasted 2025',
      price: 64.00,
      weight: '50g / 1.76oz',
      rating: 5.0,
      reviews: 56,
      notes: ['Mineral Stone', 'Charcoal Plum', 'Wild Orchid'],
      description: 'Grown on mossy volcanic cliff crevices. Undergoes traditional charcoal roasting over longan wood for eight hours, producing legendary rock rhyme (Yan Cha).',
      image: 'https://i.pinimg.com/1200x/5a/bf/b4/5abfb43b51aecab36e4cd5a74cbb1aba.jpg',
      badge: 'Heritage Mother Bush Line'
    },
    {
      id: 'prod-04',
      name: 'Silver Needle Supreme "Bai Hao Yin Zhen"',
      category: 'white-puerh',
      categoryLabel: 'White & Pu-erh',
      terroir: 'Fuding, Fujian, China',
      elevation: '1,100m Alpine Slopes',
      harvest: 'Pre-Qingming Bud Harvest 2026',
      price: 52.00,
      weight: '45g / 1.58oz',
      rating: 4.8,
      reviews: 29,
      notes: ['Silver Hay', 'White Melon', 'Wild Clover Honey'],
      description: 'Exclusively plump unopened spring buds covered in downy silver trichomes. Gently sun-withered without pan-firing or rolling for ethereal delicacy.',
      image: 'https://images.unsplash.com/photo-1579888944880-d98341245702?auto=format&fit=crop&w=800&q=80',
      badge: 'Buds Only'
    },
    {
      id: 'prod-05',
      name: 'Organic Egyptian Chamomile & French Lavender',
      category: 'herbal',
      categoryLabel: 'Herbal Infusion',
      terroir: 'Nile Valley & Provence',
      elevation: 'Bio-dynamic Lowlands',
      harvest: 'Hand-Cut Blossoms 2026',
      price: 28.00,
      weight: '75g / 2.65oz',
      rating: 4.9,
      reviews: 84,
      notes: ['Golden Apple', 'Calming Lavender', 'Honey Nectar'],
      description: 'Whole unbroken Matricaria chamomile flower heads hand-blended with high-altitude Provencal culinary lavender. Naturally 100% caffeine-free.',
      image: 'https://images.unsplash.com/photo-1531973968078-9bb02785f13d?auto=format&fit=crop&w=800&q=80',
      badge: 'Caffeine-Free'
    },
    {
      id: 'prod-06',
      name: '1998 Vintage Menghai Ripe Pu-erh Cake',
      category: 'white-puerh',
      categoryLabel: 'White & Pu-erh',
      terroir: 'Menghai, Yunnan, China',
      elevation: '1,650m Ancient Arbor',
      harvest: 'Aged Dry Cellar 1998',
      price: 110.00,
      weight: '100g / 3.52oz Flake',
      rating: 5.0,
      reviews: 19,
      notes: ['Old Books', 'Forest Floor', 'Sweet Chinese Date'],
      description: 'Pressed from leaves harvested off centuries-old semi-wild arbors. 28 years of slow micro-climatic fermentation yielding a liquor dark as espresso.',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
      badge: 'Vault Vintage 1998'
    },
    {
      id: 'prod-07',
      name: 'Tenju Ceremonial Single-Origin Matcha',
      category: 'green',
      categoryLabel: 'Green Tea',
      terroir: 'Uji, Kyoto, Japan',
      elevation: '380m Clay Loam',
      harvest: 'Granite Stone Ground 2026',
      price: 58.00,
      weight: '40g / 1.41oz Tin',
      rating: 5.0,
      reviews: 67,
      notes: ['Silky Cream', 'Pistachio Note', 'Sweet Chlorophyll'],
      description: 'Tencha leaves slow-milled by rotating granite stones at 30g per hour. Yields a micro-fine powder that whisks into a dense emerald crema with zero astringency.',
      image: 'https://i.pinimg.com/1200x/85/1e/63/851e636bb78f6b387e221ab747990a21.jpg',
      badge: 'Stone-Milled'
    },
    {
      id: 'prod-08',
      name: 'Traditional Lapsang Souchong "Zheng Shan Xiao Zhong"',
      category: 'black',
      categoryLabel: 'Black Tea',
      terroir: 'Tongmu Village, Wuyi Nature Reserve',
      elevation: '1,200m Pine Forests',
      harvest: 'Horseshoe Smokehouse 2025',
      price: 39.00,
      weight: '60g / 2.1oz',
      rating: 4.8,
      reviews: 31,
      notes: ['Smoked Pine Resin', 'Dried Longan', 'Caramelized Malt'],
      description: 'Dried inside traditional wooden smokehouses over embers of local Horsetail pine. A velvety, complex savory-sweet black tea unlike industrial smoked leaves.',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
      badge: 'Pine-Smoked Reserve'
    },
    {
      id: 'prod-09',
      name: 'Phoenix Dan Cong "Mi Lan Xiang" Honey Orchid',
      category: 'oolong',
      categoryLabel: 'Oolong Tea',
      terroir: 'Wudong Mountain, Guangdong',
      elevation: '1,390m Volcanic Granite',
      harvest: 'Spring Solar Wither 2026',
      price: 54.00,
      weight: '50g / 1.76oz',
      rating: 4.9,
      reviews: 44,
      notes: ['Wild Honey', 'White Orchid', 'Lychee Peel'],
      description: 'Harvested from single distinct bushes with natural genetic mutation that mimics sweet orchid flowers and wild mountain honey without flavorings.',
      image: 'https://i.pinimg.com/1200x/00/89/06/008906195aa765f6d32c14458e319b04.jpg',
      badge: 'Single Arbor'
    },
    {
      id: 'prod-10',
      name: 'Alpine Peppermint & Wild Elderflower',
      category: 'herbal',
      categoryLabel: 'Herbal Infusion',
      terroir: 'Swiss Alps & Carpathian Valleys',
      elevation: '1,100m Alpine Meadows',
      harvest: 'Summer Clean Pick 2026',
      price: 26.00,
      weight: '70g / 2.47oz',
      rating: 4.7,
      reviews: 52,
      notes: ['Crisp Menthol', 'Elderflower Citrus', 'Sweet Thyme'],
      description: 'A soothing restorative infusion of intense mountain peppermint infused with delicate muscat-scented wild elderflower blossoms.',
      image: 'https://i.pinimg.com/736x/a2/44/b3/a244b391fb6692eff50a7f1f5b1f2d49.jpg',
      badge: 'Wild-Harvested'
    },
    {
      id: 'prod-11',
      name: 'Moonlight White Peony "Yue Guang Bai"',
      category: 'white-puerh',
      categoryLabel: 'White & Pu-erh',
      terroir: 'Jinggu, Yunnan, China',
      elevation: '1,700m Sunless Caves',
      harvest: 'Night Harvest 2025',
      price: 45.00,
      weight: '60g / 2.1oz',
      rating: 4.9,
      reviews: 26,
      notes: ['Night Jasmine', 'Cantaloupe', 'Aged Cedar'],
      description: 'Plucked exclusively under evening conditions and withered in shaded caves without sunlight. The top of the leaf turns black while the underside remains silver white.',
      image: 'https://i.pinimg.com/236x/73/c0/a5/73c0a59a3813b58a01956fdf6929877e.jpg',
      badge: 'Night Harvest'
    },
    {
      id: 'prod-12',
      name: 'Golden Monkey Imperial Dianhong',
      category: 'black',
      categoryLabel: 'Black Tea',
      terroir: 'Fengqing, Yunnan, China',
      elevation: '2,000m Cloud Terrace',
      harvest: 'Spring Imperial Pluck 2026',
      price: 36.00,
      weight: '50g / 1.76oz',
      rating: 4.8,
      reviews: 49,
      notes: ['Dark Chocolate', 'Baked Yam', 'Golden Honeycomb'],
      description: 'Hand-plucked one-leaf, one-bud tips dense with golden fleece down. Breeds a full-bodied, velvety brew free from bitterness with natural sweet chocolate notes.',
      image: 'https://i.pinimg.com/736x/b0/d5/c3/b0d5c34737f9d0afe63de4cc22d17068.jpg',
      badge: 'Golden Tips'
    }
  ];

  let currentCategory = 'all';
  let currentSort = 'recommended';

  function initProductsPage() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    // Filter tabs
    const filterButtons = document.querySelectorAll('.category-filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('bg-stone-900', 'text-stone-50', 'dark:bg-stone-100', 'dark:text-stone-900', 'font-semibold');
          b.classList.add('bg-stone-100', 'text-stone-700', 'dark:bg-stone-800', 'dark:text-stone-300');
        });
        btn.classList.remove('bg-stone-100', 'text-stone-700', 'dark:bg-stone-800', 'dark:text-stone-300');
        btn.classList.add('bg-stone-900', 'text-stone-50', 'dark:bg-stone-100', 'dark:text-stone-900', 'font-semibold');

        currentCategory = btn.getAttribute('data-category');
        renderGrid();
      });
    });

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderGrid();
      });
    }

    renderGrid();
    initQuickViewModal();
  }

  function renderGrid() {
    const grid = document.getElementById('productsGrid');
    const countEl = document.getElementById('productCountDisplay');
    if (!grid) return;

    // Filter
    let filtered = catalogData.filter(item => {
      if (currentCategory === 'all') return true;
      return item.category === currentCategory;
    });

    // Sort
    if (currentSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (countEl) {
      countEl.textContent = `Displaying ${filtered.length} of ${catalogData.length} Master Blends`;
    }

    grid.innerHTML = filtered.map(item => `
      <article class="product-card group flex flex-col bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 transition-all hover:border-stone-400 dark:hover:border-stone-600">
        <!-- Card Image & Badge -->
        <div class="relative overflow-hidden aspect-[4/3] bg-stone-200 dark:bg-stone-800">
          <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute top-3 left-3 flex flex-col gap-1.5">
            <span class="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900">
              ${item.badge}
            </span>
          </div>
          <span class="absolute bottom-3 right-3 px-2 py-0.5 text-xs font-mono bg-stone-950/80 text-stone-100">
            ${item.weight}
          </span>
        </div>

        <!-- Card Content -->
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1.5 font-mono">
              <span>${item.categoryLabel}</span>
              <span>&bull; ${item.elevation}</span>
            </div>
            
            <h3 class="text-lg font-serif font-medium line-clamp-1 mb-1.5 text-stone-900 dark:text-stone-100">
              ${item.name}
            </h3>
            
            <p class="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mb-3">
              ${item.description}
            </p>

            <!-- Tasting Notes Badges -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${item.notes.map(n => `
                <span class="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-stone-200/80 text-stone-800 dark:bg-stone-800 dark:text-stone-300">
                  ${n}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Price & Actions -->
          <div class="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
            <div>
              <span class="text-xs text-stone-500 dark:text-stone-400 block font-mono">Price</span>
              <span class="text-base font-semibold font-mono text-stone-900 dark:text-stone-100">$${item.price.toFixed(2)}</span>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="window.openQuickView('${item.id}')" class="px-3 py-2 text-xs font-medium border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors">
                Quick View
              </button>
              <button type="button" onclick="window.addToCart({ id: '${item.id}', name: '${item.name.replace(/'/g, "\\'")}', price: ${item.price}, image: '${item.image}', weight: '${item.weight}', category: '${item.categoryLabel}' })" class="px-3 py-2 text-xs font-semibold bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Quick View Modal
  function initQuickViewModal() {
    window.openQuickView = function (id) {
      const item = catalogData.find(p => p.id === id);
      if (!item) return;

      const modal = document.getElementById('quickViewModal');
      const backdrop = document.getElementById('quickViewBackdrop');
      const body = document.getElementById('quickViewBody');
      if (!modal || !backdrop || !body) return;

      body.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="relative aspect-square bg-stone-200 dark:bg-stone-800">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900">
                ${item.badge}
              </span>
            </div>
          </div>

          <div class="flex flex-col justify-between">
            <div>
              <div class="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-mono mb-2">
                ${item.categoryLabel} &bull; ${item.harvest}
              </div>
              <h2 class="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-3">
                ${item.name}
              </h2>
              <div class="flex items-center gap-2 mb-4">
                <span class="text-amber-500 text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <span class="text-xs text-stone-500 dark:text-stone-400 font-mono">(${item.rating} / 5.0 &bull; ${item.reviews} verified reviews)</span>
              </div>
              <p class="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                ${item.description}
              </p>

              <!-- Terroir Table -->
              <div class="border border-stone-200 dark:border-stone-800 p-3 mb-4 space-y-1.5 text-xs">
                <div class="flex justify-between"><span class="text-stone-500 dark:text-stone-400 font-mono">Terroir Origin:</span><span class="font-medium">${item.terroir}</span></div>
                <div class="flex justify-between"><span class="text-stone-500 dark:text-stone-400 font-mono">Elevation:</span><span class="font-medium">${item.elevation}</span></div>
                <div class="flex justify-between"><span class="text-stone-500 dark:text-stone-400 font-mono">Packaged Weight:</span><span class="font-medium">${item.weight}</span></div>
              </div>

              <!-- Sensory Notes -->
              <div class="mb-6">
                <span class="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">Dominant Aroma Profile:</span>
                <div class="flex flex-wrap gap-2">
                  ${item.notes.map(n => `
                    <span class="px-2.5 py-1 text-xs font-medium bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700">
                      ${n}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Modal Action -->
            <div class="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4">
              <div>
                <span class="text-xs text-stone-500 dark:text-stone-400 block font-mono">Total Unit Price</span>
                <span class="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">$${item.price.toFixed(2)}</span>
              </div>
              <button type="button" onclick="window.addToCart({ id: '${item.id}', name: '${item.name.replace(/'/g, "\\'")}', price: ${item.price}, image: '${item.image}', weight: '${item.weight}', category: '${item.categoryLabel}' }); window.closeQuickView();" class="px-6 py-3 bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity">
                Add to Basket
              </button>
            </div>
          </div>
        </div>
      `;

      modal.classList.remove('hidden');
      backdrop.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    };

    window.closeQuickView = function () {
      const modal = document.getElementById('quickViewModal');
      const backdrop = document.getElementById('quickViewBackdrop');
      if (modal) modal.classList.add('hidden');
      if (backdrop) backdrop.classList.add('hidden');
      document.body.style.overflow = '';
    };

    const closeBtn = document.getElementById('closeQuickViewBtn');
    const backdrop = document.getElementById('quickViewBackdrop');
    if (closeBtn) closeBtn.addEventListener('click', window.closeQuickView);
    if (backdrop) backdrop.addEventListener('click', window.closeQuickView);
  }

  document.addEventListener('DOMContentLoaded', initProductsPage);
})();
