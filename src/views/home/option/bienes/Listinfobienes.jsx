import "./tableB.scss"
import TableData from "./Table";
import Layout from "../../Layout";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../auth/Authen"
import React, { useEffect } from 'react';

const Listinfobienes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);


    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);


    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError, navigate]);

    return (
        <Layout>
            <TableData />
        </Layout>
    )
}

export default Listinfobienes

