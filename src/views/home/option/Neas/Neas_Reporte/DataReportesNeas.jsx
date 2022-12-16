
export const userColumns = [

    { field: 'recibido_por', headerName: 'Recibido por:', width: 220 },
    { field: 'tipo_de_obra', headerName: 'T. Obra', width: 120 },
    { field: 'fecha_de_registro', headerName: 'Fecha de Registro', width: 170 },
    { field: 'fecha_de_nea', headerName: 'Fecha de Nea', width: 200 },
    {
        field: 'Responsble',
        headerName: 'Responsble',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 320,
        valueGetter: (params) =>
            `${params.row.usuario.nombres + ' '}` +  
            `${params.row.usuario.apellido_paterno + ' '}` + 
            `${params.row.usuario.apellido_materno || ' '}`,
    },
    {
        field: 'Sedes',
        headerName: 'Sedes',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.row.sede.sede || ''}`,
    },
    {
        field: 'Bienes',
        headerName: 'Cantidad Bienes',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.row.bienes?.length}`,
    }
];