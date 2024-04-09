import ENDPOINTS from './endpoints';
import Axios from '../Utils/axios';

const Client = {
    events: {
        all: () => Axios.get(ENDPOINTS.ALL_EVENTS),
        featured: () => Axios.get(ENDPOINTS.FEATURED_EVENTS),
        hero: () => Axios.get(ENDPOINTS.HERO_EVENT),
        payment:(data)=>Axios.post(ENDPOINTS.RSVP,data)
    },
}


export default Client;
