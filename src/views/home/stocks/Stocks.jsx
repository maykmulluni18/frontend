import "./stocks.scss";
import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./Data";
import { GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
//import ModalEditUsers from "./modaleditusers/ModalEditUsers";
import axios from "axios";
import { IconButton } from "@mui/material";

const URI = 'https://backend-production-7509.up.railway.app/stock/'


const Stocks = () => {
   const [stocks, setStocks] = useState([])
   const [totalstocks, setTotalStocks] = useState(false)

    useEffect(() => {
        getStock()
        stado()
    }, [])

    const getStock = async () => {
        const res = await axios.get(URI)
        //console.log(res)
        setStocks(res.data.reverse())
    }
    const stado =  () => {
        if (stocks.map((item) => (item.stock))<= 0){
           setTotalStocks(true)
        }
    }

    const actionColumn = [
        {
            field: "opciones",
            headerName: "Estado",
            width: 120,
            renderCell: (params) => {
                return (
                    <>
                    <button>
                        {totalstocks ? <h3>Dispon</h3> : <h3>Not</h3>}
                    </button>
                    </>
                );
            },
        },
    ];
    return (
        <>

            <div className="Tabledata_Stocks">

                <div className="Tabledata">
                    <div className="dataTitle">
                        Lista de de Stocks
                        <div className="CrearButton">
                        </div>
                    </div>
                    
                    <DataGrid
                        className="datagrid"
                        rows={stocks}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={7}
                        rowsPerPageOptions={[5]}
                        //getRowId={row => row[0].id}                        //checkboxSelection
                        disableColumnSelector
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        //loading
                        //{...stocks}
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    />
                </div>
            </div>u
        </>
    );
};

export default Stocks;
