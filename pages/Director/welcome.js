import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Welcome = ({user}) => {
    const router = useRouter();

    useEffect(() => {
      const connectedUser = JSON.parse(localStorage.getItem('ConnectedUser'));
      if(connectedUser){
        // setUser(connectedUser)
      }
    }, [router.query])
    

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 mt-5">
          <div className='text-center justify-content-center  mt-5 mx-auto relative'>
            <h1>Bienvenue <i>{user && user.username}</i> </h1> 
            <h2 className='mt-5'>Vous pouvez acceder à vos tâches en cliquant sur le bouton ci-dessous: </h2> 
            <Link href={'/Staffs/mytasks'}>
              <button type="button" class="btn btn-secondary">Secondary</button>
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome;