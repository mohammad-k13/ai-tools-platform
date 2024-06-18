import { Input } from '@nextui-org/react'
import React from 'react'

const SignIn = () => {
  return (
    <main>
      <form action="" className='p-7 bg-black text-white rounded-lg shadow-xl'>
        <h2>Create a Account</h2>
        <Input variant='faded' placeholder='username' className='text-black'/>
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default SignIn