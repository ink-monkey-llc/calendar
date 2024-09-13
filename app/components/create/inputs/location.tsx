import React, { useState } from 'react'
import { loader } from '@/app/lib/placesApi'

function Location() {
 const [input, setInput] = useState('')
 const [active, setActive] = useState(false)
 const [selected, setSelected] = useState<any>()
 const [suggestionsResult, setSuggestionsResult] = useState<any[]>([])
 const handleClick = async () => {
  setActive(!active)
 }

 const getSuggestions = async (input: string) => {
  const { AutocompleteSessionToken, AutocompleteSuggestion } = await loader.importLibrary('places')
  const request = {
   input,
   region: 'us',
   sessionToken: new AutocompleteSessionToken(),
  }
  const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request)
  return suggestions
 }

 const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  setInput(e.target.value)
  const suggestions = await getSuggestions(e.target.value)
  setSuggestionsResult(await suggestions)
 }

 const handleSelect = async (pred: any) => {
  const fullPlace = await pred.toPlace()
  const placeInfo = await fullPlace.fetchFields({
   fields: ['displayName', 'formattedAddress'],
  })
  setSelected(placeInfo)
  console.log(placeInfo)
  setSuggestionsResult([])
 }

 return (
  <div className='mt-2'>
   {!active ? (
    <div
     onClick={handleClick}
     className='cursor-pointer text-sm mt-2 border border-white/20 rounded-lg w-max px-3 py-0.5 hover:bg-white/20'>
     Add location
    </div>
   ) : (
    <>
     <div className='flex items-center justify-between'>
      <label
       htmlFor='description'
       className='block text-sm font-medium text-white'>
       Location
      </label>
      <div
       onClick={() => setActive(false)}
       className='text-xs cursor-pointer rounded-lg px-2 hover:bg-white/20'>
       Cancel
      </div>
     </div>
     <input
      className='w-full bg-transparent border border-white/20 focus-within:border-white/80 rounded-lg px-2 mt-0.5'
      id='summary'
      name='summary'
      type='text'
      value={input}
      onChange={handleChange}
      placeholder='Enter location'
     />
     {selected && (
      <div>
       <div>{selected.place.displayName} </div>
       <div>{selected.place.formattedAddress}</div>
      </div>
     )}
     <div className='border border-white/20 rounded-lg my-1'>
      {suggestionsResult &&
       suggestionsResult?.length > 0 &&
       suggestionsResult.map((sugg: any, i: number) => {
        const pred = sugg.placePrediction
        return (
         <div
          onClick={() => handleSelect(pred)}
          className='cursor-pointer px-2 py-0.5 rounded-lg hover:bg-white/20'
          key={i}>
          {pred.mainText.toString()}
         </div>
        )
       })}
     </div>
    </>
   )}
  </div>
 )
}

export default Location
