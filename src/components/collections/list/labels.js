import React, { useEffect, useState } from 'react'
import firebaseConfig from '../../../firebaseConfig'
import "../../../css/lists.css";
import useStyles from './style'

// Material UI
import Link from '@material-ui/core/Link';
import { DataGrid } from '@material-ui/data-grid';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import { dateFormat } from '../../../libs/date'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const columns = [
  { 
    field: 'actions', 
    headerName: '', 
    renderCell:(params) => {
      return(
        <span className="actionLinks">
          <Link href={`#/labels/show/${params.row.id}`}>
            <Icon style={{color:'green'}}>visibility</Icon>
          </Link>
        </span>
      );
    },
    width: 75, sortable: false },
  { 
    field: 'product', 
    headerName: 'Producto', 
    valueGetter:(params) => {
      return params.value.name
    }, 
    width: 200, 
    sortable: false },
  { 
    field: 'provider', 
    headerName: 'Proveedor', 
    valueGetter:(params) => {
      return params.value.name
    }, 
    width: 200, sortable: false  },
  { 
    field: 'in', 
    headerName: 'Ingreso', 
    type: 'date', 
    valueGetter: (params) => {
      return dateFormat(params.row.in.date)
    } 
  },
  { 
    field: 'out', 
    headerName: 'Egreso', 
    type: 'date', 
    valueGetter: (params) => {
      return dateFormat(params.row.out.date)
    } 
  },
  { 
    field: 'expiry', 
    headerName: 'Expira', 
    type: 'date', 
    valueFormatter: (params) => {
      return dateFormat(params.row.expiry);
    }
  },
  { field: 'kg', headerName: 'Kg', width: 75, type: 'number', sortable: false },
  { field: 'lote', headerName: 'Lote', width: 75, sortable: false },
  { field: 'set', headerName: 'Set', width: 75, sortable: false },
]

function LabelsList() {
  const classes = useStyles()
  const [items, setItems] = useState([])
  const [state, setState] = useState({
    'archives': false,
  })

  const field = "in";
  const db = firebaseConfig.firestore()

  const getLabels = () => {
    setItems([]);
    let query = db.collection('labels')
    if ( state.archives ) {
      query = query.orderBy(field);
      query.onSnapshot( async(querySnapshot) => {
        if (querySnapshot.size !== 0) {
          const docs = []
          querySnapshot.forEach( (doc, i) => {
            let data = doc.data()
            docs.push({ id: doc.id, ...data })
          });
          setItems(docs)
        }
      }
    )
    } else {
      console.log('si')
      query = query.where('out.date', '==', '').orderBy(field);
      query.onSnapshot( async(querySnapshot) => {
        if (querySnapshot.size !== 0) {
          const docs = []
          querySnapshot.forEach( (doc, i) => {
            let data = doc.data()
            docs.push({ id: doc.id, ...data })
          });
          setItems(docs)
        }
      }
    )
    }
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect( () => {
    getLabels(); // eslint-disable-next-line
  },[state])

  return (
    <Container className={classes.container}>

        <FormControlLabel control={
          <Checkbox
            checked={ state.archives }
            onChange={ handleChange }
            name="archives"
            color="secondary"
          />
        }
        label="Mostrar utilizados"
        />
      <div className={classes.dataGridContainer} >
        <DataGrid rows={ items } columns={columns} pageSize={5} />
      </div>

    </Container>
  )
}

export default LabelsList
