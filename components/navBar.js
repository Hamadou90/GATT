import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const NavBar = ({ logout, user }) => {
  const router = useRouter();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <span className="navbar-brand" href="#">
                <Image src='/msppas.jpg' width={40} className="rounded-pill" alt="Logo MSPPAS" height={40}></Image>
              </span>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                 {user && user.accountType &&
                  <li className="nav-item">
                    <Link href={`${user && user.accountType === 2? '/Director': ( user && user.accountType === 3? '/Admin': '/Staffs') }`}>
                      <span className={`nav-link ${(router.pathname.split('/').at(-1) === 'Director') || (router.pathname.split('/').at(-1) === 'Admin') || (router.pathname.split('/').at(-1) === 'Staffs')? 'active': ''}`} aria-current="page">
                        ACCUEIL
                      </span>
                    </Link>
                  </li>
                  }
                  {user && user.accountType === 2 && <>
                      <li className="nav-item">
                          <Link href={"/Director/staffs"} className="">
                            <span className={`nav-link ${(router.pathname.split('/').at(-1) === 'staffs') || (router.pathname.split('/').at(-1) === 'addStaff')? 'active': ''}`} >
                              EMPLOYES
                            </span>
                            </Link>
                      </li>
                      <li className="nav-item">
                          <Link href={"/Director/tasks"}>
                            <span className={`nav-link ${(router.pathname.split('/').at(-1) === 'tasks') || (router.pathname.split('/').at(-1) === 'addTask')? 'active': ''}`}>
                              TACHES
                            </span>
                          </Link>
                      </li>
                  </>
                  }
                  {user && user.accountType === 1 && 
                      <li className="nav-item">
                          <Link href={"/Staffs/mytasks"}>
                            <span className={`nav-link ${router.pathname.split('/').at(-1) === 'mytasks'? 'active': ''}`} >
                              MES TACHES
                            </span>
                          </Link>
                      </li>
                  }
                  <li className="nav-item text-center mx-5 align-items-center d-flex justify-content-center text-center">
                    <h2 className=" fw-bold mx-5  text-white">Gestion d&apos;Assignation de Tâches</h2>
                  </li>
                  {user && user.value !== null && (
                    <>
                      <div className="d-flex mx-5 justify-content-end">
                        <li className="btn-group btn-dark mx-5">
                          <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"><b className="pe-auto">{user && user.accountType !== 2 ? user.username : 'Directeur'} </b></button>
                          <ul className="dropdown-menu dropdown-menu-dark">
                            <li className="nav-item btn ">
                            </li>
                            <li className="nav-item btn ">
                              <Link href={`${process.env.NEXT_PUBLIC_HOST}/Staffs/profile`}>
                                <a className="dropdown-item">Mon Profile</a>
                              </Link>
                              </li>
                            <li className="nav-item btn " onClick={logout}>
                                <button className="btn btn-sm btn-warning rounded ms-auto">
                                <span className="nav-link text-black">
                                  Se déconnecter
                                </span>
                              </button>
                            </li>
                          </ul>
                        </li>
                      </div>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
