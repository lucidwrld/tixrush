import Router from './router'
import { NotificationContainer } from 'react-notifications'
import 'bootstrap/dist/css/bootstrap.css'
import './Styles/home.css'
import './Styles/contact.css'
import './Styles/about.css'
import './Styles/components.css'
import './Styles/search.css'
import 'react-notifications/lib/notifications.css'
import './Assets/Fonts/WEB/css/index.css'

function App () {
  return (
    <>
      <Router />
      <NotificationContainer />
    </>
  )
}

export default App
