import React, { useState, useEffect } from 'react'
import MobileMenu from '../../Components/MobileMenu'
import Header from '../../Components/Header'

import Footer from '../../Components/AppLayout/Footer'

import Axios from '../../Utils/axios.js'
import axios from 'axios'


const Contact = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  

  const [apiKey, setApiKey] = useState(null)
  const [request, setRequest] = useState(false)
  const [about, setAbout] = useState(null)

  const BASE_URL = 'https://api.tixrush.com/api/v1'

  const fetchKey = async () => {
    try {
      setRequest(true)
      const data = {
        name: 'Deniyi Femi',
        email: 'holarfemilekan049@gmail.com'
      }
      const response = await axios.post(`${BASE_URL}/apiKey/generate`, data)
      setApiKey(response.data.data.key)
      setRequest(false)
    } catch (err) {
      setRequest(false)
    }
  }

  const caxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    }
  })

  const filterSettings = (settings, title) => {
    console.log('---settings---', settings, title)

    const result = settings.filter(el => el.title === title)
    return result
  }

  const getSettings = async () => {
    try {
      const response = await caxios.get(`/settings/setup/view`)
      const result = filterSettings(response.data.data, 'Terms and Condition')
      console.log('---result---', result)

      setAbout(result)
    } catch (err) {
    }
  }

  useEffect(() => {
    fetchKey()
  }, [])

  useEffect(() => {
    if (apiKey) {
      getSettings()
    }
  }, [apiKey])

  return (
    <div>

      <Header position={''} activeLink='' subPage={true} />

      <div className=''>
        <h3 className='page-title px-md-5 px-3 mb-md-4 mb-2'>
          Terms & Conditions
        </h3>
      </div>
      <section className='px-md-5 px-3 pt-2 pb-4'>

        <div>
          {
            about && <div className='about-us-tex text-white mb-4 px-md-5 px-2 mt-md-0 mt-3' dangerouslySetInnerHTML={{ __html: about[0]?.body }}>

            </div>
          }

        </div>
      </section>

      <Footer />
      <MobileMenu toggle={setShowMobileMenu} show={showMobileMenu} />
    </div>
  )
}

export default Contact
