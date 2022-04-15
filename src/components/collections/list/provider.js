import React, { useEffect, useState } from 'react'
import firebaseConfig from '../../../firebaseConfig'
import useStyles from './style'

// Material UI
import { DataGrid } from '@material-ui/data-grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';

const columns = [
  { field: 'name', headerName: 'Name', width: 300 },
  { 
    field: 'actions', 
    headerName: 'Edit', 
    renderCell:(params) => {
      return(
        <span className="actionLinks">
          <Link href={`#/providers/edit/${params.row.id}`}>
            <Icon style={{color:'green'}}>edit</Icon>
          </Link>
        </span>
      );
    },
    width: 120, 
    sortable: false 
  },
  { 
    field: 'action', 
    headerName: 'Delete', 
    renderCell:(params) => {
      return(
        <span className="actionLinks">
          <Link href={`#/providers/delete/${params.row.id}`}>
            <Icon style={{color:'red'}}>delete</Icon>
          </Link>
        </span>
      );
    },
    width: 120, 
    sortable: false 
  },
] 


function ProviderList() {
  const classes = useStyles()
  const [providers, setProviders] = useState([])
  const field = "name";

  const db = firebaseConfig.firestore()
  const query = db.collection('providers').orderBy(field)

  // Get the firsts documments in collection
  const getProviders = () => {
    // https://firebase.google.com/docs/firestore/query-data/order-limit-data
    query.onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.size !== 0) {
          const docs = []
          querySnapshot.forEach((doc, i) => {
            docs.push({id:doc.id, ...doc.data()})
          });
          setProviders(docs)
        }
      }
    )
  }

  // Ejecute when the document is ready
  // https://es.reactjs.org/docs/hooks-effect.html
  useEffect( () => {
    getProviders(); // eslint-disable-next-line
  },[])

  return (
    <Container className={classes.container}>
      <div className={classes.dataGridContainer} >
        <DataGrid rows={ providers } columns={columns} pageSize={5} />
      </div>
    </Container>
  )
}

export default ProviderList
