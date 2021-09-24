import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'

import * as BH from '../../apis/beehive'
import * as BK from '../../apis/beekeeper'
import * as SES from '../../apis/ses'
import { useProgress } from '../../../components/progress/ProgressProvider'


import SanityChart, {getMetricBins, colorMap} from '../../SanityChart'


type MetricsObj = {
  [metric: string]: BH.Metric[]
}


export default function NodeView() {
  const {node} = useParams()

  const { setLoading } = useProgress()

  const [loadingTests, setLoadingTests] = useState(true)

  const [vsn, setVsn] = useState(null)
  const [data, setData] = useState(null)
  const [chartData, setChartData] = useState<MetricsObj>(null)
  const [bins, setBins] = useState<string[]>(null)

  const [pluginData, setPluginData] = useState(null)
  const [pluginBins, setPluginBins] = useState<string[]>(null)

  const [error, setError] = useState(null)

  useEffect(() => {
    BK.fetchNode(node)
      .then(data => setData(data))
      .catch(error => setError(error))

    // todo(nc): to be replaced by entry in beekeeper?
    BH.getVSN(node.toLowerCase())
      .then(vsn => setVsn(vsn))
      .catch(error => setError(error))

    setLoading(true)

    setLoadingTests(true)
    BH.getSanityChart(node.toLowerCase())
      .then((data) => {
        const d = data[node.toLowerCase()][`${node.toLowerCase()}.ws-nxcore`]
        const bins = getMetricBins(Object.values(d))
        setBins(bins)
        setChartData(d)
      }).finally(() => setLoadingTests(false))

    SES.getGroupByPlugin(node)
      .then((data) => {
        const pluginBins = getMetricBins(Object.values(data))
        setPluginBins(pluginBins)
        setPluginData(data)
      }).finally(() => setLoading(false))
  }, [node, setLoading])


  if (!data && !error) return <></>


  return (
    <Root>
      <h1>
        Node {vsn} | <small className="muted">{node}</small>
      </h1>

      <h2 className="no-margin">Plugins</h2>
      {pluginData &&
        <SanityChart
          data={pluginData}
          bins={pluginBins}
          colorForValue={(val, obj) => {
            if (val == null)
              return colorMap.noValue

            if (val <= 0)
              return colorMap.green3
            else if (obj.meta.severity == 'warning')
              return colorMap.orange1
            else
              return colorMap.red4
          }}
        />
      }
      <br/>

      <h2 className="no-margin">Sanity Tests</h2>
      {loadingTests && <CircularProgress/>}
      {chartData &&
        <SanityChart
          data={chartData}
          bins={bins}
          colorForValue={(val, obj) => {
            if (val == null)
              return colorMap.noValue

            if (val <= 0)
              return colorMap.green3
            else if (obj.meta.severity == 'warning')
              return colorMap.orange1
            else
              return colorMap.red4
          }}
        />
      }

      <h2>Node Details</h2>
      <table className="key-value-table">
        <tbody>
          <tr>
            <td>Status</td>
            <td className={data.status == 'active' ? 'success' : ''}>
              <b>{data.status}</b>
            </td>
          </tr>

          {Object.entries(data)
            .map(([key, val]) => {
              const label = key.replace(/_/g, ' ')
                .replace(/\b[a-z](?=[a-z]{1})/g, c => c.toUpperCase())
              return <tr key={key}><td>{label}</td><td>{val || '-'}</td></tr>
            })
          }

          {data.contact &&
            <>
              <tr><td colSpan={2}>Contact</td></tr>
              <tr>
                <td colSpan={2} style={{fontWeight: 400, paddingLeft: '30px'}}>{data.contact}</td>
              </tr>
            </>
          }
        </tbody>
      </table>

      <br/><br/>

      <TextField
        id={`sage-${data.name}-notes`}
        label="Notes"
        multiline
        rows={4}
        defaultValue={data.notes}
        variant="outlined"
        style={{width: '50%'}}
      />

      {error &&
        <Alert severity="error">{error.message}</Alert>
      }
    </Root>
  )
}



const Root = styled.div`
  margin: 20px;
`