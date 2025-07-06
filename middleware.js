import { NextResponse } from 'next/server';

// Liste des pays africains
const AFRICAN_COUNTRIES = [
  'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CD', 
  'CI', 'DJ', 'EG', 'GQ', 'ER', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS', 
  'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW', 
  'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'SZ', 'TZ', 'TG', 'TN', 'UG', 
  'ZM', 'ZW'
];

export function middleware(request) {
  // Obtenir le pays depuis les headers (disponible sur certains services comme Vercel, Cloudflare)
  const country = request.headers.get('x-vercel-ip-country') || 
                  request.headers.get('cf-ipcountry') || 
                  request.headers.get('x-country-code');

  const response = NextResponse.next();

  if (country) {
    // Déterminer la devise basée sur le pays
    const currency = AFRICAN_COUNTRIES.includes(country.toUpperCase()) ? 'FCFA' : 'EUR';
    
    // Ajouter les headers de géolocalisation à la réponse
    response.headers.set('x-detected-country', country);
    response.headers.set('x-detected-currency', currency);
  }

  return response;
}

// Configurer le middleware pour s'exécuter sur toutes les routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
