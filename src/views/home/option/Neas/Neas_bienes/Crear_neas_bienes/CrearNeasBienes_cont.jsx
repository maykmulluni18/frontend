import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import UNAP from "../UNAP.png";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import "./crearneasbienes.scss"

const URI = 'https://backend-production-7509.up.railway.app/neasbienes/'

const URI1 = 'https://backend-production-7509.up.railway.app/neasentradas/'

const URI2 = 'https://backend-production-7509.up.railway.app/bienes/'

const CrearNeasBienes_cont = () => {
    const [neasentradas, setNeasEntradas] = useState([])
    const [bienes, setBienes] = useState([])

    const getNeasEntradas = async () => {
        const res = await axios.get(URI1)
        setNeasEntradas(res.data)
    }
    const getBienes = async () => {
        const res = await axios.get(URI2)
        setBienes(res.data)
    }

    useEffect(() => {
        getNeasEntradas()
        getBienes()
    }, [])


    /*const [neaEntradaId, setNeaEntradaId] = useState('')
    const [bieneId, setBieneId] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [fte_fto, setFteFto] = useState('')
    const [cuenta_contable, setCuentaContable] = useState('')
    const [p_unitario, setPUnitario] = useState('')
    const [fecha, setFecha] = useState('')*/
    const navigate = useNavigate()
    const [detailssneasbienes, setDetaillsNeasBienes] = useState([{
        neaEntradaId: "",
        bieneId: "",
        cantidad: "",
        fte_fto: "",
        cuenta_contable: "",
        p_unitario: "",
        fecha: "",
    }])
    const handleSubmit = (event, index) => {
        const { name, value } = event.target
        const list = [...detailssneasbienes]
        list[index][name] = value
        setDetaillsNeasBienes(list)
    }
    const [neaEntradaId, setNeaEntradaId] = useState('')
    const Neas_Bienes = async (e) => {
        e.preventDefault();
        for (let i = 0; i < detailssneasbienes.length; i++) {
            const respon = await axios.post(URI, {
                neaEntradaId: neaEntradaId,
                bieneId: detailssneasbienes[i].bieneId,
                cantidad: detailssneasbienes[i].cantidad,
                fte_fto: detailssneasbienes[i].fte_fto,
                cuenta_contable: detailssneasbienes[i].cuenta_contable,
                p_unitario: detailssneasbienes[i].p_unitario,
                fecha: detailssneasbienes[i].fecha
            })
            console.log(respon.data)
            if (respon.status === 200) {
                Swal.fire(
                    {
                        title: 'Creado con Exito..',
                        // text: 'Presione Clik para cerrar!',
                        icon: 'success',
                        timer: 5500
                    }
                )
                navigate('/neas-bienes')

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

    }

    const handleAdd = () => {
        setDetaillsNeasBienes([...detailssneasbienes, {
            neaEntradaId: "",
            bieneId: "",
            cantidad: "",
            fte_fto: "",
            cuenta_contable: "",
            p_unitario: "",
            fecha: ""

        }])
    }

    const handleRemove = (item) => {
        const list = [...detailssneasbienes]
        list.splice(item, 1)
        setDetaillsNeasBienes(list)
    }

    return (
        <>
            <div className='cont_crear_neas_bienes'>
                <div className="top">
                    <h1>Crear Bienes de las Neas</h1>
                </div>
                <div className="cont_form_bienes">
                    <div className="right">
                        <form onSubmit={Neas_Bienes}>
                            {
                                detailssneasbienes.map((value_cont, index) => (
                                    <div key={index} className='gen_fromImput'>
                                        <div className='prin_formImput'>
                                            <div className='formInput'>
                                                <label>Neas</label>

                                                <input
                                                    type="text"
                                                    list="data1"
                                                    placeholder='filtrar'
                                                    name='neaEntradaId'
                                                    value={neaEntradaId}
                                                    onChange={(e) => setNeaEntradaId(e.target.value, index)}
                                                    required
                                                />
                                                <datalist className='datalistt' id="data1">
                                                    {
                                                        neasentradas
                                                            .map(res => {
                                                                return (
                                                                    <option className='options' key={res.id} value={res.id}> {res.fecha_de_registro} {res.neaEntradaId}</option>
                                                                )
                                                            })
                                                    }
                                                </datalist>
                                            </div>
                                            <div className='formInput'>
                                                <label>Bienes </label>

                                                <input
                                                    type="text"
                                                    list="bienes"
                                                    placeholder='filtrar'
                                                    name='bieneId'
                                                    value={value_cont.bieneId}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    required
                                                />
                                                <datalist id="bienes">
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

                                            <div className="formInput" >
                                                <label>Cantidad</label>
                                                <input
                                                    name='cantidad'
                                                    value={value_cont.cantidad}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="number"
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                            <div className="formInput" >
                                                <label>Fte/Fto</label>
                                                <input
                                                    name='fte_fto'
                                                    value={value_cont.fte_fto}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="number"
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                            <div className="formInput">
                                                <label>Cuenta Contable</label>
                                                <input
                                                    name='cuenta_contable'
                                                    value={value_cont.cuenta_contable}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="number"
                                                    required
                                                />
                                            </div>
                                            <div className="formInput">
                                                <label>PRECIO UNITARIO</label>
                                                <input
                                                    name='p_unitario'
                                                    value={value_cont.p_unitario}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="number"
                                                    required
                                                />
                                            </div>
                                            <div className="formInput">
                                                <label>FECHA DE REGISTRO</label>
                                                <input
                                                    name='fecha'
                                                    value={value_cont.fecha}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="date"
                                                    required
                                                />
                                            </div>
                                            <div className="formInput">
                                                
                                            </div>
                                            
                                            <div className="crearButtom_input_a">
                                                {detailssneasbienes.length - 1 === index && detailssneasbienes.length < 10 &&
                                                    (
                                                        <button type='button' className="buttonA"
                                                            onClick={handleAdd}
                                                        >
                                                            <span>Agregar</span>
                                                        </button>
                                                    )}
                                            </div>
                                        </div>
                                        <div className="crearButtom_input_b">
                                            {detailssneasbienes.length > 1 &&
                                                (

                                                    <button type='button' className="buttonR"
                                                        onClick={() => handleRemove(index)}>
                                                        <span>Eliminar</span>
                                                    </button>

                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }

                            <div className='crearButtom_B'>
                                <button className='button1' type='submit'>Guardar</button>
                                <Link to={'../../neas-bienes'} className='butoon_2' >
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

export default CrearNeasBienes_cont;