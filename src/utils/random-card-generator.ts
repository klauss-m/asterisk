import img1 from '../images/img-1.jpg'
import img2 from '../images/img-2.jpg'
import img3 from '../images/img-3.jpg'
import img4 from '../images/img-4.jpg'
import img5 from '../images/img-5.jpg'
import img6 from '../images/img-6.jpg'
import img7 from '../images/img-7.jpg'
import img8 from '../images/img-8.jpg'
import img9 from '../images/img-9.jpg'

const imgs = [img1, img2, img3, img4, img5, img6, img7, img8, img9]
const paths = ['/a', '/b', '/c']
const labels = ['Adventure', 'Mystery', 'Luxury', 'Adrenaline']
const infos = [
  'You are the Weakest Link. Goodbye!',
  "Don't panic!",
  "Here's Johnny",
  'Schwing!',
  'Yippee ki yay, motherfucker',
]

export function randomCardGenerator() {
  return {
    img: imgs[Math.floor(Math.random() * imgs.length)],
    path: paths[Math.floor(Math.random() * paths.length)],
    label: labels[Math.floor(Math.random() * labels.length)],
    info: infos[Math.floor(Math.random() * infos.length)],
  }
}
