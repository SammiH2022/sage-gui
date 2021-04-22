import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ErrorMsg from '../ErrorMsg'

import {useProgress} from '../../components/progress/Progress'
import * as ECR from '../apis/ecr'


export default function App() {
  const { path } = useParams()

  const { setLoading } = useProgress()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const [namepsace, name, version] = path.split('/')

    setLoading(true)
    ECR.getApp(namepsace, name, version)
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [path, setLoading])

  if (!data) return <></>

  return (
    <Root>
      <h2>
        {data.namespace} / {data.name} <small className="muted">{data.version}</small>
      </h2>
      <p>{data.description}</p>

      <h4>App Config</h4>
      <pre>
        {JSON.stringify(data, null, 4)}
      </pre>

      {error &&
        <ErrorMsg>{error}</ErrorMsg>
      }
    </Root>
  )
}


const Root = styled.div`
`