import { FileInput, Settings, Sparkles, Download, Instagram } from 'lucide-react';
import check from '../assets/check.png';
import { Mail, Twitter, Linkedin, Github } from 'lucide-react';

  export const steps = [
    {
      icon: FileInput,
      number: '01',
      title: 'Local Context Understanding',
      description: 'Our AI understands the unique challenges, opportunities, and cultural nuances of doing business across African markets.'
    },
    {
      icon: Settings,
      number: '02', 
      title: 'Select Tools & Templates',
      description: 'Choose from pitch decks, financial models, resumes, or accelerator applications.'
    },
    {
      icon: Sparkles,
      number: '03',
      title: 'Get AI-Generated Results',
      description: 'Our AI creates professional, investor-ready materials tailored to your startup.'
    },
    {
      icon: Download,
      number: '04',
      title: 'Edit, Export & Pitch',
      description: 'Customize the output, export in multiple formats, and start pitching to investors.'
    }
  ];


  export const benefits = [
    {
      icon: check,
      title: 'Built for African Founders',
      description: 'Understand the unique challenges and opportunities in African markets with culturally relevant templates and guidance.'
    },
    {
      icon: check,
      title: 'No Design Skills Needed',
      description: 'Professional-quality materials without hiring expensive designers or learning complex software.'
    },
    {
      icon: check,
      title: 'Save Hours of Manual Work',
      description: 'What used to take weeks of preparation now takes minutes with our AI-powered automation.'
    },
  ];


  export const faqs = [
    {
      question: 'Is GidiPitch free to use?',
      answer: 'Yes! We offer a free tier that includes basic pitch deck generation and limited financial forecasting. Our premium plans unlock advanced features like unlimited exports, custom branding, and priority support.'
    },
    {
      question: 'Can I edit the generated pitch deck?',
      answer: 'Absolutely! All generated content is fully editable. You can modify text, add your own images, adjust layouts, and customize the design to match your brand. Export to PowerPoint, PDF, or continue editing in our platform.'
    },
    {
      question: 'Will this work for my specific industry?',
      answer: 'GidiPitch works across all industries - from fintech and healthtech to agriculture and e-commerce. Our AI is trained on successful pitch decks from various African sectors and adapts content to your specific market and business model.'
    },
    {
      question: 'Can I apply to Y Combinator with materials from GidiPitch?',
      answer: 'Yes! Our YC Assistant specifically helps you prepare application materials that meet Y Combinator\'s requirements. Many of our users have successfully applied to top accelerators using GidiPitch-generated content.'
    },
    {
      question: 'How accurate are the financial forecasts?',
      answer: 'Our financial models are based on industry benchmarks and best practices for startup projections. While we provide solid foundations, we always recommend reviewing numbers with a financial advisor or mentor familiar with your specific market.'
    },
    {
      question: 'Do you offer support for teams?',
      answer: 'Yes! Our team plans include collaboration features, shared workspaces, and dedicated account management. We also offer training sessions for accelerators and incubators working with multiple startups.'
    }
  ];

  export const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Templates', href: '#templates' },
      { name: 'Demo', href: '#demo' }
    ],
    resources: [
      { name: 'Documentation', href: '#docs' },
      { name: 'Blog', href: '#blog' },
      { name: 'Success Stories', href: '#stories' },
      { name: 'Help Center', href: '#help' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' },
      { name: 'Partners', href: '#partners' }
    ]
  };

export const socialLinks = [
  { icon: Twitter, href: 'https://x.com/gidipitch', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Pharkman/gidi-pitch-glow-up', label: 'GitHub' },
  { icon: Instagram, href: 'https://www.instagram.com/gidipitch/', label: 'Instagram' }
];

