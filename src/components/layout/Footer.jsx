import { Link } from "react-router-dom";
import { 
  MapPin, 
  Clock, 
  Mail,
  Instagram,
  Facebook
} from "lucide-react";
import { WhatsAppIcon } from "../common/WhatsAppButton";
import { CreditCards } from "../common/CreditCards";

const TikTokIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-[#2C2420] text-white z-30">
     
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contacto */}
          <div>
            <h3 className="font-sans-elegant text-xs uppercase tracking-wider mb-4 text-white">
              Contacto
            </h3>
            <ul className="text-xs space-y-3 font-sans-elegant">
              <li className="flex items-center gap-2 text-white/70">
                <MapPin className="w-4 h-4" />
                Santiago, Chile
              </li>
              <li>
                <a href="https://l.instagram.com/?u=https%3A%2F%2Fwa.me%2Fc%2F56962507739%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGndZ-6ipADBZQoyqsYGl7V9yHteJ6iD1PgTLV8OaUWBpuL9xj_hC_oKPOlg0A_aem_pZBM_tpwJqJ7Qimh_vlzzQ&e=AT0G8nf25BbKZ8k1SSxza-9Op9OoTgclYvWjMPSUuQeqgS4fSxgcJHJasx4n18OWJTG9TgQmgRJy8IuswZIlVxrLjgl1ZU7BCNsnwVkyfA" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200">
                  <WhatsAppIcon size={15} />
                  Catálogo Whastapp
                </a>
              </li>
              <li>
                <a href="mailto:pascaleclosetspa@gmail.com" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                  pascaleclosetspa@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="font-sans-elegant text-xs uppercase tracking-wider mb-4 text-white">
              <Link to="/help">Ayuda</Link>
            </h3>
            <ul className="text-xs space-y-3 font-sans-elegant">
              <li>
                <Link to="/help#shipping" className="text-white/70 hover:text-white transition-colors duration-200">
                  Cambios y devoluciones
                </Link>
              </li>
              <li>
                <Link to="/help#shipping" className="text-white/70 hover:text-white transition-colors duration-200">
                  Tiempos de entrega
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-white/70 hover:text-white transition-colors duration-200">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-sans-elegant text-xs uppercase tracking-wider mb-4 text-white">
              <Link to="/legal">Legal</Link>
            </h3>
            <ul className="text-xs space-y-3 font-sans-elegant">
              <li>
                <Link to="/legal#terms" className="text-white/70 hover:text-white transition-colors duration-200">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/legal#privacy" className="text-white/70 hover:text-white transition-colors duration-200">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="font-sans-elegant text-xs uppercase tracking-wider mb-4 text-white">
              Redes Sociales
            </h3>
            <div className="flex gap-4">
              <a href="https://instagram.com/pascalecloset" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/pascalecloset" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com/@pascalecloset" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors duration-200">
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center">
          <p className="text-xs text-white/50 font-sans-elegant">
            © 2026 Pascale Closet. Todos los derechos reservados.
          </p>

          <CreditCards />
        </div>
      </div>
    </footer>
  );
};
