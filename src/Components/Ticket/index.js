import React, { useImperativeHandle } from 'react'
import { Modal } from 'reactstrap'
import './index.css'
import coverImg from '../../Assets/img/eventDetails.png'
import QRCode from 'qrcode.react';
import location from '../../Assets/img/location.svg'
import time from '../../Assets/img/ticket_time.svg'
import calendar from '../../Assets/img/tic_cal.svg'
import user from '../../Assets/img/tic_user.svg'
import order from '../../Assets/img/tic_ord.svg'
import copy from '../../Assets/img/tic_cop.svg'
import tag from '../../Assets/img/tic_tag.svg'
import { Row, Col } from 'reactstrap';


const TicketDate = React.forwardRef((props, ref) => {
    const ticketRef = ref;

    // useImperativeHandle(ticketRef, () => ({
    //     getContent: () => {
    //         return ticketRef.current.innerHTML;
    //     }
    // }));

    console.log("Data >>>>, ", props?.data);

    const data = { ...props?.data };

    function copyToClipboard(text) {
        if (!navigator.clipboard) {
            // Clipboard API not supported, fallback to the old method
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            return;
        }

        // Use the Clipboard API
        navigator.clipboard.writeText(text)
            .then(() => {
            })
            .catch((err) => {
            });
    }

    const imageUrls = data?.eventId?.media.filter((item) => item.includes('.jpg') || item.includes('.png') || item.includes('.jpeg')).map((urls, i) => { return urls; });

    // console.log(imageUrls)
    return (
        <div
            className='ticket_scan-modal_wrapper px-3 px-md-0'
            ref={ticketRef}
            key={data?._id}
        >
            <div className=' ticket_scan-modal position-relative' style={{backgroundColor: "black"}}>
                <div className='ticket-cover_img--container px-4'
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.45) 0.09%, rgba(0, 0, 0, 1) 90.97%),
                url(${imageUrls?.length > 0 ? imageUrls[0] : coverImg})`
                    }}
                >
                    <div className='qr-code__wrapper '>
                        <div className='qr-code__wrapper__container'>
                            <QRCode value={`${window.location.origin}/event/${data?.eventId?._id}`} />
                        </div>
                    </div>
                    {/* {console.log(data?.eventId)} */}
                    <div className=' d-flex align-items-center mb-3' >
                        <p className='event-ticket__type px-3  mb-0 me-1'>{data?.eventId?.type?.name ?? 'N/A'}</p>
                        <p className='event-ticket__category px-3  mb-0 text-capitalize'>{data?.eventId?.category}</p>


                    </div>
                </div>

                <div className='ticket-details__wrapper px-4'>
                    <h3 className='event-ticket__name'>{data?.eventId?.name}</h3>
                    <div className='d-flex mb-4'>
                        <div className='pe-2 ticket-icon__type'>
                            <img src={location} />
                        </div>
                        <div>
                            <p className='mb-0 ticket-icon__name pt-1 mb-1'>Location</p>
                            <p className='mb-0 ticket-icon__value'>{data?.eventId?.location}</p>

                        </div>

                    </div>

                    <Row className='mb-4'>
                        <Col xs='6'>
                            <div className='d-flex '>
                                <div className='pe-2 ticket-icon__type'>
                                    <img src={time} />
                                </div>
                                <div>
                                    <p className='mb-0 ticket-icon__name pt-1 mb-1'>Time</p>
                                    <p className='mb-0 ticket-icon__value'>{`${data?.eventId?.time?.start} - ${data?.eventId?.time?.end}`}</p>

                                </div>

                            </div>
                        </Col>
                        <Col xs='6'>
                            <div className='d-flex '>
                                <div className='pe-2 ticket-icon__type'>
                                    <img src={calendar} />
                                </div>
                                <div>
                                    <p className='mb-0 ticket-icon__name pt-1 mb-1'>Date</p>
                                    <p className='mb-0 ticket-icon__value'>23.Nov.2022</p>

                                </div>

                            </div>
                        </Col>



                    </Row>

                    <Row className='mb-4'>
                        <Col xs='6'>
                            <div className='d-flex '>
                                <div className='pe-2 ticket-icon__type'>
                                    <img src={user} />
                                </div>
                                <div>
                                    <p className='mb-0 ticket-icon__name pt-1 mb-1'>Name</p>
                                    <p className='mb-0 ticket-icon__value'>{data?.purchasedBy?.fullName}</p>

                                </div>

                            </div>
                        </Col>

                        <Col xs='6'>
                            <div className='d-flex '>
                                <div className='pe-2 ticket-icon__type'>
                                    <img src={order} />
                                </div>
                                <div>
                                    <p className='mb-0 ticket-icon__name pt-1 mb-1'>Order ID</p>
                                    <p className='mb-0 ticket-icon__value'>{data?.tId} <span className='ps-2' onClick={() => {
                                        copyToClipboard(`${data?.tId}`)
                                    }}><img src={copy} /></span></p>

                                </div>

                            </div>
                        </Col>

                    </Row>
                </div>
                <div className='ticket-border__line_wrapper px-4'>
                    <div className=' ticket-border__line'>
                    </div>
                </div>

                <div className='ticket-pricing_wrapper px-4 pb-4 text-center pt-4'>
                    <div className='mb-3'>
                        <p className='mb-0 text-center ticket-pricing'><span className='pe-2' ><img src={tag} /></span>Ticket: Early Birds</p>
                    </div>
                    <div>
                        <h3 className='ticket-pricing_value'>
                            {
                                data?.ticketId?.price !== 0 ?
                                    <>
                                        <span className='ticket_price_symbol pe-2'>
                                            ₦
                                        </span>
                                        {data?.ticketId?.price?.toLocaleString()}
                                    </> : 'Free'
                            }

                        </h3>
                    </div>
                </div>

                <div className='ticket-card_disc left position-absolute'>

                </div>
                <div className='ticket-card_disc right position-absolute'>


                </div>

            </div>

        </div>
    )
})

export default TicketDate