import React from 'react'

import { View } from '@mybricks/sdk-for-app/ui'

import Designer from './designer'

export default function App() {
  return (
    <View
      onLoad={(appData) => {
        return <Designer appData={appData}/>
      }}
    />
  )
}