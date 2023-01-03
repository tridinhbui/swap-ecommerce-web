import "./aboutUs.css"
import React, { useState } from 'react'
import { init } from 'emailjs-com';
import emailjs from 'emailjs-com'
init('user_id');

export default function AboutUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const submit = () => {
        if (name && email && message) {
            const serviceId = 'service_id';
            const templateId = 'template_id';
            const userId = 'user_id';
            const templateParams = {
                name,
                email,
                message
            };

            emailjs.send(serviceId, templateId, templateParams, userId)
                .then(response => console.log(response))
                .then(error => console.log(error));
            setName('');
            setEmail('');
            setMessage('');
            setEmailSent(true);


        } else {
            alert('Please fill in all fields.');
        }
    }

    return (
        <body id="contactUs-body">
            <div className="about-us-description">
                <h1 >Alta Team</h1>
                <h2 >We are young, cool, and passionate students from Macalester College, USA. We care about sustainable fashion and want to build a sustainable world! </h2>
            </div>
            <div className="video-responsive">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/A5DQhbrKoB8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div className="contact-us-description">
                <h1 >About Us</h1>
                <h2 >For all enquiries, please contact us using the form below. </h2>
            </div>
            <form className='contact-us-form'>
                <input className='contact-us-input' type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
                <input className='contact-us-input' type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
                <textarea className='your-message' placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
                <button className='send-message' onClick={submit}>Send Message</button>
                <div className={emailSent ? 'thank-you-message-sent' : 'thank-you-message'} >
                    <span  >Thank you for your message, we will be in touch in no time!</span>
                </div>

            </form>
        </body>



    );

}