const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  // ── VASTHU HERBAL AGARBATHIES (9) ──────────────────────────────
  { 
    name: 'ABSOLUTE SANDAL FRAGRANCE PANCHAKAVYA HERBAL VASTHU AGARBATHIES',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'vasthu',
    price: 90, originalPrice: 150, rating: 4.9, bg: '#fdf8f0', icon: 'Sun', featured: true, badge: 'Popular',
    desc: 'Experience the enchanting aroma of Absolute Sandal Fragrance Panchakavya Herbal Vasthu Agarbathies. Crafted with a blend of traditional herbs and natural ingredients, these agarbathies create a soothing and calming atmosphere in your space.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'BOUQUET OF MYSTIC FLOWERS PANCHAKAVYA HERBAL VASTHU AGARBATHIES',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'vasthu',
    price: 90, rating: 4.8, bg: '#f0fdf4', icon: 'Flower2',
    desc: 'Experience the enchanting aroma of the Bouquet of Mystic Flowers Panchakavya Herbal Vasthu Agarbathies.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'Clear Rose Fragrance Panchakavya Herbal Vasthu Agarbathies',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'vasthu',
    price: 90, originalPrice: 120, badge: 'BestSeller', featured: true, rating: 4.9, bg: '#fff5f5', icon: 'Heart',
    desc: 'Experience the enchanting aroma of Clear Rose Fragrance Panchakavya Herbal Vasthu Agarbathies.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'JASMINE FRAGRANCE PANCHAKAVYA HERBAL VASTHU AGARBATHIES',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'vasthu',
    price: 90, rating: 4.7, bg: '#f0faf3', icon: 'Leaf', featured: true, badge: 'New',
    desc: 'Experience the enchanting aroma of Jasmine with our Panchakavya Herbal Vasthu Agarbathies.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'LILAC LAVENDAR PANCHAKAVYA HERBAL VASTHU AGARBATHIES',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'vasthu',
    price: 90, rating: 4.8, bg: '#f5f0fb', icon: 'Sparkles',
    desc: 'LILAC LAVENDAR PANCHAKAVYA HERBAL VASTHU AGARBATHIES offer a unique aromatic experience.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'ORANGE FRAGRANCE PANCHAKAVYA HERBAL VASTHU AGARBATHIES',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'vasthu',
    price: 90, rating: 4.6, bg: '#fff9f0', icon: 'Citrus',
    desc: 'Experience the enchanting aroma of our Orange Fragrance Panchakavya Herbal Vasthu Agarbathies.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'Giggling of Herbs Panchakavya Herbal Vasthu Agarbathies',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'vasthu',
    price: 90, rating: 4.7, bg: '#f0faf3', icon: 'Leaf',
    desc: 'A refreshing blend of traditional herbs for a peaceful environment.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'Little Lavender Panchakavya Herbal Vasthu Agarbathies',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'vasthu',
    price: 90, rating: 4.8, bg: '#f5f0fb', icon: 'Sparkles',
    desc: 'Soothing lavender scent mixed with the purity of Panchakavya.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'PANCHAKAVYA HERBAL VASTHU AGARBATHIES (PACK OF 6 )',
    category: 'Gifting', catId: 'gift-packs', subCatId: 'agarbatti',
    price: 540, originalPrice: 750, badge: 'Pack of 6', rating: 5.0, bg: '#f3faf0', icon: 'Package', featured: true,
    desc: 'Panchakavya Herbal Vasthu Agarbathies are crafted from a unique blend of natural ingredients, designed to enhance the ambiance of any space.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },

  // ── POOJA PRODUCTS (10) ─────────────────────────────────────────
  { 
    name: 'DHRISTI CAMPHOR 45 Tablets',
    category: 'Pooja Essentials', catId: 'pooja-essentials', subCatId: 'camphor',
    price: 60, originalPrice: 90, badge: 'BestSeller', featured: true, rating: 4.9, bg: '#ffffff', icon: 'Sparkles',
    desc: 'DHRISTI CAMPHOR 45 Tablets are a traditional pooja product designed to enhance your spiritual rituals.',
    image: '/images/camphor_category_1777263590488.png'
  },
  { 
    name: 'POOJA NORMAL CAMPHORS 25g',
    category: 'Pooja Essentials', catId: 'pooja-essentials', subCatId: 'camphor',
    price: 60, rating: 4.7, bg: '#ffffff', icon: 'Sparkles',
    desc: 'POOJA NORMAL CAMPHORS 25g is a high-quality product designed for various rituals.',
    image: '/images/camphor_category_1777263590488.png'
  },
  { 
    name: 'Herbal Cowdung Powder For Pooja 100g',
    category: 'Pooja Essentials', catId: 'pooja-essentials',
    price: 36, rating: 4.6, bg: '#f9fdf9', icon: 'Leaf',
    desc: 'Natural and eco-friendly product designed to enhance your spiritual rituals.',
    image: '/images/panchakavya_products_category_1777263520616.png'
  },
  { 
    name: 'Herbal Kumkum Powder',
    category: 'Pooja Essentials', catId: 'pooja-essentials',
    price: 30, rating: 4.8, bg: '#fff5f5', icon: 'Heart',
    desc: 'Vibrant and traditional offering used in various pooja rituals.',
    image: '/images/panchakavya_products_category_1777263520616.png'
  },
  { 
    name: '23 Herbal Viboothi Powder',
    category: 'Pooja Essentials', catId: 'pooja-essentials',
    price: 30, rating: 4.9, bg: '#f8f8f8', icon: 'Wind', featured: true,
    desc: 'Introducing our 23 Herbal Viboothi Powder, a unique blend crafted for your pooja rituals.',
    image: '/images/panchakavya_products_category_1777263520616.png'
  },
  { 
    name: 'PANCHAKAVYAM LIQUID 100ml',
    category: 'Pooja Essentials', catId: 'pooja-essentials',
    price: 68, originalPrice: 99, rating: 4.9, bg: '#f3faf0', icon: 'Droplets', featured: true,
    desc: 'Panchakavyam is a liquid made up of 5 ingredients including cow\'s milk and gomyam.',
    image: '/images/panchakavya_products_category_1777263520616.png'
  },
  { 
    name: '23 HERBAL LAKSHMI VASYA DHOOP POWDER 100g',
    category: 'Pooja Essentials', catId: 'pooja-essentials',
    price: 78, rating: 4.8, bg: '#f7f5f0', icon: 'Wind', featured: true,
    desc: 'Panchakavya Herbal Dhoop Powder is a unique blend crafted from traditional ingredients.',
    image: '/images/panchakavya_products_category_1777263520616.png'
  },
  { 
    name: 'PANCHAKAVYA HERBAL AGAL VILAKU',
    category: 'Gifting', catId: 'gift-packs', subCatId: 'pooja-essentials',
    price: 75, originalPrice: 120, badge: '38% OFF', featured: true, rating: 4.5, bg: '#fdf2f2', icon: 'Flame',
    desc: 'Panchakavya Herbal Agal Vilaku is a unique and traditional product crafted from Panchakavya.',
    image: '/images/combos_category.png'
  },
  { 
    name: 'PANCHAKAVYA HERBAL CUP SAMBRANI',
    category: 'Pooja Essentials', catId: 'pooja-essentials',
    price: 120, originalPrice: 180, badge: 'BestSeller', featured: true, rating: 4.9, bg: '#f4fbf4', icon: 'Flame',
    desc: 'Panchakavya Herbal Cup Sambrani is a unique and traditional product crafted from a blend of five sacred ingredients.',
    image: '/images/panchakavya_products_category_1777263520616.png'
  },
  { 
    name: 'PANCHAKAVYA DHOOP STICKS',
    category: 'Pooja Essentials', catId: 'pooja-essentials',
    price: 60, rating: 4.7, bg: '#f7f5f0', icon: 'Wind', featured: true,
    desc: 'Panchakavya Dhoop Sticks are crafted using a traditional blend of five sacred ingredients.',
    image: '/images/panchakavya_products_category_1777263520616.png'
  },

  // ── PERSONAL CARE (12) ──────────────────────────────────────────
  { 
    name: 'Pure Aloe Vera Gel 50g',
    category: 'Personal Care', catId: 'personal-care', subCatId: 'face-gel',
    price: 180, rating: 4.8, bg: '#f1f9f1', icon: 'Leaf', featured: true, badge: 'Organic',
    desc: 'Pure Aloe Vera Gel 50g is a versatile herbal face gel.',
    image: '/images/body_wash_category_1777263606152.png'
  },
  { 
    name: 'Saffron Face Gel 50g',
    category: 'Personal Care', catId: 'personal-care', subCatId: 'face-gel',
    price: 180, originalPrice: 250, rating: 4.9, bg: '#fffbf0', icon: 'Sun', featured: true, badge: 'Luxury',
    desc: 'Experience the luxurious touch of Saffron Face Gel.',
    image: '/images/body_wash_category_1777263606152.png'
  },
  { 
    name: 'Saffron Body Wash 100ml',
    category: 'Personal Care', catId: 'personal-care', subCatId: 'body-wash',
    price: 240, originalPrice: 300, rating: 4.8, bg: '#fffbf0', icon: 'Sun', featured: true,
    desc: 'Experience the luxurious essence of nature with our Saffron Body Wash.',
    image: '/images/body_wash_category_1777263606152.png'
  },
  { 
    name: 'Avocado and Jojoba Body Lotion 100ml',
    category: 'Personal Care', catId: 'personal-care', subCatId: 'body-lotion',
    price: 400, rating: 4.9, bg: '#f1f9f1', icon: 'Heart', featured: true,
    desc: 'Indulge your skin with our Avocado and Jojoba Body Lotion.',
    image: '/images/body_wash_category_1777263606152.png'
  },
  { 
    name: 'Sunscreen 100g',
    category: 'Personal Care', catId: 'personal-care', subCatId: 'face-gel',
    price: 400, rating: 4.6, bg: '#fffbf0', icon: 'Sun', featured: true, badge: 'UV Protect',
    desc: 'Experience the nourishing power of our Herbal sunscreen.',
    image: '/images/body_wash_category_1777263606152.png'
  },
  { 
    name: 'SREE HERBOLIGHT ROSE WATER 100ML',
    category: 'Personal Care', catId: 'personal-care', subCatId: 'rose-water',
    price: 30, rating: 4.8, bg: '#fff5f8', icon: 'Flower2', featured: true,
    desc: 'Experience the soothing essence of our Rose Water.',
    image: '/images/rose_water_category_1777263539013.png'
  },
  { 
    name: 'SREE HERBOLIGHT ROSE WATER 1 LITRE',
    category: 'Personal Care', catId: 'personal-care', subCatId: 'rose-water',
    price: 120, originalPrice: 180, rating: 4.9, bg: '#fff5f8', icon: 'Flower2', featured: true,
    desc: 'Invigorate, refresh and cleanse your skin with the goodness of natural rose extracts!',
    image: '/images/rose_water_category_1777263539013.png'
  },
  { 
    name: 'Avocado and Jojoba Facewash 100ml',
    category: 'Personal Care', catId: 'personal-care', subCatId: 'face-wash',
    price: 220, originalPrice: 280, rating: 4.8, bg: '#f1f9f1', icon: 'Heart', featured: true,
    desc: 'Experience the refreshing cleansing power of Suro Naturals Avocado and Jojoba Facewash.',
    image: '/images/body_wash_category_1777263606152.png'
  },
  { 
    name: 'Carrot Root Oil 100ml',
    category: 'Personal Care', catId: 'personal-care', subCatId: 'essential-oil',
    price: 400, rating: 4.9, bg: '#fffbf0', icon: 'Droplet', featured: true,
    desc: 'Carrot Root Oil is a premium herbal essential oil.',
    image: '/images/body_wash_category_1777263606152.png'
  },
  { 
    name: 'Neem & Aloe Body Wash',
    category: 'Personal Care', catId: 'personal-care', subCatId: 'body-wash',
    price: 240, rating: 4.7, bg: '#f1f9f1', icon: 'Leaf',
    desc: 'Antibacterial neem mixed with soothing aloe vera.',
    image: '/images/body_wash_category_1777263606152.png'
  },
  { 
    name: 'Lavender Face Wash',
    category: 'Personal Care', catId: 'personal-care', subCatId: 'face-wash',
    price: 220, rating: 4.8, bg: '#f5f0fb', icon: 'Sparkles',
    desc: 'Calming lavender face wash for sensitive skin.',
    image: '/images/body_wash_category_1777263606152.png'
  },
  { 
    name: 'Hibiscus Glow Lotion',
    category: 'Personal Care', catId: 'personal-care', subCatId: 'body-lotion',
    price: 350, rating: 4.6, bg: '#fff5f5', icon: 'Heart',
    desc: 'Radiance boosting lotion with hibiscus extract.',
    image: '/images/body_wash_category_1777263606152.png'
  },

  // ── HERBAL AGARBATHIES & OTHERS (8) ──────────────────────────
  { 
    name: 'JUNGLE OF WOODS FRAGRANCE PANCHAKAVYA HERBAL AGARBATHIES',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'herbal',
    price: 90, rating: 4.9, bg: '#f3faf0', icon: 'Leaf', featured: true,
    desc: 'Experience the enchanting aroma of Jungle of Woods.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'MOSQUITO INCENSE PANCHAKAVYA HERBAL AGARBATHIES (Pack Of 12)',
    category: 'Gifting', catId: 'gift-packs', subCatId: 'herbal',
    price: 180, originalPrice: 240, badge: 'Pack of 12', rating: 4.7, bg: '#f0faf3', icon: 'Shield', featured: true,
    desc: 'Experience the natural essence of Panchakavya with our Mosquito Incense.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'Sree Herbolight Panjakaviya Agarbathies 9 inch Pack Of 12',
    category: 'Gifting', catId: 'gift-packs', subCatId: 'herbal',
    price: 180, originalPrice: 240, badge: 'Pack of 12', rating: 4.8, bg: '#f3faf0', icon: 'Wind',
    desc: 'Sree HERBOLIGHT Herbal Agarbathies come in a convenient pack of 12.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'Rose Herbal Agarbathies',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'herbal',
    price: 80, rating: 4.9, bg: '#fff5f8', icon: 'Flower2',
    desc: 'Pure rose fragrance made with natural herbs.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'Sandal Herbal Agarbathies',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'herbal',
    price: 85, rating: 4.9, bg: '#fffbf0', icon: 'Sun',
    desc: 'Traditional sandalwood scent for long-lasting freshness.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'Vetiver Herbal Agarbathies',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'herbal',
    price: 90, rating: 4.7, bg: '#f3faf0', icon: 'Leaf',
    desc: 'Cooling vetiver fragrance for a relaxed atmosphere.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'Tulsi Herbal Agarbathies',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'herbal',
    price: 80, rating: 4.8, bg: '#f0faf3', icon: 'Leaf',
    desc: 'Purifying tulsi scent for your daily prayers.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  },
  { 
    name: 'Patchouli Herbal Agarbathies',
    category: 'Agarbatti', catId: 'agarbatti', subCatId: 'herbal',
    price: 95, rating: 4.6, bg: '#f7f5f0', icon: 'Wind',
    desc: 'Earthy patchouli fragrance for meditation and peace.',
    image: '/images/herbal_agarbathi_category_1777263501880.png'
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for FULL CATALOG RESTORATION...');

    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`🚀 SUCCESSFULLY RESTORED ALL ${products.length} PRODUCTS TO THE DATABASE!`);

    mongoose.connection.close();
    console.log('👋 Migration complete.');
  } catch (err) {
    console.error('❌ Migration error:', err);
    process.exit(1);
  }
}

seedDB();
