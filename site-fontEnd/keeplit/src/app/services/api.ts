import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';
import http from "http";
import https from "https";
import { signOut } from '../contexts/AuthContext';

export function setupAPIClient(ctx = undefined) {
    const cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:8080', // Confirme a porta do seu Spring Boot
        headers: {
            'Content-Type': 'application/json'
        }
    });;

    api.interceptors.response.use(response => {
        return response;
    }, (err: AxiosError) => {
        if (err.response && err.response.status === 401) {
            if (typeof window !== undefined) {
                signOut();
            } else {
                return Promise.reject(AuthTokenError);
            }
        }
        return Promise.reject(err);
    });

    return api;
}