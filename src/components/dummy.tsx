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
      question: 'What is GidiPitch and who is it for?',
      answer: 'GidiPitch is an AI-powered toolkit that helps African founders create investor-ready pitch decks, resumes, and startup materials — fast. It’s built for early-stage founders who want to tell their story clearly and attract investors with confidence.'
    },
    {
      question: 'How does joining the waitlist help me?',
      answer: 'By joining the waitlist, you’ll be among the first to access GidiPitch when we launch. You’ll also get early product updates, sneak peeks, and special founder-only perks before the public rollout.'
    },
    {
      question: 'When will GidiPitch launch?',
      answer: 'We’re working hard to make sure GidiPitch delivers the best possible experience. While there’s no fixed date yet, waitlist members will be the first to know once we go live.'
    },
    {
      question: 'Will I get early access or rewards for signing up?',
      answer: 'Yes! Early supporters on the waitlist will get exclusive early access and priority invites — plus a few surprises we’re preparing for our first batch of founders.'
    },
    {
      question: 'How accurate are the financial forecasts?',
      answer: 'Our financial models are based on industry benchmarks and best practices for startup projections. While we provide solid foundations, we always recommend reviewing numbers with a financial advisor or mentor familiar with your specific market.'
    },
    {
      question: 'Is GidiPitch free to use?',
      answer: 'GidiPitch will have a free plan so you can explore and create right away, with more advanced tools available through premium options once we launch.'
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
  { icon: Linkedin, href: 'https://www.linkedin.com/company/gidipitch', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Pharkman/gidi-pitch-glow-up', label: 'GitHub' },
  { icon: Instagram, href: 'https://www.instagram.com/gidipitch/', label: 'Instagram' }
];

