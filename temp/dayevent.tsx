// function EditEvent({ eventId }: { eventId: string }) {
//  const setIsEdit = useNewEventStore((state) => state.setIsEdit)
//  const setEventId = useNewEventStore((state) => state.setEventId)
//  const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//   e.stopPropagation()
//   setEventId(eventId)
//   setIsEdit(true)
//  }

//  return (
//   <div
//    onClick={(e) => handleEdit(e)}
//    className='p-0.5 rounded-lg hover:bg-white/40 text-white transition-all w-max cursor-pointer'>
//    <EditIcon className='w-4 h-4' />
//   </div>
//  )
// }

// function DeleteEvent({ eventId }: { eventId: string }) {
//  const [open, setOpen] = useState(false)
//  const queryClient = useQueryClient()

//  const mutation = useMutation({
//   mutationFn: (eventId: string) => {
//    return callDeleteEvent(eventId)
//   },
//   onSuccess: () => {
//    queryClient.invalidateQueries({ queryKey: ['events'] })
//    setOpen(false)
//   },
//  })

//  const handleOpen = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
//   e.stopPropagation()
//   setOpen(true)
//  }

//  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//   e.stopPropagation()
//   mutation.mutate(eventId)
//  }

//  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//   e.stopPropagation()
//   setOpen(false)
//  }

//  return (
//   <div>
//    <p
//     onClick={(e) => handleOpen(e)}
//     className=' p-0.5 rounded-lg  text-red-500 w-max cursor-pointer hover:bg-red-500/60 hover:text-white transition-all'>
//     <TrashIcon className='w-4 h-4' />
//    </p>
//    {open && (
//     <div className='absolute w-[130px] h-[67px] top-0 right-4 bg-red-500 rounded-lg px-4 py-2 text-white'>
//      {mutation.isPending && (
//       <div className='absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-red-500/80 rounded-lg'>
//        <Spinner className='m-auto' />
//       </div>
//      )}
//      <div>Are you sure?</div>
//      <div className='flex gap-2 mt-2'>
//       <button
//        onClick={(e) => {
//         handleDelete(e)
//        }}
//        className='px-2 py-0.5 rounded-lg bg-red-500 text-white w-max cursor-pointer hover:bg-red-600 transition-all'>
//        Yes
//       </button>
//       <button
//        onClick={(e) => {
//         handleCancel(e)
//        }}
//        className='px-2 py-0.5 rounded-lg bg-white/80 text-red-500 w-max cursor-pointer hover:bg-white/70 transition-all'>
//        No
//       </button>
//      </div>
//     </div>
//    )}
//   </div>
//  )
// }

// function DayEvent({ event, color }: { event: CalendarEvent; color: ColorOption }) {
//  const [open, setOpen] = useState(false)
//  const isAllDay = !!event.start.date
//  const hasLocation = !!event.location
//  const startTime = dayjs(event.start.dateTime).format('h:mm a')
//  const endTime = dayjs(event.end.dateTime).format('h:mm a')
//  const descHtml = { __html: event.description }
//  const hasDesc = !!event.description
//  const loc = hasLocation && isJson(event.location) ? JSON.parse(event.location) : { name: event.location, address: '' }
//  //  console.log(event.location)
//  const showPlaceName = () => {
//   if (loc.address.includes(loc.name)) {
//    return false
//   }
//   return true
//  }

//  return (
//   <div
//    onClick={() => setOpen(!open)}
//    className='relative font-semibold p-1 grid grid-cols-4 items-center hover-bg cursor-pointer'
//    style={{ color: color.value, '--current': color.ul, borderBottomWidth: '1px', borderBottomColor: color.ul }}>
//    <div className='col-span-1 w-max m-auto'>
//     {isAllDay && <span className='text-sm'>All day</span>}
//     {!isAllDay && (
//      <div className='text-sm flex flex-col '>
//       <span>{startTime} - </span>
//       {endTime}
//      </div>
//     )}
//    </div>
//    <div
//     style={{ borderInlineWidth: '1px', borderInlineColor: color.value }}
//     className={cn('col-span-3 px-2 m-1 flex flex-col gap-1', open ? 'text-wrap' : 'truncate')}>
//     {open && (
//      <div className='w-full flex justify-end text-sm '>
//       <EditEvent eventId={event.id} />
//       <DeleteEvent eventId={event.id} />
//      </div>
//     )}
//     <div className={cn('text-sm font-bold w-full overflow-hidden truncate', open && 'text-wrap')}>{event.summary}</div>
//     {open && (
//      <div>
//       <div
//        style={{ backgroundColor: color.ul }}
//        dangerouslySetInnerHTML={descHtml}
//        className='text-sm text-wrap px-1 rounded-md mb-1'
//       />
//       {hasLocation && (
//        <div className='flex justify-start items-center gap-2'>
//         <Pin className='min-w-4 min-h-4' />
//         <div className='flex flex-col'>
//          {showPlaceName() && <span className='text-xs'>{loc.name}</span>}
//          <span className='text-xs'>{loc.address}</span>
//         </div>
//        </div>
//       )}
//       <div
//        style={{ backgroundColor: color.ul }}
//        className='text-xs px-1 rounded-md mt-1'>
//        Event creator: {event.creator.email}
//       </div>
//      </div>
//     )}
//     {(hasDesc || hasLocation) && (
//      <div
//       style={{ backgroundColor: color.ul }}
//       className='flex justify-center items-center gap-1 text-[.7rem] rounded-md '>
//       {open ? (
//        <>
//         Less
//         <Less className='w-4 h-4' />
//        </>
//       ) : (
//        <>
//         More
//         <More className='w-4 h-4' />
//        </>
//       )}
//      </div>
//     )}
//    </div>
//   </div>
//  )
// }

// export default DayEvent
