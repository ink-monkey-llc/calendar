export const adDataRight = [
 {
  id: 'dec',
  bg: '#2EBEC4',
  bgHover: '#5bdee2',
  title: ['Vinyl', 'Decals'],
  text: '#232323',
  textSmall: false,
  img: 'pirate-decal.png',
  width: 80,
  height: 100,
  flex: 'row',
  link: 'https://www.ink-monkey.com/list/Vinyl-Decal',
 },
 {
  id: 'win',
  bg: '#AF46B7',
  bgHover: '#c95fd1',
  title: ['Truck Back', 'Window Graphics'],
  text: '#F5F5F5',
  textSmall: true,
  img: 'deer-window.png',
  width: 140,
  height: 60,
  flex: 'col',
  link: 'https://www.ink-monkey.com/list/Truck-Back-Window-Graphics',
 },
 {
  id: 'card',
  bg: '#2D4C9C',
  bgHover: '#4b68b3',
  title: ['Credit Card Skins'],
  text: '#F5F5F5',
  img: 'mm-card.png',
  textSmall: true,
  width: 100,
  height: 60,
  flex: 'col',
  link: 'https://www.ink-monkey.com/list/Credit-Card-Skin',
 },
]

export const adDataLeft = [
 {
  id: 'eye',
  bg: '#FE7C37',
  bgHover: '#fd9760',
  title: ['Truck', 'Eyebrows'],
  text: '#232323',
  textSmall: false,
  width: 100,
  height: 60,
  img: 'dodge-eyebrow.png',
  flex: 'col',
  link: 'https://www.ink-monkey.com/product/truck-windshield-eyebrow',
 },
]

export type AdDataItem = {
 id: string
 bg: string
 bgHover: string
 title: string[]
 text: string
 textSmall: boolean
 img: string
 flex: string
 width: number
 height: number
 link: string
}
