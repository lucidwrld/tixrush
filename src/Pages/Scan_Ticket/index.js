import React, { useRef, useState, useEffect, useCallback } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Ticket from '../../Components/Ticket'
import Header from '../../Components/Header'
import Loader from '../../Components/Loader'
import Footer from '../../Components/AppLayout/Footer'
import download from '../../Assets/img/download.svg';
import jsPDF from 'jspdf';
import axios from '../../Utils/axios'
import html2canvas from 'html2canvas';
const ScanTicket = () => {
    const [ticketData, setTicketData] = useState();
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const ticketRef = useRef(null);
    const navigate = useNavigate();

    const downloadPDF = () => {
        const pdf = new jsPDF();

        const pdfElement = ticketRef.current;

        if (pdfElement) {
            html2canvas(pdfElement).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 210; // A4 size
                const imgHeight = canvas.height * imgWidth / canvas.width;
    
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save(`tixrushTicket-${new Date().getDate()}.pdf`);
            });
        } else {
            alert('Element not found or unable to generate PDF.');
        }
    };

    const params = useParams()
    const { ticketId } = params;
    // console.log(ticketId);
    const fetchKey = async() => {
        try {
            setLoading(true)
            const data = {
                name: 'Deniyi Femi',
                email: 'holarfemilekan049@gmail.com'
            }
            const response = await axios.post(`/apiKey/generate`, data)
            setApiKey(response.data.data.key)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    };

    const caxios = axios.create({
        // baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        }
    });

    const getTicketData = async() => {
        try {
            // console.log(apiKey);
            const response = await caxios.get(`tickets/?_id=${ticketId}`);
            // console.log(response?.data?.data?.data[0]);
            setTicketData(response?.data?.data?.data[0]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if(!ticketId) {
            navigate('/');
        }
        fetchKey();
    }, [ticketId, navigate]);

    useEffect(() => {
        if(apiKey) {
            getTicketData();
        }
    }, [apiKey, getTicketData]);

    return (
        <>
            {loading ? (
                <Loader />
            ):(
                <>
                    <Header position={'fixed'} activeLink='' subPage={false} />
                    <div className='scan-ticket__wrapper'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <h3 className='px-2' style={{ fontSize: '20px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', margin: '10px 0', color: '#fff', }}>
                                My Ticket
                            </h3>
                            <div className='d-flex' style={{ color: '#00E194', fontWeight: 400, cursor: 'pointer' }} onClick={downloadPDF}>
                                <img className='px-1' src={download} />
                                <span>download ticket</span>
                            </div>
                        </div>
                        <Ticket ref={ticketRef} data={ticketData} />
                    </div>
                    <Footer />
                </>
            )}
        </>

    )
}

export default ScanTicket