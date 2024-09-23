import React, { useState } from 'react'
import { loader } from '@/app/lib/placesApi'
import { CloseIcon } from '@/app/components/icons/close'
import { cn, isJson } from '@/app/lib/utils'
import { Pin } from '@/app/components/icons/pin'
import { useNewEventStore } from '@/app/lib/zustand/store'

function Location({ isEdit = false, setIsEdit }: { isEdit?: boolean; setIsEdit?: React.Dispatch<React.SetStateAction<boolean>> }) {
 const [input, setInput] = useState('')
 const [active, setActive] = useState(false)
 const [selected, setSelected] = useState<any>()
 const [suggestionsResult, setSuggestionsResult] = useState<any[]>([])
 const location = useNewEventStore((state) => state.location)
 const setLocation = useNewEventStore((state) => state.setLocation)
 const handleClick = async () => {
  setActive(!active)
  if (setIsEdit) {
   setIsEdit(false)
  }
 }

 const loc = location && isJson(location) ? JSON.parse(location) : ''

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
  if (e.target.value.trim().length === 0) {
   setSuggestionsResult([])
   return
  }
  const suggestions = await getSuggestions(e.target.value)
  setSuggestionsResult(await suggestions)
 }

 const showPlaceName = () => {
  if (selected.place.formattedAddress.includes(selected.place.displayName)) {
   return false
  }
  return true
 }

 const showLocName = () => {
  if (loc.address.includes(loc.name)) {
   return false
  }
  return true
 }

 const handleSelect = async (pred: any) => {
  const fullPlace = await pred.toPlace()
  const placeInfo = await fullPlace.fetchFields({
   fields: ['displayName', 'formattedAddress'],
  })
  setLocation(JSON.stringify({ address: placeInfo.place.formattedAddress, name: placeInfo.place.displayName }))
  setSelected(placeInfo)
  console.log('placeInfo', placeInfo)
  setSuggestionsResult([])
 }

 const handleCancel = () => {
  setActive(false)
  setSelected(null)
  setSuggestionsResult([])
  setInput('')
 }

 const handleRemove = () => {
  setSelected(null)
  setLocation('')
  setSuggestionsResult([])
  setInput('')
  if (setIsEdit) {
   setIsEdit(false)
  }
 }

 return (
  <div className='mt-1 mb-2'>
   {!loc && !active ? (
    <div
     onClick={handleClick}
     className='cursor-pointer text-sm mt-2 border border-white/20 rounded-lg w-max px-3 py-0.5 hover:bg-white/20'>
     Add location
    </div>
   ) : (
    <>
     {!isEdit && !selected ? (
      <>
       <div className='flex items-center justify-between'>
        <label
         htmlFor='description'
         className='block text-sm font-medium text-white'>
         Location
        </label>
        <div
         onClick={handleCancel}
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
      </>
     ) : (
      <div className='flex relative w-full border border-white/20 rounded-lg pl-1 py-0.5'>
       <div className='flex items-center gap-2'>
        <Pin className='w-4 h-4' />
        <div className='text-sm '>
         {isEdit ? (
          <>
           {showLocName() && <div>{loc.name}</div>}
           <div>{loc.address}</div>
          </>
         ) : (
          <>
           {showPlaceName() && <div>{selected.place.displayName} </div>}
           <div>{selected.place.formattedAddress}</div>
          </>
         )}
        </div>
        <CloseIcon
         onClick={handleRemove}
         className='cursor-pointer w-4 h-4 absolute right-1 top-1 text-red-600'
        />
       </div>
      </div>
     )}
     <div className={cn('border border-white/20 rounded-lg mt-1', suggestionsResult.length === 0 && 'hidden')}>
      {suggestionsResult &&
       suggestionsResult?.length > 0 &&
       suggestionsResult.map((sugg: any, i: number) => {
        const pred = sugg.placePrediction
        // console.log(pred.mainText, pred.secondaryText)
        return (
         <div
          onClick={() => handleSelect(pred)}
          className='cursor-pointer my-0.5 px-2 py-0.5 text-xs rounded-lg hover:bg-white/20'
          key={i}>
          {pred.mainText.toString()} {pred.secondaryText && `- ${pred.secondaryText?.toString()}`}
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
