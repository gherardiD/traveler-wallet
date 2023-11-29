import { useState } from 'react'
import Login from './components/Login'
import Nav from './components/Nav'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-neutral-400 w-full overflow-hidden h-screen'>
      <div className={`sm:px-16 px-6 flex justify-center items-center`}>
        <div className={`xl:max-w-[1280px] w-full`}>
          <Nav />
        </div>
      </div>
      

        <Login />
        <Footer/>
    </div>
  )
}

export default App
