import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Shield, Check, Calendar, Users, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function TripDetails() {
   const { id } = useParams();
   const [guests, setGuests] = useState(1);
   const [trip, setTrip] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      setLoading(true);
      fetch(`/api/offers/${id}`)
         .then(res => {
            if (!res.ok) throw new Error('Falha ao buscar dados');
            return res.json();
         })
         .then(data => {
            if (!data || data.error) throw new Error('Viagem não encontrada');

            // Image Sets for Diversity
            const imageSets = [
               [ // Set 0 (Beach/Maldives style)
                  'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2574&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=2670&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop',
               ],
               [ // Set 1 (City/Europe style)
                  'https://images.unsplash.com/photo-1499856871940-a09627c6d7db?q=80&w=2000&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2000&auto=format&fit=crop',
               ],
               [ // Set 2 (Nature/Adventure style)
                  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2000&auto=format&fit=crop',
               ]
            ];

            // Select set based on ID
            const selectedSet = imageSets[parseInt(id) % imageSets.length] || imageSets[0];

            // Enforce mock itinerary/included/reviews if not in DB (simple MVP adaptation)
            const enrichedData = {
               ...data,
               rating: 4.8 + (parseInt(id) % 3) * 0.1, // Varied rating 4.8-5.0
               reviews: 80 + (parseInt(id) * 12),
               images: [
                  data.image, // Main image from DB
                  ...selectedSet
               ],
               itinerary: [
                  { day: 1, title: 'Chegada', desc: 'Transfer e check-in no hotel com drink de boas-vindas.' },
                  { day: 2, title: 'Exploração Cultural', desc: 'Tour guiado pelos principais marcos históricos e culturais.' },
                  { day: 3, title: 'Natureza e Relaxamento', desc: 'Passeio em áreas naturais preservadas e tarde livre.' },
                  { day: 4, title: 'Gastronomia Local', desc: 'Jantar especial com degustação de pratos típicos.' },
               ],
               included: ['Acomodação Premium', 'Café da manhã', 'Transfer Aeroporto', 'Seguro Viagem', 'Guia Local']
            };
            setTrip(enrichedData);
            setError(null);
         })
         .catch(err => {
            console.error("Error fetching offer details:", err);
            setError("Não foi possível carregar os detalhes desta viagem. Tente novamente mais tarde.");
         })
         .finally(() => setLoading(false));
   }, [id]);

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-background text-primary">
            <div className="text-xl font-bold animate-pulse">Carregando sua próxima aventura...</div>
         </div>
      );
   }

   if (error || !trip) {
      return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-background text-primary gap-4">
            <div className="text-xl font-bold text-red-500">{error || "Viagem não encontrada"}</div>
            <a href="/" className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-blue-700 transition-colors">Voltar para Home</a>
         </div>
      );
   }

   const handleReservation = () => {
      const message = `Olá! Tenho interesse na viagem: ${trip.title} para ${guests} pessoas.`;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=351912099663&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
   };

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="bg-background min-h-screen pb-24"
      >
         {/* Hero Header */}
         <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <motion.img
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               src={trip.images[0]}
               alt={trip.title}
               className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full z-20 container mx-auto px-6 pb-12">
               <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
               >
                  <div className="flex items-center gap-2 text-white/90 mb-2 font-medium">
                     <MapPin className="h-5 w-5 text-accent" />
                     {trip.location}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 shadow-sm">{trip.title}</h1>
                  <div className="flex items-center gap-4 text-white">
                     <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm">
                        <Star className="h-4 w-4 text-alert fill-alert" />
                        <span className="font-bold">{trip.rating}</span>
                        <span className="text-white/80">({trip.reviews} avaliações)</span>
                     </div>
                     <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{trip.duration}</span>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>

         <div className="container mx-auto px-6 mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">

               {/* Main Content (Left Column) */}
               <div className="lg:col-span-2 space-y-16">
                  {/* About */}
                  <section>
                     <h2 className="text-2xl font-bold text-primary mb-6">Sobre a Experiência</h2>
                     <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                        {trip.description_full || trip.description}
                     </p>
                  </section>

                  {/* Itinerary */}
                  <section>
                     <h2 className="text-2xl font-bold text-primary mb-8">Roteiro Sugerido</h2>
                     <div className="border-l-2 border-gray-100 pl-8 ml-4 space-y-12">
                        {trip.itinerary.map((item, idx) => (
                           <div key={idx} className="relative">
                              {/* Dot */}
                              <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-secondary shadow-sm" />
                              <h3 className="text-lg font-bold text-primary mb-2">Dia {item.day}: {item.title}</h3>
                              <p className="text-gray-500">{item.desc}</p>
                           </div>
                        ))}
                     </div>
                  </section>

                  {/* Included */}
                  <section>
                     <h2 className="text-2xl font-bold text-primary mb-6">O que está incluído</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {trip.included.map((inc, i) => (
                           <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-50">
                              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                 <Check className="h-4 w-4" />
                              </div>
                              <span className="font-medium text-gray-700">{inc}</span>
                           </div>
                        ))}
                     </div>
                  </section>

                  {/* Gallery Masonry (Fixed Layout) */}
                  <section>
                     <h2 className="text-2xl font-bold text-primary mb-6">Galeria</h2>
                     {/* Removed fixed height constraint to allow flow, added aspect ratio control */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 relative">
                           {trip.images[1] && <img src={trip.images[1]} alt="Gallery 1" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />}
                        </div>
                        <div className="col-span-1 grid grid-rows-2 gap-4 h-full">
                           <div className="rounded-2xl overflow-hidden bg-gray-100 relative aspect-[4/3] md:aspect-auto">
                              {trip.images[2] && <img src={trip.images[2]} alt="Gallery 2" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />}
                           </div>
                           <div className="rounded-2xl overflow-hidden bg-gray-100 relative aspect-[4/3] md:aspect-auto">
                              {trip.images[3] && <img src={trip.images[3]} alt="Gallery 3" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />}
                           </div>
                        </div>
                     </div>
                  </section>
               </div>

               {/* Sticky Checkout (Right Column) */}
               <div className="relative lg:col-span-1">
                  <div className="sticky top-28">
                     <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <div className="flex items-end justify-between mb-6 border-b border-gray-50 pb-6">
                           <div className="flex flex-col">
                              <span className="text-sm text-gray-400">Preço por pessoa</span>
                              <div className="flex items-baseline gap-1">
                                 <span className="text-3xl font-bold text-secondary">{trip.price}</span>
                              </div>
                           </div>
                           <div className="bg-blue-50 px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                              Melhor Preço
                           </div>
                        </div>

                        <div className="space-y-4 mb-6">
                           <div className="space-y-2">
                              <label className="text-sm font-bold text-gray-700">Data Preferencial</label>
                              <div className="relative">
                                 <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                 <input
                                    type="date"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-secondary/20 font-medium text-gray-700"
                                 />
                              </div>
                           </div>

                           <div className="space-y-2">
                              <label className="text-sm font-bold text-gray-700">Viajantes</label>
                              <div className="relative">
                                 <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                 <select
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-secondary/20 font-medium text-gray-700 appearance-none"
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                 >
                                    <option value={1}>1 Adulto</option>
                                    <option value={2}>2 Adultos</option>
                                    <option value={3}>3 Adultos</option>
                                    <option value={4}>4 Adultos</option>
                                 </select>
                              </div>
                           </div>
                        </div>

                        <button
                           onClick={handleReservation}
                           className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                           Reservar no WhatsApp
                           <ArrowRight className="h-5 w-5" />
                        </button>

                        <div className="mt-4 flex flex-col gap-2">
                           <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                              <Shield className="h-3 w-3" />
                              <span>Atendimento Personalizado</span>
                           </div>
                           {trip.final_considerations && (
                              <p className="text-xs text-center text-gray-400 italic mt-2 border-t border-gray-50 pt-2">
                                 * {trip.final_considerations}
                              </p>
                           )}
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </motion.div>
   );
}
