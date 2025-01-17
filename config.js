
// no trailing slashes in endpoints, please

const config = {
  // api endpoints
  beehive: 'https://data.sagecontinuum.org/api/v1',
  beekeeper: 'https://api.sagecontinuum.org',
  ecr: 'https://ecr.sagecontinuum.org/api',
  es: 'https://es.sagecontinuum.org/api/v1',
  jenkins: 'https://ecr.sagecontinuum.org/jenkins',
  ses: 'https://portal.sagecontinuum.org/ses-plugin-data', // deprecated
  auth: 'https://auth.sagecontinuum.org',
  deviceRegistration:'https://registration.sagecontinuum.org',

  dockerRegistry: 'registry.sagecontinuum.org',
  influxDashboard: 'https://influxdb.sagecontinuum.org/orgs/6aa7e344b342bea3/dashboards',
  dataBrowserURL: 'https://portal.sagecontinuum.org/query-browser',
  adminURL: 'https://admin.sagecontinuum.org',
  wifireData: 'https://wifire-data.sdsc.edu/api',
  sageCommons: 'https://sage-commons.sdsc.edu/api',
  dataDownload: 'https://sage-commons.sdsc.edu/sageinterface/dump',
  docs: 'https://docs.waggle-edge.ai/docs',

  disableMaps: false,

  // temp solution for additional meta
  additional_sensors: {
    'W022': [
      'OS0-64-GEN2.0 Gen2 64 Below Horizon',
      'ORTEC digiBASE PMT with NaI detector'
    ],
    'W01A': [
      'OS0-64-GEN2.0 Gen2 64 Below Horizon',
      'ORTEC digiBASE PMT with NaI detector'
    ],
    'W01B': [
      'OS0-64-GEN2.0 Gen2 64 Below Horizon',
      'ORTEC digiBASE PMT with NaI detector'
    ],
    'W01C': [
      'OS0-64-GEN2.0 Gen2 64 Below Horizon',
      'ORTEC digiBASE PMT with NaI detector'
    ],
    'W027': [
      'Met One ES-642'
    ],
    'W038': [
      'Met One ES-642'
    ],
    'W06F': [
      'Met One ES-642'
    ],
    'V008': [
      'Mobotix M16'
    ]
  },
  // another temp solution for missing sensor meta
  missing_sensor_details: [
    'XNP-6400RW',
    'mobotix',
    'ETS ML1-WS',
    'Met One ES-642',
    'OS0-64-GEN2.0 Gen2 64 Below Horizon',
    'ORTEC digiBASE PMT with NaI detector'
  ]
}

export default config

export const hasMetOne = (vsn) => {
  const sensors = config.additional_sensors
  const nodes = Object.keys(sensors).filter(k => sensors[k].includes('Met One ES-642'))
  return nodes.includes(vsn)
}
