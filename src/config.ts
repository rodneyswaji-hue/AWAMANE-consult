export const SITE = {
  name: 'Awamane Consult Ltd',
  shortName: 'Awamane Consult',
  tagline: 'Environment. Community. Sustainability.',
  description:
    'Awamane Consult Ltd is a Kenyan agricultural consultancy led by Prof. Titus Ikusya Kanui — providing evidence-based advice on crops and soil management, livestock production, water and land management, and farmer training.',
  url: 'https://awamaneconsult.co.ke',
  location: 'Kyevaluki, Machakos County, Kenya',
  locality: 'Kyevaluki',
  region: 'Machakos County',
  country: 'Kenya',
  // PLACEHOLDER contact details — to be replaced before launch
  phone: '+254 700 000 000',
  phoneHref: 'tel:+254700000000',
  email: 'info@awamaneconsult.co.ke',
  emailHref: 'mailto:info@awamaneconsult.co.ke',
  linkedin: 'https://www.linkedin.com/in/titus-kanui-9b3018163',
  foundingYear: 2020,
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Crops & Soil', href: '/services/crops-and-soil' },
      { label: 'Livestock', href: '/services/livestock' },
      { label: 'Water & Land', href: '/services/water-and-land-management' },
    ],
  },
  { label: 'Training', href: '/training' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
