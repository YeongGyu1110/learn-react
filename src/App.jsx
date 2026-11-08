import multiply, { add as plus, subtract } from './utils/math.js'
import Profile from './components/Profile.jsx'

function App() {
  return (
    <>
      <h1>안녕, React!</h1>
      <Profile />
      <p>2 + 3 = {plus(2,3)}</p>
      <p>10 - 4 = {subtract(10,4)}</p>
      <p>3 * 4 = {multiply(3,4)}</p>
    </>
  )
}

export default App