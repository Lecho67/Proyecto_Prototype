import axios from 'axios';

const cinePlusApi = axios.create({
    baseURL: 'https://proyectoprototype-production.up.railway.app/api'});

export default cinePlusApi

