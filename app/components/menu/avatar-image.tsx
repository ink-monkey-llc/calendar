import Image from 'next/image'

export function AvatarImage({ src }: { src: string }) {
    return <Image className='w-6 h-6 rounded-full' src={src} alt='avatar' width={32} height={32} />
}