

const formatters = {
  temp: {
    label: 'Temp',
    query: {
      name: 'env.temperature',
      sensor: 'bme680'
    },
    format: v => `${v}°C`,
    linkParams: ({name, meta}) =>
      `apps=${meta.plugin}&nodes=${meta.vsn}&names=${name}&sensors=${meta.sensor}&window=d`
  },
  humidity: {
    label: 'Humidity',
    query: {
      name: 'env.relative_humidity',
      sensor: 'bme680'
    },
    format: v => `${v}%`,
    linkParams: ({name, meta}) =>
      `apps=${meta.plugin}&nodes=${meta.vsn}&names=${name}&sensors=${meta.sensor}&window=d`
  },
  pressure: {
    label: 'Pressure',
    query: {
      name: 'env.pressure',
      sensor: 'bme680'
    },
    format: v => `${v}Pa`,
    linkParams: ({name, meta}) =>
      `apps=${meta.plugin}&nodes=${meta.vsn}&names=${name}&sensors=${meta.sensor}&window=d`
  },
  gas: {
    label: 'Gas',
    query: {
      name: 'iio.in_resistance_input',
      sensor: 'bme680'
    },
    format: v => `${v}`,
    linkParams: ({name, meta}) =>
      `apps=${meta.plugin}&nodes=${meta.vsn}&names=${name}&sensors=${meta.sensor}&window=d`
  },
  raingauge: {
    label: 'Raingauge',
    query: {
      name: 'env.raingauge.event_acc'
    },
    format: v => `${v}mm`,
    linkParams: ({name, meta}) =>
      `apps=${meta.plugin}&nodes=${meta.vsn}&names=${name}&window=d`
  },
  es642Temp: {
    label: 'Temp (Met One)',
    query: {
      name: 'env.temperature',
      sensor: 'es642'
    },
    format: v => `${v}°C`,
    linkParams: ({name, meta}) =>
      `apps=${meta.plugin}&nodes=${meta.vsn}&names=${name}&window=d`
  },
  es642AirQuality: {
    label: 'Air Quality',
    query: {
      name: 'env.air_quality.conc'
    },
    format: v => `${v}mg/m3`,
    linkParams: ({name, meta}) =>
      `apps=${meta.plugin}&nodes=${meta.vsn}&names=${name}&window=d`
  },
}



export default function format(names: string | string[], vsn: string) {
  const ids = Array.isArray(names) ? names : [names]

  const items = []
  for (const id of ids) {
    const f = formatters[id]

    if (!f) {
      console.error(`data formatter: no formatter found for "${id}"`)
      continue
    }

    f.query.vsn = vsn  // add vsn to query
    items.push(f)
  }

  return items
}

