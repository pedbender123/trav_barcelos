import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Shield, Check, Calendar, Users, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function TripDetails() {
   const { id } = useParams();
   const [searchParams] = useSearchParams();
   const initialDate = searchParams.get('date') || '';

   const [guests, setGuests] = useState(1);
   const [selectedDate, setSelectedDate] = useState(initialDate);
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
                  '/images/gallery/beach-1.jpg',
                  '/images/gallery/beach-2.jpg',
                  '/images/gallery/beach-3.jpg',
               ],
               [ // Set 1 (City/Europe style)
                  '/images/gallery/city-1.jpg',
                  '/images/gallery/city-2.jpg',
                  '/images/gallery/city-3.jpg',
               ],
               [ // Set 2 (Nature/Adventure style)
                  '/images/gallery/nature-1.jpg',
                  '/images/gallery/nature-2.jpg',
                  '/images/gallery/nature-3.jpg',
               ]
            ];

            // ... (rest of the logic remains same until we render)

            // Select set based on ID
            const selectedSet = imageSets[parseInt(id) % imageSets.length] || imageSets[0];

            // Enforce mock itinerary/included/reviews if not in DB (simple MVP adaptation)
            const enrichedData = {
               ...data,
               rating: (4.8 + (parseInt(id) % 3) * 0.1).toFixed(2), // Varied rating 4.80-5.00
               reviews: 80 + (parseInt(id) * 12),
               images: [
                  data.image, // Main image from DB
                  ...selectedSet
               ],
               // ...
// ... skipping to render part ...
                  {/* Gallery Masonry (Fixed Layout) */ }
            <section>
               <h2 className="text-2xl font-bold text-primary mb-6">Galeria</h2>
               {/* Removed fixed height constraint to allow flow, added aspect ratio control */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trip.images[1] && (
                     <div className="col-span-1 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 relative">
                        <img
                           src={trip.images[1]}
                           alt="Gallery 1"
                           className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                           onError={(e) => e.currentTarget.parentElement.style.display = 'none'}
                        />
                     </div>
                  )}
                  <div className="col-span-1 grid grid-rows-2 gap-4 h-full">
                     {trip.images[2] && (
                        <div className="rounded-2xl overflow-hidden bg-gray-100 relative aspect-[4/3] md:aspect-auto">
                           <img
                              src={trip.images[2]}
                              alt="Gallery 2"
                              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                              onError={(e) => e.currentTarget.parentElement.style.display = 'none'}
                           />
                        </div>
                     )}
                     {trip.images[3] && (
                        <div className="rounded-2xl overflow-hidden bg-gray-100 relative aspect-[4/3] md:aspect-auto">
                           <img
                              src={trip.images[3]}
                              alt="Gallery 3"
                              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                              onError={(e) => e.currentTarget.parentElement.style.display = 'none'}
                           />
                        </div>
                     )}
                  </div>
               </div>
            </section>
               </div >

               {/* Sticky Checkout (Right Column) */ }
               < div className = "relative lg:col-span-1" >
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
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
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
               </div >

            </div >
         </div >
      </motion.div >
   );
   }
