const testData = [
  {
    id: 'Leverandør',
    title: 'Leverandør',
    type: 'test',
    label: 'TEST',
    cardStyle: {
      margin: 'auto',
      marginBottom: 5
    },
    description: 'Dette er en leverandør node',
    tags: [
      { title: 'Error', color: 'white', bgcolor: '#F44336' },
      { title: 'Warning', color: 'white', bgcolor: '#FF9800' },
    ]
  },
  {
    id: 'datterSelskab',
    title: 'Datter Selskab',
    label: 'TEST',
    type: 'test',
    cardStyle: {
      margin: 'auto',
      marginBottom: 5
    },
    description: 'Dette er en leverandør node',
    tags: [
      { title: 'Info', color: 'white', bgcolor: '#0288D1' },
      { title: 'Success', color: 'white', bgcolor: '#388E3C' },
    ]
  }
];

export default testData;
