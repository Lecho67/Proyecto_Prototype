import axios from 'axios';

const cinePlusApi = axios.create({
    baseURL: 'https://cineplus-production.up.railway.app/api'});

export default cinePlusApi

