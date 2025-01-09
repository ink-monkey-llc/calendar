import { deleteEvent, insertEvent, updateEvent } from '@/app/lib/calendar'

export async function POST(req: Request) {
    const body = await req.json()
    const { event, session } = await body
    try {
        const response = await insertEvent(session.accessToken, session.idToken, session.refreshToken, session.expiresIn, event)
        return new Response(JSON.stringify(response), { status: 201 })
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify(e), { status: 500 })
    }
}

export async function DELETE(req: Request) {
    const body = await req.json()
    const { eventId, session } = await body
    try {
        const response = await deleteEvent(session.accessToken, session.idToken, session.refreshToken, session.expiresIn, eventId)
        return new Response(JSON.stringify(response), { status: 200 })
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify(e), { status: 500 })
    }
}

export async function PUT(req: Request) {
    const body = await req.json()
    const { event, session, eventId } = await body
    try {
        const response = await updateEvent(session.accessToken, session.idToken, session.refreshToken, session.expiresIn, event, eventId)
        return new Response(JSON.stringify(response), { status: 200 })
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify(e), { status: 500 })
    }
}
