'use server'

import { Coords, Weather, FormattedWeather } from '@/types/types'

type CoordData = {
 lat: string
 lon: string
 address: string
}

const getCoords = async (zip: number): Promise<CoordData> => {
 const res = await fetch(`https://geocode.maps.co/search?q=${zip}&api_key=${process.env.GEOCODE_API_KEY}`)
 const data: Coords[] = await res.json()
 const coords = { lat: data[0].lat, lon: data[0].lon, address: data[0].display_name }
 return coords
}

const WEATHER_URL = (coords: CoordData) =>
 `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago&forecast_days=16`

const formatWeather = (data: Weather) => {
 let formattedData: FormattedWeather[] = []
 for (let i = 0; i < data.daily.time.length; i++) {
  const weatherObj = {
   date: data.daily.time[i],
   maxTemp: data.daily.temperature_2m_max[i],
   minTemp: data.daily.temperature_2m_min[i],
   precipProb: data.daily.precipitation_probability_max[i],
  }
  formattedData.push(weatherObj)
 }
 return formattedData
}

export const getWeather = async (zip: number): Promise<FormattedWeather[]> => {
 const res = await fetch(WEATHER_URL(await getCoords(zip)))
 const data = await res.json()
 return formatWeather(data)
}
