import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./editarmetas.scss"
import Swal from 'sweetalert2'


const URI = 'https://backend-production-7509.up.railway.app/metas/'

const URI1 = 'https://backend-production-7509.up.railway.app/user/'


const EditarMetas_cont = () => {
    const [meta_1, setMeta1] = useState('')
    const [meta_2, setMeta2] = useState('')
    const [obra, setObra] = useState('')
    const [residente, setResidente] = useState('')
    const [almacenario, setAlmacenario] = useState('')
    const [asistente_adm, setAsistenteAdm] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const updateeMetas = async (e) => {
        e.preventDefault()
        const respon = await axios.put(URI + id, {
            meta_1: meta_1,
            meta_2: meta_2,
            obra: obra,
            residente: residente,
            almacenario: almacenario,
            asistente_adm: asistente_adm
        })
        if (respon.status === 200) {
            Swal.fire(
                {
                    title: 'Creado con Exito..',
                    icon: 'success',
                    timer: 5500
                }
            )
            navigate('/metas')

        } else {
            Swal.fire(
                {
                    title: 'Error!',
                    icon: 'error',
                    timer: 5500
                }
            )
        }



    }


    const getSedesId = async () => {
        const resb = await axios.get(URI + id,)
        setMeta1(resb.data.meta_1)
        setMeta2(resb.data.meta_2)
        setObra(resb.data.obra)
        setResidente(resb.data.residente)
        setAlmacenario(resb.data.almacenario)
        setAsistenteAdm(resb.data.asistente_adm)
    }
    const [administrativos, setAdministrativos] = useState([])
    const getAdministrativos = async () => {
        const res = await axios.get(URI1)
        setAdministrativos(res.data)
    }
    useEffect(() => {
        getSedesId();
        getAdministrativos()
    }, [])

    return (
        <>
            <div className='cont_edit_metas'>
                <div className="top">
                    <h1>Editar un Metas : {id}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={updateeMetas}>
                            <div className="formInput" >
                                <label>META 1</label>
                                <input
                                    value={meta_1}
                                    onChange={(e) => setMeta1(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=""
                                    required
                                />
                            </div>
                            <div className="formInput" >
                                <label>META 2</label>
                                <input
                                    value={meta_2}
                                    onChange={(e) => setMeta2(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=""
                                    required
                                />
                            </div>


                            <div className='formInput'>
                                <label>RESIDENTE</label>
                                <input
                                    type="text"
                                    list="datap"
                                    placeholder='FILTRAR ADMINISTRATIVOS'
                                    value={residente}
                                    name='residente'
                                    onChange={(e) => setResidente(e.target.value)}
                                    required
                                />
                                <datalist className='datalistt' id="datap">
                                    {
                                        administrativos
                                            .map(res => {
                                                return (
                                                    <option className='options' key={res.id} value={res.id}>'
                                                        {res.nombres}' '
                                                        {res.apellido_paterno}' '
                                                        {res.apellido_materno}'
                                                    </option>
                                                )
                                            })
                                    }
                                </datalist>
                            </div>

                            <div className='formInput'>
                                <label>ALMACENARIO</label>
                                <input
                                    type="text"
                                    list="datapal"
                                    placeholder=''
                                    value={almacenario}
                                    name='residente'
                                    onChange={(e) => setAlmacenario(e.target.value)}
                                    required
                                />
                                <datalist className='datalistt' id="datapal">
                                    {
                                        administrativos
                                            .map(res => {
                                                return (
                                                    <option className='options' key={res.id} value={res.id}>'
                                                        {res.nombres}' '
                                                        {res.apellido_paterno}' '
                                                        {res.apellido_materno}'
                                                    </option>
                                                )
                                            })
                                    }
                                </datalist>
                            </div>
                            <div className='formInput'>
                                <label>ASISTENTE_ADMINISTATIVO</label>
                                <input
                                    type="text"
                                    list="datapas"
                                    placeholder='FILTRAR ADMINISTRATIVOS'
                                    value={asistente_adm}
                                    name='asistente_adm'
                                    onChange={(e) => setMeta2(e.target.value)}
                                    required
                                />
                                <datalist className='datalistt' id="datapas">
                                    {
                                        administrativos
                                            .map(res => {
                                                return (
                                                    <option className='options' key={res.id} value={res.id}>'
                                                        {res.nombres}' '
                                                        {res.apellido_paterno}' '
                                                        {res.apellido_materno}'
                                                    </option>
                                                )
                                            })
                                    }
                                </datalist>
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
export default EditarMetas_cont;