import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import 'chartjs-plugin-datalabels'

import SummaryBar from './SummaryBar'
import SummaryBox from './SummaryBox'

import * as BK from '../../../../components/apis/beekeeper'

const barColors = {
  'reporting': '#3ac37e',
  'failed': '#a30f0f',
  'not reporting': '#a30f0f',
  'offline': '#aaa'
}


type Issues = {
  tests: number
  temps: number
}

function getIssues(data) : Issues {
  const tests = data.reduce((acc, obj) =>
    acc + (obj?.health?.sanity?.failed || 0)
  , 0)

  const temps = data.reduce((acc, obj) =>
    acc + (obj?.temp >= 70 ? 1 : 0)
  , 0)

  return {tests, temps}
}


type Status = {
  'reporting': number,
  'not reporting': number
  'offline': number
}


function getStatus(data: BK.State[]) : Status {
  const statuses = data.reduce((acc, o) => {
    acc['reporting'] += o.status == 'reporting' ? 1 : 0,
    acc['not reporting'] += o.status == 'not reporting' ? 1 : 0,
    acc['offline'] += o.status == 'offline' ? 1 : 0
    return acc
  }, {'reporting': 0, 'not reporting': 0, 'offline': 0})

  return statuses
}


type Props = {
  data: {id: string}[]
  selected?: {id: string}[]
  column?: boolean
  charts?: ('tests' | 'plugins' | 'temps' | 'fsutil')[]
}


export default function Charts(props: Props) {
  const {
    data,
    selected,
    column,
    charts
  } = props

  const [selectedIDs, setSelectedIDs] = useState(selected ? selected.map(o => o.id) : null)
  const [statuses, setStatuses] = useState<Status>({})

  // highlevel stats
  const [issues, setIssues] = useState<Issues>({
    tests: null,
    temps: null
  })


  useEffect(() => {
    setSelectedIDs(selected ? selected.map(o => o.id) : null)
  }, [selected])


  useEffect(() => {
    if (!data && !selectedIDs) return

    const d = selectedIDs ? data.filter(o => selectedIDs.includes(o.id)) : data
    const status = getStatus(d)
    setStatuses({
      'reporting': status['reporting'],
      'not reporting': status['not reporting'],
      'offline': status['offline']
    })

    const issues = getIssues(d)
    setIssues(issues)
  }, [data, selectedIDs])


  const showChart = (name) =>
    typeof charts == 'undefined' ? true : charts?.includes(name)

  if (!data) return <></>

  return (
    <Root className={`${column ? 'flex column' : 'flex flex-grow'} space-between`}>
      <div className="summary-bar">
        <SummaryBar
          values={statuses}
          color={barColors}
        />
      </div>

      <div className="flex gap summary-boxes">
        {showChart('tests') && <SummaryBox label="Sanity" value={issues.tests}/>}
        {showChart('temps') && <SummaryBox label="Temps" value={issues.temps}/>}
      </div>
    </Root>
  )
}

const Root = styled.div`

  .summary-bar {
    flex-grow: 1;
    margin-bottom: 30px;
  }

  .summary-boxes {
    flex-grow: 1;
  }
`
