import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Welcome = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    if(connectedUser && connectedUser.accountType !== 3){
      localStorage.removeItem('connectedUser');
      router.push('/');
    }
  }, [router.query])
  

  useEffect(() => {
    const connectedUser = JSON.parse(localStorage.getItem("ConnectedUser"));
    if (connectedUser) {
      // setUser(connectedUser)
    }
  }, [router.query]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Liste des Tâches</title>
        <meta
          name="description"
          content="Système de Gestion de Suivi des Tâches"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <ToastContainer
          position="top-left"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
          <h1 className="fs-1 fw-bold mt-4">
            Bienvenue M. Admin <i>{user && user !== null && user.username}</i>{" "}
          </h1>
        <div className="col-md-12">
          <div className="container mt-2">
            <div className="row">
              <Link href={`${process.env.NEXT_PUBLIC_HOST}/Admin/Administrators/administrators`}>
                <div className="btn col mb-3 border border-3 text-center border-primary rounded-4 mx-2 fs-1 fw-bold p-5 bg-dark bg-gradient text-white">
                  Gérer les Administrateurs <i className="bi bi-person-fill-gear fs-2 mx-1"></i>
                </div>
              </Link>
              <Link href={`${process.env.NEXT_PUBLIC_HOST}/Admin/Staffs/staffs`}>
                <div className="btn col mb-3 border border-3 text-center border-primary rounded-4 mx-2 fs-1 fw-bold p-5 bg-dark bg-gradient text-white">
                  Gérer les Employés <br /> <i className="bi bi-people-fill fs-2 mx-1"></i>
                </div>
              </Link>
              <Link href={`${process.env.NEXT_PUBLIC_HOST}/Admin/Directions/directions`}>
                <div className="btn col mb-3 border border-3 text-center border-primary rounded-4 mx-2 fs-1 fw-bold p-5 bg-dark bg-gradient text-white">
                  Gérer les Directions <br /> <i className="bi bi-building-fill fs-2 mx-1"></i>
                </div>
              </Link>
              <Link href={`${process.env.NEXT_PUBLIC_HOST}/Admin/Tasks/tasks`}>
                <div className="btn col mb-3 border border-3 text-center border-primary rounded-4 mx-2 fs-1 fw-bold p-5 bg-dark bg-gradient text-white">
                  Gérer les Tâches <i className="bi bi-list-task fs-2 mx-1"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
