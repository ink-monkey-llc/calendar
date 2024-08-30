'use server'
import { firstDayOfMonth } from '@/app/lib/date-utils'
import dayjs from '@/app/lib/dayjs'
import { Coords, Weather, FormattedWeather, HistWeatherData } from '@/types/types'

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

const HIST_WEATHER_URL = (coords: CoordData, startDate: string, endDate: string) =>
 `https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`

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

const formatHistWeather = (data: HistWeatherData) => {
 let formattedData: FormattedWeather[] = []
 for (let i = 0; i < data.daily.time.length; i++) {
  const didRain = data.daily.precipitation_hours[i] > 0
  const weatherObj = {
   date: data.daily.time[i],
   maxTemp: data.daily.temperature_2m_max[i],
   minTemp: data.daily.temperature_2m_min[i],
   precipProb: didRain ? 100 : 0,
  }
  formattedData.push(weatherObj)
 }
 return formattedData
}

export const getWeather = async (zip: number, month: number, year: number): Promise<FormattedWeather[]> => {
 const isThisMonth = dayjs().month() == month && dayjs().year() == year
 const weatherRes = await fetch(WEATHER_URL(await getCoords(zip)))
 const weatherData = await weatherRes.json()
 const weather = formatWeather(weatherData)
 if (isThisMonth) {
  const histRes = await fetch(HIST_WEATHER_URL(await getCoords(zip), firstDayOfMonth(month, year), dayjs().subtract(1, 'day').format('YYYY-MM-DD')))
  const histData = await histRes.json()
  const histWeather = formatHistWeather(histData)
  return [...histWeather, ...weather]
 }
 return weather
}
