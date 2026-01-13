import { Search, Shield, Star, Award, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import TripCard from '../components/TripCard';

// Simple internal icon components helper or import from lucide-react directly
import { MapPin as MapPinIcon, Calendar as CalendarIcon } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Seguro viagem completo e assistência 24/7 em qualquer lugar do mundo.'
  },
  {
    icon: Star,
    title: 'Experiência Premium',
    description: 'Hotéis 5 estrelas e guias exclusivos selecionados a dedo.'
  },
  {
    icon: Award,
    title: 'Melhor Preço',
    description: 'Garantia de cobrir qualquer oferta com as mesmas condições.'
  }
];

import { useLocation } from 'react-router-dom';

export default function Home() {
  const [featuredTrips, setFeaturedTrips] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:3001/api/offers')
      .then(res => res.json())
      .then(data => setFeaturedTrips(data))
      .catch(err => console.error("Error fetching offers:", err));
  }, []);

  // Handle Hash Scroll
  useEffect(() => {
    if (location.hash) {
      // Small timeout to ensure DOM is ready/content loaded
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location, featuredTrips]); // Run on location change or when trips load

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/30 z-10" />
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop"
            alt="Hero Background"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 text-center">
          <h1 
            className="text-4xl md:text-6xl font-sans font-bold text-white mb-6 leading-tight shadow-md"
          >
            Explore o Mundo com a <br className="hidden md:block" />
            <span className="text-accent">Travel Barcelos</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light"
          >
            Descubra destinos exclusivos e viva experiências inesquecíveis com segurança e conforto.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white p-2 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2"
          >
            <div className="flex-1 px-4 py-3 flex items-center gap-3 border-b md:border-b-0 md:border-r border-gray-100">
              <MapPinIcon className="h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Para onde você quer ir?" 
                className="w-full text-gray-700 outline-none placeholder:text-gray-400 font-medium"
              />
            </div>
            <div className="flex-1 px-4 py-3 flex items-center gap-3 border-b md:border-b-0 md:border-r border-gray-100">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Quando?" 
                className="w-full text-gray-700 outline-none placeholder:text-gray-400 font-medium"
              />
            </div>
            <button className="bg-secondary hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
              <Search className="h-5 w-5" />
              <span>Buscar</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Trips Section */}
      <section id="destinos" className="py-24 container mx-auto px-6">
        {/* Helper for generic offers link */}
        <div id="ofertas" className="absolute -mt-24" /> 
        <div className="flex items-center justify-between mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary"
          >
            Destinos em Destaque
          </motion.h2>
          <a href="/ofertas" className="hidden md:flex items-center gap-1 text-secondary font-bold hover:gap-2 transition-all">
            Ver todas <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTrips.length > 0 ? (
            featuredTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TripCard {...trip} />
              </motion.div>
            ))
          ) : (
             <div className="col-span-3 text-center py-20">
               <p className="text-gray-500 text-xl">Carregando ofertas exclusivas...</p>
             </div>
          )}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <button className="text-secondary font-bold inline-flex items-center gap-1">
             Ver todas as ofertas <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Differentiators Section (Sobre Nós) */}
      <section id="sobre" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Sobre Nós</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Por que viajar conosco?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Cuidamos de cada detalhe para que sua única preocupação seja aproveitar o momento.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group p-8 rounded-3xl hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-secondary mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Newsletter Section */}
      <section className="py-24 bg-primary text-white relative isolate overflow-hidden">
         {/* Background pattern */}
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
              <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#38BDF8" />
                  <stop offset="1" stopColor="#2563EB" />
                </radialGradient>
              </defs>
            </svg>
         </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="max-w-3xl mx-auto"
          >
            <Mail className="h-12 w-12 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Pronto para sua próxima aventura?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">Receba ofertas exclusivas e roteiros secretos diretamente no seu e-mail. Não enviamos spam, apenas sonhos.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="px-6 py-4 rounded-xl text-primary font-medium w-full focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="px-8 py-4 bg-secondary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-colors whitespace-nowrap">
                Inscrever-se
              </button>
            </div>
            <p className="mt-4 text-sm text-blue-200/60">Ao se inscrever, você concorda com nossa Política de Privacidade.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
