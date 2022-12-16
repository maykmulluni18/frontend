import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from "../../../../Layout";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import "./editarpecosabienes.scss"

const URI = 'https://backend-production-7509.up.railway.app/pecosabienes/'

const URI1 = 'https://backend-production-7509.up.railway.app/pecosapedidos/'

const URI2 = 'https://backend-production-7509.up.railway.app/invetinicial/'

const EditarPecosaBienes_cont = () => {
    const [pecosapedidos, setPecosaPedidos] = useState([])
    const [bienes, setBienes] = useState([])

    const getPecosaPedidos = async () => {
        const res = await axios.get(URI1)
        setPecosaPedidos(res.data)
    }
    const getBienes = async () => {
        const res = await axios.get(URI2)
        setBienes(res.data)
    }

    useEffect(() => {
        getPecosaPedidos()
        getBienes()
        getPecosaBienes()
        updatePecosaBienes()
    }, [])

    const [pecosaPedidoId, setPecosaPedidoId] = useState('')
    const [bieneId, setBieneId] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [observaciones, set_Observaciones] = useState('')
    const [fecha, setFecha] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const updatePecosaBienes = async (e) => {
        e.preventDefault();
        const respon = await axios.put(URI+id, {
            pecosaPedidoId: pecosaPedidoId,
            bieneId: bieneId,
            cantidad: cantidad,
            observaciones: observaciones,
            fecha: fecha
        })
        if (respon.status === 200) {
            Swal.fire(
                {
                    title: 'Creado con Exito..',
                    // text: 'Presione Clik para cerrar!',
                    icon: 'success',
                    timer: 5500
                }
            )
            navigate('/pecosa-bienes')

        } else {
            Swal.fire(
                {
                    title: 'Error!',
                    // text: 'Presione Clik para cerrar!',
                    icon: 'error',
                    timer: 5500
                }
            )
        }

        

    }

    const getPecosaBienes = async () => {
        const res = await axios.get(URI + id,)
        setPecosaPedidoId(res.data.pecosaPedidoId)
        setBieneId(res.data.bieneId)
        setCantidad(res.data.cantidad)
        set_Observaciones(res.data.observaciones)
        setFecha(res.data.fecha)
    }

    return (
        <>
            <div className='editarpecosabienes'>
                <div className="top">
                    <h1>Crear Bienes de la Pecosa: {id}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={updatePecosaBienes}>
                            <div className='formInput'>
                                <label>Pecosa</label>
                                <input
                                    type="text"
                                    list="datap"
                                    placeholder='filtrar'
                                    value={pecosaPedidoId}
                                    onChange={(e) => setPecosaPedidoId(e.target.value)}
                                    required
                                />
                                <datalist className='datalistt' id="datap">
                                    {
                                        pecosapedidos
                                            .map(res => {
                                                return (
                                                    <option className='options' key={res.id} value={res.id}>{res.dependencias}  {res.fecha}</option>
                                                )
                                            })
                                    }
                                </datalist>
                            </div>
                            <div className='formInput'>
                                <label>Bienes </label>

                                <input
                                    type="text" list="bienesp"
                                    placeholder='filtrar'
                                    value={bieneId}
                                    onChange={(e) => setBieneId(e.target.value)}
                                    required
                                />
                                <datalist id="bienesp">
                                    {
                                        bienes
                                            .map(res => {
                                                return (
                                                    <option key={res.id} value={res.id}> {res.description} </option>
                                                )
                                            })
                                    }

                                </datalist>
                            </div>

                            <div className="formInput">
                                <label>Observaciones</label>
                                <input
                                    value={observaciones}
                                    onChange={(e) => set_Observaciones(e.target.value.toUpperCase())}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="formInput">
                                <label>Fecha de Registro</label>
                                <input
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                    type="date"
                                    required
                                />
                            </div>
                            <div className='crearButtom_B'>
                                <button className='button1' type='submit'>Guardar</button>
                                <Link to={'../'} >
                                    <button className='button2'> Salir</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditarPecosaBienes_cont;   