import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const URI4 = 'https://backend-production-7509.up.railway.app/user/'

const FilterAdministrativos = () => {
    const [administrativos, setAdministrativos] = useState([])
    const getAdministrativos = async () => {
        const res = await axios.get(URI4)
        setAdministrativos(res.data)
    }
    useEffect(() => {
        getAdministrativos()
    }, [])

    return (
        <>
            <datalist className='datalistt' id="data1">

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

        </>
    )

}

export default React.memo(FilterAdministrativos)

