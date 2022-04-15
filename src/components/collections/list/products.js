import React, { useEffect, useState } from 'react'
import firebaseConfig from '../../../firebaseConfig'
// import "../../../css/lists.css";
import useStyles from './style'

// Material UI
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import { DataGrid } from '@material-ui/data-grid';
import Container from '@material-ui/core/Container';

const ActionsHeader = (params) => {
  return (
    <span className='actionsHeader'>
      <Icon>edit</Icon>
      <Icon>delete</Icon>
    </span>
  )
}

const ActionsLinks = (params) => {
  console.log(params)
  return (
    <span className="actionLinks">
      <Link href={`#/products/edit/${params.getValue('id')}`} color="inherit">
        <Icon>edit</Icon>
      </Link>
      <Link href={`#/products/delete/${params.getValue('id')}`} color="inherit">
        <Icon>delete</Icon>
      </Link>
    </span>
  )
}

const columns = [
  { field: 'name', headerName: 'Name', width: 300},
  { 
    field: 'actions', 
    headerName: 'Edit', 
    renderCell:(params) => {
      return(
        <span className="actionLinks">
          <Link href={`#/products/edit/${params.row.id}`}>
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
          <Link href={`#/products/delete/${params.row.id}`}>
            <Icon style={{color:'red'}}>delete</Icon>
          </Link>
        </span>
      );
    },
    width: 120, 
    sortable: false 
  },
]

function ProductList() {
  const classes = useStyles()
  const [products, setProducts] = useState([])
  const field = "name";
  const db = firebaseConfig.firestore()
  const query = db.collection('products').orderBy(field)

  const getProducts = () => {
    query.onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.size !== 0) {
          const docs = []
          querySnapshot.forEach((doc, i) => {
            docs.push({id:doc.id, ...doc.data()})
          });
          console.log(docs);
          setProducts(docs)
        }
      }
    )
  }

  // Ejecute when the document is ready
  // https://es.reactjs.org/docs/hooks-effect.html
  useEffect( () => {
    getProducts(); // eslint-disable-next-line
  },[])


  return (
    <Container className={classes.container}>
      <div className={classes.dataGridContainer} >
        <DataGrid rows={ products } columns={columns} pageSize={5} getRowId={(row) => row.id}/>
      </div>
    </Container>
  )
}

export default ProductList
