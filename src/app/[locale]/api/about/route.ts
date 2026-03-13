import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const defaultAboutData = {
  heroTitle: 'About Buy from Africa',
  heroDescription: 'Connecting African businesses to global markets, empowering economic growth, and showcasing the richness of African products.',
  heroCTA: 'Explore Our Vendors',
  storyTitle: 'Our Story',
  storyContent: 'Buy from Africa was founded in 2023 with a vision to transform how the world discovers and accesses African products. Our founder, Sarah Johnson, spent over a decade working across various African nations, witnessing firsthand the incredible quality and diversity of products that struggled to reach international markets.\n\nWhat began as a small platform featuring just 20 vendors has grown into Africa\'s leading marketplace connecting thousands of verified businesses with buyers worldwide. We\'ve helped vendors increase their export revenue by an average of 40% while ensuring their goods reach markets previously inaccessible to them.\n\nToday, we operate in 15 African countries with plans to expand across the entire continent, continuing our mission to showcase African entrepreneurship and craftsmanship to the world.',
  missionTitle: 'Our Mission',
  missionDescription: 'Buy from Africa exists to bridge the gap between African businesses and global markets, creating opportunities for sustainable growth and international trade.',
  missionPoints: [
    { icon: 'Globe', title: 'Connect', description: 'Connecting African vendors to global buyers, creating a digital marketplace that transcends geographical boundaries.' },
    { icon: 'TrendingUp', title: 'Empower', description: 'Empowering African businesses with the tools, visibility, and market access they need to scale and thrive globally.' },
    { icon: 'Heart', title: 'Sustain', description: 'Promoting sustainable business practices, fair trade, and ethical production across the African supply chain.' }
  ],
  teamDescription: 'Led by passionate experts with deep roots in Africa, our diverse team brings together experience in technology, international trade, and supply chain management.',
  teamMembers: [
    { name: 'Sarah Johnson', role: 'Founder & CEO', bio: 'Sarah founded Buy from Africa after a decade working in international development across various African nations. She holds an MBA from Harvard Business School and is passionate about economic empowerment through trade.', image: '/images/team/sarah-johnson.jpg' },
    { name: 'Daniel Okafor', role: 'CTO', bio: 'Daniel leads our technology team with 15+ years of experience building scalable platforms. Previously at Amazon and Microsoft, he returned to his native Nigeria to help build technology that empowers African businesses.', image: '/images/team/daniel-okafor.jpg' },
    { name: 'Amina Diallo', role: 'Chief Operating Officer', bio: 'With extensive experience in logistics and supply chain management across West Africa, Amina ensures our platform operates efficiently and vendors can deliver on their promises.', image: '/images/team/amina-diallo.jpg' }
  ],
  partnersDescription: 'We collaborate with leading organizations committed to African economic development and international trade.',
  partners: [
    { name: 'African Development Bank', logo: '/images/partners/afdb.png' },
    { name: 'World Trade Organization', logo: '/images/partners/wto.png' },
    { name: 'African Export-Import Bank', logo: '/images/partners/afrexim.png' },
    { name: 'Microsoft', logo: '/images/partners/microsoft.png' },
    { name: 'USAID', logo: '/images/partners/usaid.png' },
    { name: 'African Union', logo: '/images/partners/au.png' }
  ],
  impactTitle: 'Our Impact',
  impactDescription: 'Buy from Africa is transforming African commerce, creating real economic opportunities and connecting cultures through trade.',
  impactStats: [
    { value: '1,500+', label: 'Verified Vendors' },
    { value: '15', label: 'African Countries' },
    { value: '$12M+', label: 'Revenue Generated' },
    { value: '40%', label: 'Average Vendor Growth' }
  ],
  countriesTitle: 'Where We Work',
  countriesDescription: 'We are actively connecting vendors and buyers across these African countries, with plans to expand our reach throughout the continent.',
  countries: [
    'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Ethiopia', 
    'Morocco', 'Egypt', 'Tanzania', 'Senegal', 'Rwanda',
    'Uganda', 'Cameroon', 'Ivory Coast', 'Zambia', 'Angola'
  ]
};

export async function GET() {
  try {
    // Try to fetch from database
    try {
      const aboutPage = await prisma.aboutPage.findUnique({
        where: { id: 'singleton' }
      });

      if (aboutPage) {
        return NextResponse.json(aboutPage);
      }
    } catch {
      // Model might not exist, return defaults
    }

    return NextResponse.json(defaultAboutData);
  } catch (error) {
    console.error('Error fetching about page data:', error);
    return NextResponse.json(defaultAboutData);
  }
}
