import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/AdminHome.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import SideBar from "../../../components/sideBar";
import { useRouter } from "next/router";

const AddStaff = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [direction_id, setDirection_id] = useState(null);
  const [ending_date, setEnding_date] = useState("");
  const [user_id, setUser_id] = useState(null);
  const [teamleader_id, setTeamleader_id] = useState(null);
  const [comment_director, setComment_director] = useState("");
  const [directions, setDirections] = useState([]);

  const router = useRouter();


   useEffect(() => {
    const fetchDirections = async () => {
      let allDirections = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/AdminAccess/Directions/getAllDirections`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      let response = await allDirections.json();
      setDirections(response.result);
    };

    const fetchUsers = async () => {
      let allUsers = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Users/getAllUsers`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      let response = await allUsers.json();
      setUsers(response.result);
    };


    // Function call
    fetchDirections();
    // fetchUsers();
  }, []);
  
  const handleChange = (e) => {
    if (e.target.name == "username") setUsername(e.target.value);
    if (e.target.name == "email") setEmail(e.target.value);
    if (e.target.name == "password") setPassword(e.target.value);
    if (e.target.name == "direction_id") setDirection_id(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { username, email, password, direction_id };

    // fetch(''); // Fetch() API
    let result = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/AdminAccess/Users/postUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await result.json();

    setUsername("");
    setEmail("");
    setPassword("");
    setDirection_id(null);

    if (response.success) {      
      toast.success("Employé créé avec succès!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}/Admin/Staffs/staffs`)
      }, 3000);
    }
    else {
      toast.error(response.error, {
        position: "top-center",
        autoClose: 2000,
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
        <meta name="description" content="Page de Création d'employé" />
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
        <h2 className="fs-1 fw-bold mt-5 text-center">Création de nouvel employé</h2>
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
                Nom de l&apos;employé:
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
                Email de l&apos;employé:
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
                Mot de passe de l&apos;employé:
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
            <div className="mb-3">
                  <label htmlFor="direction_id" className="form-label">
                    Choisir la direction:
                  </label>
                  <select
                    className="form-select form-select-md"
                    aria-label=".form-select-sm example"
                    name="direction_id"
                    onChange={handleChange}
                    required
                    value={direction_id}
                  >
                    <option value={null}>
                      Choisir qui sera le directeur de la direction
                    </option>
                    {directions &&
                      directions.map((direction) => (
                        <option key={direction.direction_id} value={direction.direction_id}>
                          {direction.direction_acronym}
                        </option>
                      ))}
                  </select>
                </div>
            <button type="submit" className="btn btn-primary float-end">
              Créer le compte de l&apos;employé
            </button>
          </form>
          </div>
        </div>

        </div>
      </main>
    </div>
  );
};

export default AddStaff;
