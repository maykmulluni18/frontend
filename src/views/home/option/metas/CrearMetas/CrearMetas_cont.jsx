import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./crearmetas.scss"
import Swal from 'sweetalert2'

const URI = 'https://backend-production-7509.up.railway.app/metas/'

const URI1 = 'https://backend-production-7509.up.railway.app/user'

const CrearMetas_cont = () => {

    const navigate = useNavigate()

    useEffect(() => {
        getAdministrativos()
    }, [])

    const [administrativos, setAdministrativos] = useState([])
    const getAdministrativos = async () => {
        const res = await axios.get(URI1)
        setAdministrativos(res.data)
    }

    const [detailss, setDetaills] = useState([{
        meta_1: "",
        meta_2: "",
        obra: "",
        residente: "",
        almacenario: "",
        asistente_adm: "",
    },
    ])
    for (let i = 0; i < detailss.length; i++) {
        console.log(i)
    }
    const handleSubmit = (event, index) => {
        const { name, value } = event.target
        const list = [...detailss]
        list[index][name] = value
        setDetaills(list)
    }

    const Metas = async (event) => {
        event.preventDefault();
        for (let i = 0; i < detailss.length; i++) {
            const respon = await axios.post(URI,
                {
                    meta_1: detailss[i].meta_1,
                    meta_2: detailss[i].meta_2,
                    obra: detailss[i].obra,
                    residente: detailss[i].residente,
                    almacenario: detailss[i].almacenario,
                    asistente_adm: detailss[i].asistente_adm,
                },

            )
            if (respon.status === 200) {
                Swal.fire(
                    {
                        title: 'Creado con Exito..',
                        // text: 'Presione Clik para cerrar!',
                        icon: 'success',
                        timer: 5500
                    }
                )
                navigate('/neas')
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
        setDetaills([...detailss, {
            meta_1: "",
            meta_2: "",
            obra: "",
            residente: "",
            almacenario: "",
            asistente_adm: "",
        }])
    }

    const handleRemove = (item) => {
        const list = [...detailss]
        list.splice(item, 1)
        setDetaills(list)
    }
    return (
        <>
            <div className='cont_crear_bien'>
                <div className="top">
                    <h1>Crear un Meta </h1>
                </div>
                <div className="cont_form_bienes">
                    <div className="right">
                        <form onSubmit={Metas}>
                            {
                                detailss.map((valu_cont, index) => (
                                    <div key={index} className="gen_fromImput">
                                        <div className="prin_formImput">
                                            <p>La insercion multiple solo esta permitido 10 de : {index + 1}</p>

                                            <div className="formInput" >

                                                <label htmlFor='meta_1'>META 1</label>
                                                <input
                                                    id='meta_1'
                                                    value={valu_cont.meta_1}
                                                    name='meta_1'
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="text"
                                                    placeholder=""
                                                    required


                                                />
                                            </div>
                                            <div className="formInput" >
                                                <label htmlFor='meta_2'>META 2</label>
                                                <input
                                                    id='meta_2'
                                                    value={valu_cont.meta_2}
                                                    name='meta_2'
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="text"
                                                    placeholder=''
                                                    required
                                                //pattern="[A-Z-0-9]+"
                                                />

                                            </div>


                                            <div className='formInput'>
                                                <label htmlFor='residente'>RESIDENTE</label>
                                                <input
                                                    id='residente'
                                                    type="text"
                                                    list="datap"
                                                    placeholder=''
                                                    value={valu_cont.residente}
                                                    name='residente'
                                                    onChange={(e) => handleSubmit(e, index)}
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
                                                <label htmlFor='almacenario'>ALMACENARIO</label>
                                                <input
                                                    id='almacenario'
                                                    type="text"
                                                    list="datap"
                                                    placeholder=''
                                                    value={valu_cont.almacenario}
                                                    name='almacenario'
                                                    onChange={(e) => handleSubmit(e, index)}
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
                                                <label htmlFor='asistente_adm'>ASISTENTE_ADMINISTATIVO</label>
                                                <input
                                                    id='asistente_adm'
                                                    type="text"
                                                    list="datap"
                                                    placeholder=''
                                                    value={valu_cont.asistente_adm}
                                                    name='asistente_adm'
                                                    onChange={(e) => handleSubmit(e, index)}
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
                                            <div className="crearButtom_input_a">
                                                {detailss.length - 1 === index && detailss.length < 10 &&
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
                                            {detailss.length > 1 &&
                                                (

                                                    <button type='button' className="buttonR"
                                                        onClick={() => handleRemove(index)}>
                                                        <span>Remover</span>
                                                    </button>

                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }

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

export default CrearMetas_cont;          