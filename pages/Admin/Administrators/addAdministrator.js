import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/AdminHome.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import SideBar from "../../../components/sideBar";

const AddAdministrator = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ending_date, setEnding_date] = useState("");
  const [user_id, setUser_id] = useState(null);
  const [teamleader_id, setTeamleader_id] = useState(null);
  const [comment_director, setComment_director] = useState("");
  const [users, setUsers] = useState([]);


  const handleChange = (e) => {
    if (e.target.name == "username") setUsername(e.target.value);
    if (e.target.name == "email") setEmail(e.target.value);
    if (e.target.name == "password") setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { username, email, password };

    // fetch(''); // Fetch() API
    let result = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/AdminAccess/AdminUsers/postAdminUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await result.json();

    console.log(response);

    setUsername("");
    setEmail("");
    setPassword("");

    if (response.success) {      
      toast.success("Compte Administrateur créé avec succès!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

       // redirection section
       setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}/Admin/Administrators/administrators`);
      }, 3000);
    }
    else {
      toast.error(response.error, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Créer un employé</title>
        <meta name="description" content="Page de Création de compte administrateur" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <h2 className="fs-1 fw-bold mt-5 text-center">Création de compte Administrateur:</h2>
        <div className="row mt-3">
        <div className="col-sm-4">
          <div className="">
            <SideBar />
          </div>
        </div>

        <div className="col-sm-8 mt-1">
          <div className="col-sm-8 offset-2 border border-primary border-3 p-2 center">
          <form onSubmit={handleSubmit} method="POST">
            <div className="mb-3">
              <label htmlFor="tasktitle" className="form-label">
                Nom de l&apos;administrateur:
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                id="username"
                aria-describedby="taskHelp"
                onChange={handleChange}
                required
                value={username}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tasktitle" className="form-label">
                Email de l&apos;administrateur:
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                aria-describedby="taskHelp"
                onChange={handleChange}
                required
                value={email}
              />
            </div>
            <div className="mb-3 ">
              <label htmlFor="tasktitle" className="form-label">
                Mot de passe de l&apos;administrateur:
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                aria-describedby="passwordHelp"
                onChange={handleChange}
                required
                value={password}
              />
            </div>
            <button type="submit" className="btn btn-primary float-end">
              Créer le compte de l&apos;administrateur
            </button>
          </form>
          </div>
        </div>

        </div>
      </main>
    </div>
  );
};

export default AddAdministrator;
