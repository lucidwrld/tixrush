import React, { useEffect } from 'react'
import { usePaystackPayment } from 'react-paystack'

const Paystack = ({ email, amount, reference }) => {
    const paystackConfig = {
        email,
        amount,
        publicKey: 'pk_test_f6482d64962df9398eb6e0ef81a7ff3c5cb283b6',
        reference: reference
    }
    const onSuccess = (reference) => {
        const data = {
            reference: reference.trxref,
            // coins_packs: selected_pack.id,
            platform: "web",
            processor: 'paystack'
        }
        console.log(data)
        // verifyTransaction(data)
    };

    // you can call this function anything
    const onClose = () => {
    }
    const initializePayment = usePaystackPayment(paystackConfig);

    // const initPayment = () => {
    //     console.log('----whh')
    //     console.log('yes----we-are-here')
    //     initializePayment(onSuccess, onClose)

    // }

    // useEffect(() => {

    //     initPayment()
    // }, [])


    return (
        <button
            className='btn get-ticket-btn w-100 py-3'
            onClick={e => {
                // e.preventDefault()
                e.preventDefault()


                // makePayment();
                initializePayment(onSuccess, onClose)

                // getRSVPTicket(selectedEvent._id)

                // onClick={() => {
                //     initializePayment(onSuccess, onClose)
                // }}
            }}
        // disabled={paystackConfig.email===''}
        >
            {`Confirm Payment of ${amount / 100}`}
        </button>
    )
}

export default Paystack