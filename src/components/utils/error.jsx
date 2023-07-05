import React from 'react'

export default function Error({children}) {
  return (
    <div className='w-full bg-red-600 py-3 font-semibold text-lg uppercase text-center text-white '>{children}</div>
  )
}
