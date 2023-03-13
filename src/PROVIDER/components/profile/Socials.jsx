import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare,faWhatsappSquare,faInstagramSquare,faTwitterSquare } from "@fortawesome/free-brands-svg-icons"

import React from 'react'

const Socials = () => {
   let usersocials={
      facebook:'https://facebook.com',
      whatsapp:'https://wa.me/',
      instagram:'https://instagram.com',
      twitter:'https://twitter.com',
   }
  return (
   <>
   <div className="card shadow-sm" style={{padding: '4px 10px'}}>
     <div className="card-title">
     <strong>Socials</strong>
     </div>
      <div>
         <a target={'_blank'} href={usersocials.facebook}>
         <FontAwesomeIcon className='mr-2 facebook' icon={faFacebookSquare} style={{fontSize:'30px', marginRight:'10px'}}/>
         </a>
         <a target={'_blank'} href={usersocials.whatsapp}>
         <FontAwesomeIcon className='mr-2 whatsapp' icon={faWhatsappSquare} style={{fontSize:'30px', marginRight:'10px'}}/>
         </a>
         <a target={'_blank'} href={usersocials.instagram}>
         <FontAwesomeIcon className='mr-2 instagram' icon={faInstagramSquare} style={{fontSize:'30px', marginRight:'10px'}}/>
         </a>
         <a target={'_blank'} href={usersocials.twitter}>
         <FontAwesomeIcon className='mr-2 twitter' icon={faTwitterSquare} style={{fontSize:'30px', marginRight:'10px'}}/>
         </a>
      </div>
   </div>
   </>
  )
}

export default Socials