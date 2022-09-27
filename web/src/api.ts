import axios from "axios";

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

export async function getAds (gameId: string) {
    try {
        const response = await axios(`http://localhost:3333/games/${gameId}/ads`);
        

        return response.status === 200 ? response.data : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getDiscord (adId: string) {
    try {
        const response = await axios(`http://localhost:3333/ads/${adId}/discord`);
        

        return response.status === 200 ? response.data : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}