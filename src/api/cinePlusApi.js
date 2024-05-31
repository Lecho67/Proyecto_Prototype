import axios from 'axios';

const cinePlusApi = axios.create({
    baseURL: 'http://localhost:4000/api'});

export default cinePlusApi

