/**
 * VERDANT TEA ATELIER - BLOG & TERROIR GAZETTE JAVASCRIPT
 * Handles:
 * 1. Category filtering (All, Harvest Reports, Cupping Protocols, Tea Philosophy, Ceramic Arts, Almanac)
 * 2. Real-time Search Filter by Title, Author, Tags
 * 3. Interactive Reading Modal with Full In-Depth Essay
 * 4. Reading Progress Bar & Accessibility
 */

(function () {
  'use strict';

  const blogArticles = [
    {
      id: 'art-01',
      title: 'The 3,000-Year Ancient Arbor: Decoding the Terroir of Mount Da Xue Shan',
      category: 'harvest',
      categoryLabel: 'Harvest Reports',
      author: 'Dr. Lin Mei-Ling & Kenji Hoshino',
      authorRole: 'Senior Terroir Curators',
      authorImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      date: 'April 18, 2026',
      readTime: '9 min read',
      image: 'https://images.pexels.com/photos/8952049/pexels-photo-8952049.jpeg',
      badge: 'Featured Cover Story',
      tags: ['Yunnan', 'Pu-erh', 'Ancient Arbor', 'Terroir'],
      excerpt: 'High in the mist canopy of Lincang, semi-wild Camellia arbors have witnessed three millennia of climatic cycles. We climbed to 2,400 meters to document how deep root tap systems absorb volcanic basalt minerals, yielding a liquor that lingers for twenty minutes in the palate.',
      content: [
        'Ascending Mount Da Xue Shan requires navigating unpaved logging ridges where dense morning vapor obscures ancient stone trails. At 2,400 meters elevation, the air is thin, crisp, and charged with the scent of wild forest moss and decaying pine needles. Here stand the patriarchs of the Camellia genus: wild and semi-wild arbors dating back between 800 and 3,200 years.',
        'Unlike commercial plantation bushes that are pruned to waist-height table hedges, these ancestral trees tower twelve meters into the sky. Their tap roots penetrate tens of meters into undisturbed volcanic strata, drinking subterranean alpine snowmelt that has filtered through granite and limestone for decades.',
        'During our April expedition, we observed the local indigenous Wa and Lahu harvesters who scale these giants using hand-lashed bamboo ladders. Only the first two leaves and swelling bud are plucked. Because these ancient arbors produce leaves at an unhurried rate compared to hybridized crops, the cellular density of polyphenol compounds and soluble pectins is remarkably high.',
        'Upon cupping the freshly pan-fired sun-dried maocha in our mountain camp, the liquor manifested a luminous pale gold color. The initial cup opens with notes of wild honey, green pear skin, and camphor, followed by a profound physical resonance known in Chinese cupping as "Hou Yun" (throat resonance). Ten minutes after swallowing, a cool mint-like sweetness continuously regenerates in the salivary glands—an unmistakable signature of true ancient arbor terroir.'
      ]
    },
    {
      id: 'art-02',
      title: 'The Art of the 21-Day Shade: Why L-Theanine Demands Darkness',
      category: 'cupping',
      categoryLabel: 'Cupping Protocols',
      author: 'Kenji Hoshino',
      authorRole: '4th Generation Uji Tea Master',
      authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      date: 'April 10, 2026',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/10365503/pexels-photo-10365503.jpeg',
      badge: 'Uji Technical Dispatch',
      tags: ['Gyokuro', 'Kyoto', 'Amino Acids', 'Umami'],
      excerpt: 'When sunlight is intentionally blocked by traditional rice-straw mats (Honzu), the tea bush redirects its metabolic energy. Catechins cease synthesis, locking in colossal amounts of the amino acid L-theanine.',
      content: [
        'In late April across the rolling clay basins of Uji, Kyoto, a dramatic transformation overtakes the landscape. Farmers erect wooden scaffolding over their prized Saemidori and Gokou cultivars, draping black reed screens and rice straw mats called "Honzu" directly above the tender emerging shoots.',
        'This shading protocol, maintained for 21 to 24 consecutive days, cuts ambient solar radiation by up to 98%. Deprived of sunlight, the Camellia plant cannot convert its stored L-theanine into bitter catechins via photosynthesis. Instead, the amino acid remains locked within the cellular sap.',
        'Simultaneously, the leaves produce an explosion of chlorophyll in a desperate bid to capture any remaining photon, turning the leaves into a deep, glossy emerald jewel. The resulting brew is not merely tea; it is a savory, velvet-textured broth loaded with natural monosodium glutamate analogs and sweet glycine that calms the neurological system while elevating alpha-wave focus.'
      ]
    },
    {
      id: 'art-03',
      title: 'Longan Charcoal & Stone Ovens: 8 Hours with a Wuyi Master Roaster',
      category: 'harvest',
      categoryLabel: 'Harvest Reports',
      author: 'Sommelier Zhang Wei',
      authorRole: 'Rock Tea Specialist',
      authorImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
      date: 'March 28, 2026',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/15661867/pexels-photo-15661867.jpeg',
      badge: 'Artisan Profile',
      tags: ['Wuyi', 'Da Hong Pao', 'Charcoal Roasting', 'Yan Cha'],
      excerpt: 'Inside the subterranean curing rooms of Wuyishan, Master Chen monitors round bamboo baskets placed over smokeless Longan wood embers. Temperature control is measured not by gauges, but by the warmth felt against the forearm.',
      content: [
        'Walking into Master Chen’s roasting cellar in Wuyi Nature Reserve feels akin to entering a monastic sanctuary. The only illumination comes from circular brick pits glowing beneath a powdery coat of white rice husk ash. The fuel is strictly cured Longan fruit tree charcoal, chosen for its sustained, sweet-burning thermal stability.',
        'Over these pits, large hourglass bamboo baskets holding eight kilograms of twisted oolong leaves rest for eight to twelve hours. Every forty minutes, Master Chen shakes the baskets with rhythmic wrist movements to redistribute the leaves.',
        'The goal is the elusive "Yan Yun" or Rock Rhyme. Excessive heat burns the leaf edges, imparting bitterness; insufficient heat leaves a raw vegetal astringency. When executed with master precision, the charcoal bake caramelizes the leaf sugars into flavors of roasted hazelnut, dried dark plum, and wet volcanic stone.'
      ]
    },
    {
      id: 'art-04',
      title: 'Water Chemistry for the Connoisseur: How TDS & Mineral Hardness Shape Tannins',
      category: 'philosophy',
      categoryLabel: 'Tea Philosophy',
      author: 'Eleanor Vance',
      authorRole: 'Botanical Researcher',
      authorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      date: 'March 15, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
      badge: 'Sensory Science',
      tags: ['Water Chemistry', 'TDS', 'Extraction', 'Gyokuro'],
      excerpt: 'You can purchase a $200 tin of Grand Reserve Gyokuro, but if your water contains 250 ppm calcium bicarbonate, the liquor will be flat, dull, and murky. We break down the ideal mineral recipe for fine extraction.',
      content: [
        'Lu Yu, the eighth-century author of The Classic of Tea, wrote: "The water of the slow-moving mountain spring is superior; that of rushing rivers is secondary; that of wells is inferior." Over twelve centuries later, modern chromatography validates his empirical observation.',
        'Water accounts for more than 99% of your cup. When total dissolved solids (TDS) exceed 150 mg/L, heavy mineral ions bind with delicate polyphenols, muting floral top-notes and causing rapid clouding.',
        'For high-grade Japanese greens, we recommend a total TDS of 30 to 50 mg/L with low calcium content, allowing the broth-like umami to bloom unimpeded. For robust Wuyi rock oolongs and aged Pu-erh, a slightly higher mineral content of 70 to 90 mg/L provides the structural backbone necessary to balance intense mineral tannins.'
      ]
    },
    {
      id: 'art-05',
      title: 'In Praise of Imperfection: The Soul of Banko Purple Clay Teapots',
      category: 'ceramic',
      categoryLabel: 'Ceramic Arts',
      author: 'Chef Jean-Luc Moreau',
      authorRole: 'Gastronomy Sommelier',
      authorImg: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=200&h=200&q=80',
      date: 'March 02, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1523920290228-4f321a939b4c?auto=format&fit=crop&w=800&q=80',
      badge: 'Teaware Heritage',
      tags: ['Banko', 'Teapots', 'Kyusu', 'Ceramics'],
      excerpt: 'Handcrafted in Yokkaichi, Mie Prefecture, Banko teaware is thrown from iron-rich clay fired in a reduction kiln. As it seasons over decades of daily steeping, the interior pores memorize the oils of the leaf.',
      content: [
        'Unlike glazed porcelain that reflects tea liquor without interaction, unglazed Banko-ware is a living dialogue between earth and water. The natural clay contains up to 6% iron oxide, which chemically interacts with the astringent tannins in green tea, rounding off sharp astringency into velvety sweetness.',
        'Master potters shape each Kyusu on hand-powered wheels, fitting side-handles positioned at exactly ninety degrees to optimize the ergonomic tipping angle. The spout incorporates an integrated ceramic clay mesh (Sasame) hand-punctured with hundreds of micro-holes.',
        'With each steeping, the porous inner walls absorb trace essential oils. A Banko kyusu dedicated to single-origin Sencha for thirty years develops a subtle golden patina and will aroma-charge boiling water even before a single leaf is introduced.'
      ]
    },
    {
      id: 'art-06',
      title: 'First Flush Himalayan Fog: Why March Harvests Command Champagne Status',
      category: 'harvest',
      categoryLabel: 'Harvest Reports',
      author: 'Rajiv Sharma',
      authorRole: 'Darjeeling Estate Liaison',
      authorImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80',
      date: 'February 22, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80',
      badge: 'Alpine Almanac',
      tags: ['Darjeeling', 'First Flush', 'Muscatel', 'Himalayas'],
      excerpt: 'Perched on slopes tilting toward Kangchenjunga, Darjeeling estates awake from four months of winter dormancy. The March first flush produces an amber-gold liquor bursting with crisp muscat grape perfume.',
      content: [
        'At elevations between 1,500 and 2,200 meters in Darjeeling, tea bushes undergo a brutal winter freeze. When the spring sunshine first breaks through the mountain mist in early March, the bushes flush with sudden vigor, channeling four months of accumulated soil sugars into the initial pair of shoots.',
        'Plucked exclusively by dawn before the noon sun evaporates the volatile terpenes, the fresh leaves are lightly withered and gently rolled. Unlike heavy orthodox black teas, First Flush Darjeeling is only partially oxidized (around 40-50%), preserving crisp green floral notes alongside bright muscat grape acidity.',
        'This ephemeral seasonal harvest is auctioned at record prices across Hamburg, Tokyo, and London, rightfully preserving its century-old moniker as the undisputed Champagne of the Tea World.'
      ]
    },
    {
      id: 'art-07',
      title: 'Gongfu Cha as Active Meditation: The Architecture of Unhurried Time',
      category: 'philosophy',
      categoryLabel: 'Tea Philosophy',
      author: 'Master S. Tanaka',
      authorRole: 'Zen Aesthetics Master',
      authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      date: 'February 11, 2026',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/36940091/pexels-photo-36940091.jpeg',
      badge: 'Ceremony & Mindfulness',
      tags: ['Gongfu', 'Meditation', 'Mindfulness', 'Ritual'],
      excerpt: 'Gongfu Cha—literally "tea made with disciplined effort"—is not about rigid dogmatic rules. It is an intentional slowing down of perception, anchoring the wandering mind in sound, aroma, and temperature.',
      content: [
        'In our hyper-connected, hyper-accelerated existence, the Gongfu tea tray represents an inviolable sanctuary of stillness. Here, there are no notifications, no algorithmic feeds, no rushed transactions.',
        'To brew Gongfu style is to pay rigorous attention: listening to the sound of boiling water transitioning from "shrimp eyes" to "crab eyes" bubbles; feeling the radiant warmth of the porcelain gaiwan rim; watching the curled dry pearls slowly stretch and uncoil across eight successive steeps.',
        'Each steep reveals a distinct chapter in the leaf’s autobiography. The first infusion offers aromatics; the third offers body and mineral structure; the sixth reveals pure subterranean sweetness. In this quiet ritual, one rediscovers the art of dwelling wholly in the present moment.'
      ]
    },
    {
      id: 'art-08',
      title: 'The Solar Calendar & The 24 Terms: How Seasonal Nodes Govern Leaf Plucking',
      category: 'almanac',
      categoryLabel: 'Harvest Almanac',
      author: 'Verdant Agronomy Council',
      authorRole: 'Botanical Research Team',
      authorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      date: 'January 29, 2026',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/34928366/pexels-photo-34928366.jpeg',
      badge: 'Almanac Archives',
      tags: ['Solar Terms', 'Pre-Qingming', 'Guyu', 'Agro-Forestry'],
      excerpt: 'For over two thousand years, Asian agricultural societies divided the solar year into 24 astronomical nodes. In high tea culture, harvesting just three days before or after Qingming radically alters the market value and mouthfeel.',
      content: [
        'The astronomical solar terms "Qingming" (Pure Brightness, early April) and "Guyu" (Grain Rain, late April) demarcate the holy grail of whole-leaf harvesting. Leaves plucked prior to Qingming (Mingqian) have endured chilly spring nights with minimal insect predation, yielding buds loaded with sweet theanine and tender downy fuzz.',
        'Once Grain Rain passes and summer heat sets in, the plant grows rapidly, accumulating coarser fibrous cellulose and higher bitter polyphenols suited for dark oolong baking or long-term microbial Pu-erh pressing.',
        'By coordinating our harvesting contracts directly with the astronomical solar nodes rather than calendar months, Verdant guarantees that every tin in our vault reflects the pristine peak of its terroir window.'
      ]
    }
  ];

  let currentCategory = 'all';
  let searchQuery = '';

  function initBlog() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;

    // Filter Buttons
    const filterBtns = document.querySelectorAll('.blog-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-stone-900', 'text-stone-50', 'dark:bg-stone-100', 'dark:text-stone-900', 'font-semibold');
          b.classList.add('bg-stone-100', 'text-stone-700', 'dark:bg-stone-800', 'dark:text-stone-300');
        });
        btn.classList.remove('bg-stone-100', 'text-stone-700', 'dark:bg-stone-800', 'dark:text-stone-300');
        btn.classList.add('bg-stone-900', 'text-stone-50', 'dark:bg-stone-100', 'dark:text-stone-900', 'font-semibold');

        currentCategory = btn.getAttribute('data-category');
        renderBlogGrid();
      });
    });

    // Live Search Input
    const searchInput = document.getElementById('blogSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderBlogGrid();
      });
    }

    // Modal close listeners
    const modalCloseBtn = document.getElementById('closeBlogModalBtn');
    const modalBackdrop = document.getElementById('blogReaderBackdrop');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeBlogReader);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeBlogReader);

    // Initial render
    renderBlogGrid();
  }

  function renderBlogGrid() {
    const grid = document.getElementById('blogGrid');
    const countEl = document.getElementById('blogCountDisplay');
    if (!grid) return;

    let filtered = blogArticles.filter(art => {
      // Exclude featured cover from secondary grid if all selected, or keep all
      const matchesCategory = (currentCategory === 'all') || (art.category === currentCategory);
      const matchesSearch = !searchQuery || 
        art.title.toLowerCase().includes(searchQuery) ||
        art.excerpt.toLowerCase().includes(searchQuery) ||
        art.author.toLowerCase().includes(searchQuery) ||
        art.tags.some(t => t.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    });

    if (countEl) {
      countEl.textContent = `Displaying ${filtered.length} of ${blogArticles.length} Editorial Dispatches`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center border border-dashed border-stone-300 dark:border-stone-700 p-8">
          <p class="font-serif text-xl mb-2 text-stone-800 dark:text-stone-200">No dispatches match your query.</p>
          <p class="text-xs text-stone-500 dark:text-stone-400 font-mono mb-4">Try clearing the search query or choosing another editorial column.</p>
          <button type="button" onclick="document.getElementById('blogSearchInput').value=''; document.querySelector('.blog-filter-btn[data-category=\\'all\\']').click();" class="px-5 py-2.5 bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-xs uppercase tracking-wider font-semibold">
            Reset Filters
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <article class="bg-[#FAF9F5] dark:bg-[#0B120E] border border-stone-200 dark:border-stone-800 flex flex-col group h-full transition-all hover:border-stone-400 dark:hover:border-stone-600">
        
        <!-- Image & Category Badge -->
        <div class="relative aspect-[16/10] overflow-hidden bg-stone-200 dark:bg-stone-800 shrink-0">
          <img src="${item.image}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute top-3 left-3">
            <span class="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900">
              ${item.categoryLabel}
            </span>
          </div>
          <span class="absolute bottom-3 right-3 px-2 py-0.5 text-xs font-mono bg-stone-950/80 text-stone-100">
            ${item.readTime}
          </span>
        </div>

        <!-- Article Content -->
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div class="flex-1 flex flex-col">
            <div class="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2 font-mono">
              <span>${item.date}</span>
              <span>&bull; ${item.author}</span>
            </div>

            <h3 class="text-lg font-serif font-semibold mb-2.5 line-clamp-2 min-h-[3.25rem] flex items-center">
              ${item.title}
            </h3>

            <p class="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed mb-4 flex-1">
              ${item.excerpt}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-5 shrink-0">
              ${item.tags.map(tag => `
                <span class="px-2 py-0.5 text-[10px] font-mono uppercase bg-stone-200/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300">
                  #${tag}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Bottom Action -->
          <div class="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 mt-auto shrink-0">
            <span class="text-xs text-stone-500 dark:text-stone-400 font-mono">${item.badge}</span>
            <button type="button" onclick="window.openBlogReader('${item.id}')" class="px-4 py-2 bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-[11px] font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity">
              Read Essay &rarr;
            </button>
          </div>
        </div>

      </article>
    `).join('');
  }

  // Window Reader Modal
  window.openBlogReader = function (id) {
    const article = blogArticles.find(a => a.id === id);
    if (!article) return;

    const modal = document.getElementById('blogReaderModal');
    const backdrop = document.getElementById('blogReaderBackdrop');
    const body = document.getElementById('blogReaderContent');
    if (!modal || !backdrop || !body) return;

    body.innerHTML = `
      <div class="space-y-6">
        
        <!-- Header Category & Meta -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900">
              ${article.categoryLabel}
            </span>
            <span class="text-xs font-mono text-stone-500 dark:text-stone-400">&bull; ${article.readTime}</span>
          </div>
          <span class="text-xs font-mono text-stone-500 dark:text-stone-400">${article.date}</span>
        </div>

        <!-- Title -->
        <h1 class="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
          ${article.title}
        </h1>

        <!-- Author Byline -->
        <div class="flex items-center gap-3.5 p-3.5 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <img src="${article.authorImg}" alt="${article.author}" class="w-11 h-11 rounded-full object-cover border border-stone-300 dark:border-stone-700" />
          <div class="text-xs">
            <span class="font-bold text-stone-900 dark:text-stone-100 block">${article.author}</span>
            <span class="text-stone-500 dark:text-stone-400 font-mono">${article.authorRole}</span>
          </div>
        </div>

        <!-- Featured Media -->
        <div class="relative aspect-[16/9] overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-800">
          <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover" />
          <div class="absolute bottom-3 left-3 px-3 py-1 bg-stone-950/85 text-stone-100 text-[11px] font-mono">
            Verdant Field Photography &bull; Spring 2026 Archive
          </div>
        </div>

        <!-- Excerpt Lead -->
        <p class="text-base sm:text-lg font-serif italic text-stone-800 dark:text-stone-200 border-l-4 border-stone-900 dark:border-stone-100 pl-4 py-1 leading-relaxed">
          "${article.excerpt}"
        </p>

        <!-- Essay Paragraphs -->
        <div class="space-y-4 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
          ${article.content.map(p => `<p>${p}</p>`).join('')}
        </div>

        <!-- Footnote & Tags -->
        <div class="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap gap-2">
            ${article.tags.map(t => `
              <span class="px-2.5 py-1 text-xs font-mono uppercase bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                #${t}
              </span>
            `).join('')}
          </div>
          <div class="flex items-center gap-3">
            <button type="button" onclick="window.closeBlogReader()" class="px-5 py-2.5 border border-stone-300 dark:border-stone-700 text-xs uppercase tracking-wider font-semibold hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors">
              Close Reader
            </button>
            <a href="products.html" class="px-5 py-2.5 bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity">
              Explore Vault Blends &rarr;
            </a>
          </div>
        </div>

      </div>
    `;

    modal.classList.remove('hidden');
    backdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeBlogReader = function () {
    const modal = document.getElementById('blogReaderModal');
    const backdrop = document.getElementById('blogReaderBackdrop');
    if (modal) modal.classList.add('hidden');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  };

  document.addEventListener('DOMContentLoaded', initBlog);
})();
