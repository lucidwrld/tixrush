import { useQuery } from 'react-query';
import Client from '../index';
import Axios from '../../Utils/axios';

export const useGetAllEventsQuery = () => {
    const { data, isLoading, error } = useQuery(['all_events'], () => Client.events.all(), {
        onSuccess: (data) => {
        },
        onError: (err) => {
        }
    })

    console.log('--->>', data)
    return {
        allEvents: data?.data.data?.allEvents ?? [],
        error: error ?? null,
        isLoading
    }
}

export const useGetFeaturedEventQuery = () => {
    const { data, isLoading, error } = useQuery(['featured_events'], () => Client.events.featured(), {
        onSuccess: (data) => {
        },
        onError: (err) => {
        }

    })
    return {
        featuredEvents: data?.data.data?.allEvents ?? [],
        error: error ?? null,
        isLoading
    }
}

export const useGetHeroEventQuery = () => {
    const { data, isLoading, error } = useQuery(['hero_event'], () => Client.events.hero(), {
        onSuccess: (data) => {
        },
        onError: (err) => {
        }

    })
    return {
        heroEvent: data?.data.data ?? null,
        error: error ?? null,
        isLoading
    }
}
/* 
export const useUpcomingEvent = async () => {
    try {
        const response = await Axios.get('/event/upcoming');
        console.log(response.data); // Logging the data received from the API response
        return { upcomingEvents: response.data }; // Returning the upcoming events data
    } catch (error) {
        console.error('Error fetching upcoming events:', error); // Logging any errors that occur during the API call
        return { upcomingEvents: [] }; // Returning an empty array in case of error
    }
}; */


export const paymentController = async (data) => {
    try {
        const response = await Axios.post(`/tickets/rsvp?deviceType=web`, data);
        return response?.data;
    } catch (error) {
        console.log(error)
        console.log(error?.response?.data);
        // error.response.status;
        throw new Error(`Sorry: ${error.response.data.message}`);
    }
};



export const getAnnouncement = async (data) => {
    try {
        const response = await Axios.post(`/announcement/all`, data);
        return response?.data;
    } catch (error) {
        console.log(error)
        console.log(error?.response?.data);
        // error.response.status;
        throw new Error(`Sorry: ${error.response.data.message}`);
    }
}