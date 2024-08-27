import Events from './components/events'
import SignInOut from './components/sign-in-out'
import { auth } from '@/auth'

export default async function Home() {
 const session = await auth()
 //  console.log(session)
 return (
  <div>
   <div>Events</div>
   <SignInOut />
   {session && <Events />}
  </div>
 )
}
