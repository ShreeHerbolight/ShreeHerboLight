export const navLinks = [
  { label: 'All Products', href: '/shop' },
  { 
    label: 'Agarbatti', 
    href: '/category/agarbatti',
    mega: {
      columns: [
        { 
          title: 'Types', 
          links: [
            { label: 'Vasthu Agarbathi', href: '/category/vasthu' },
            { label: 'Herbal Agarbathi', href: '/category/herbal' }
          ] 
        },
        { 
          title: 'Specials', 
          links: [
            { label: 'Pack of 6', href: '/category/agarbatti' },
            { label: 'Pack of 12', href: '/category/agarbatti' }
          ] 
        }
      ],
      image: '/images/herbal_agarbathi_category_1777263501880.png'
    }
  },
  { 
    label: 'Pooja Essentials', 
    href: '/category/pooja-essentials',
    mega: {
      columns: [
        { 
          title: 'Sacred Rituals', 
          links: [
            { label: 'Camphor', href: '/category/camphor' },
            { label: 'Cup Sambrani', href: '/category/pooja-essentials' },
            { label: 'Agal Vilaku', href: '/category/gift-packs' }
          ] 
        },
        { 
          title: 'Sacred Powders', 
          links: [
            { label: 'Viboothi Powder', href: '/category/pooja-essentials' },
            { label: 'Kumkum Powder', href: '/category/pooja-essentials' },
            { label: 'Cowdung Powder', href: '/category/pooja-essentials' }
          ] 
        }
      ],
      image: '/images/panchakavya_products_category_1777263520616.png'
    }
  },
  { 
    label: 'Personal Care', 
    href: '/category/personal-care',
    mega: {
      columns: [
        { 
          title: 'Skin Care', 
          links: [
            { label: 'Herbal Facewash', href: '/category/face-wash' },
            { label: 'Herbal Face Gel', href: '/category/face-gel' },
            { label: 'Rose Water', href: '/category/rose-water' }
          ] 
        },
        { 
          title: 'Body & Oils', 
          links: [
            { label: 'Herbal Body Wash', href: '/category/body-wash' },
            { label: 'Herbal Body Lotion', href: '/category/body-lotion' },
            { label: 'Essential Oil', href: '/category/essential-oil' }
          ] 
        }
      ],
      image: '/images/body_wash_category_1777263606152.png'
    }
  },
  { label: 'Gifting', href: '/category/gift-packs' },
  { label: 'Success Story', href: '/success-story' },
]

export const slides = [
  { id: 1, image: '/images/hero1.jpeg', bg: '#fdfaf6' },
  { id: 2, image: '/images/hero2.jpeg', bg: '#f0fcf4' },
  { id: 3, image: '/images/hero3.jpeg', bg: '#fff5ee' },
]

export const products = []

export const features = [
  { icon: 'Sprout', title: '100% Natural', desc: 'Derived from pure herbal extracts and Panchakavya ingredients. Zero synthetics.' },
  { icon: 'Hand', title: 'Artisan Crafted', desc: 'Traditional hand-rolling methods preserved across generations for authenticity.' },
  { icon: 'ShieldCheck', title: 'Lab Verified', desc: 'Rigorously tested to ensure zero toxic charcoal or harmful chemicals.' },
  { icon: 'Home', title: 'Spiritual Purity', desc: 'Crafted with devotion from Dindigul, Tamil Nadu to enhance your sacred rituals.' },
]

export const testimonials = [
  { name: 'Priya R.', text: 'The Jungle of Woods agarbatti is simply divine. My home smells like a sacred forest every morning.', stars: 5, initials: 'PR', color: '#2e7d32' },
  { name: 'Meenakshi S.', text: 'I have been using Sree HerboLight Sambrani cups for 3 years. Nothing compares — completely natural and long lasting.', stars: 5, initials: 'MS', color: '#76b82a' },
  { name: 'Karthik N.', text: 'The Dhristi camphor burns so clean without any black smoke. Best quality camphor I have ever used.', stars: 5, initials: 'KN', color: '#2d5a27' },
  { name: 'Deepa V.', text: 'Gifted the Pooja Essentials box to my parents for Diwali. They absolutely loved every product inside!', stars: 5, initials: 'DV', color: '#e84118' },
]

export const footerLinks = {
  'Quick Links': ['Shop All', 'Agarbatti', 'Pooja Essentials', 'Personal Care', 'Gifting'],
  'Information': ['Success Story', 'My Orders', 'Wholesale Inquiry', 'Shipping Policy', 'Contact Us'],
}
