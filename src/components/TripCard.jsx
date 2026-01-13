import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * @typedef {Object} TripCardProps
 * @property {number} id
 * @property {string} title
 * @property {string} image
 * @property {string} duration
 * @property {string} price
 * @property {string} location
 * @property {string} [badge]
 */

export default function TripCard({ id, title, image, duration, price, location, badge, description_short }) {
  return (
    <Link to={`/destinos/${id}`} className="group block h-full">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-[280px] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          
          {/* Badge */}
          {badge && (
            <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
              {badge}
            </div>
          )}

          {/* Overlay Button (Details) - slides up on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="translate-y-4 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            >
              <span className="bg-white text-primary px-6 py-2 rounded-full font-bold text-sm shadow-lg backdrop-blur-sm flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Ver Detalhes
              </span>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="mb-2 flex items-center gap-1 text-gray-500 text-xs font-medium uppercase tracking-wide">
             <MapPin className="h-3 w-3" />
             {location}
          </div>
          
          <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1 group-hover:text-secondary transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>

          {description_short && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {description_short}
            </p>
          )}

          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">A partir de</span>
              <span className="text-2xl font-bold text-secondary">{price}</span>
            </div>
            
            <span className="flex items-center gap-1 text-sm font-bold text-primary transition-transform duration-300 group-hover:translate-x-1">
              Saber mais <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
