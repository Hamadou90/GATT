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
          <h1 className="fs-1 fw-bold ">
            Bienvenue M. <i>{user && user !== null && user.username}</i>{" "}
          </h1>
        <div className="col-md-12 mt-1">

          <div className="container mt-5">
            <div className="row">
              <Link href={`${router.pathname}/staffs`}>
                <div className="btn col border border-3 text-center border-primary rounded mx-2 fs-1 fw-bold p-5 bg-body-secondary">
                  Gérer les Employés <i className="bi bi-people-fill fs-2 mx-1"></i>
                </div>
              </Link>
              <Link href={`${router.pathname}/tasks`}>
                <div className="btn col border border-3 text-center border-primary rounded mx-2 fs-1 fw-bold p-5 bg-body-secondary">
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
