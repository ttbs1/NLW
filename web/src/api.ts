import axios from "axios";
import { Game } from "./App";

const url = "http://localhost:3333/"

export async function getGames () {
    try {
        const response = await axios('http://localhost:3333/games');
        

        return response.status === 200 ? response.data : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}