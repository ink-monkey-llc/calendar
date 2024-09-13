import { Loader } from '@googlemaps/js-api-loader'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
export const loader = new Loader({ apiKey: API_KEY, version: 'weekly', libraries: ['places'] })
