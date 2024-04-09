import React from 'react';

const MapPreview = ({ location }) => {
    const embedUrl = `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(location)}&key=AIzaSyCv7nMGMuOawlKjHaXJNcIBgg5VZy80IPA`;

    return (
        <div className='map-preview'>
            <iframe
                title='Map Preview'
                width='100%'
                height='200'
                
                frameBorder='0'
                style={{ border: 0 , borderRadius: "14.7864px"}}
                src={embedUrl}
                allowFullScreen=''
            ></iframe>
        </div>
    );
};

export default MapPreview;
