import React from 'react'
import Alert from '@mui/material/Alert'

type Props = {
  children: JSX.Element
}

export default function ErrorMsg(props: Props) {
  return (
    <Alert severity="error">
      {props.children}
    </Alert>
  )
}

