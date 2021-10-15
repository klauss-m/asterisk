import { StrictMode } from 'react'
import App from './App'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'

localStorage.setItem('user', JSON.stringify({ email: 'hue@hue.com', role: 'admin' }))

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>,
  document.getElementById('root'),
)

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
    })
  }
}
