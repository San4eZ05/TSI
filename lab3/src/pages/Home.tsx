import React from 'react'
import { Text } from '../components/Text'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

export const Home = () => {
  return (
    <>
      <div>Home</div>
      <Button color="primary"
          size="small"
          title="Добавить товар"
          onClick={alert}
          ></Button>
    
    </>


  )
}
