import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/AdminHome.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";
import SideBar from "../../../components/sideBar";

const Directions = () => {
  const [directions, setDirections] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState({});
  const [director, setDirector] = useState({});
  const [toBeActivatedUser, setToBeActivatedUser] = useState({});
  const [tasktitle, setTasktitle] = useState("");
  const [tasktype, setTasktype] = useState(null);
  const [starting_date, setStarting_date] = useState("");
  const [ending_date, setEnding_date] = useState("");
  const [user_id, setUser_id] = useState(null);
  const [teamleader_id, setTeamleader_id] = useState(null);
  const [selectedDirection_id, setSelectedDirection_id] = useState(null);
  const [comment_director, setComment_director] = useState("");
  const [users, setUsers] = useState([]);
  const [distinctTaskees, setDistinctTaskees] = useState([]);
  const router = useRouter();

  
  const fetchDirector = async (direction_id) => {
    let data = {direction_id};
    let theDirector = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/AdminAccess/Directions/getDirector`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    );

    let response = await theDirector.json();
    setDirector(response.result);
  };

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
    fetchUsers();

    if(selectedDirection && selectedDirection !== {} && selectedDirection.direction_id){
      setSelectedDirection_id(selectedDirection.direction_id);
      
      // Function calls
      fetchDirector(selectedDirection.direction_id);
    }
  }, [selectedDirection]);

  const triggerStatusChangeHandler = async (direction_id) =>{

    let data = direction_id;
    let a = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Tasks/updateTaskStatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let response = await a.json();
    if (response.success) {
      toast.success("Statut de la tâche changé avec succès!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      setTimeout(() => {
        // router.push(`${process.env.NEXT_PUBLIC_HOST}/staffs`);
        router.reload();
      }, 3000);

    } else {
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
  }


  const triggerDeletion = async (direction_id) =>{
    let data = direction_id;
    let a = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Tasks/deleteTask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let response = await a.json();
    if (response.success) {
      toast.success("Suppression éffectuée avec succès!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      setTimeout(() => {
        router.reload();
      }, 3000);

    } else {
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
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedDirection({ ...selectedDirection, [name]: value });
  };

  const handleUpdateDirectionSubmit = async (e) => {
    e.preventDefault();
    let data = {...selectedDirection, token: JSON.parse(localStorage.getItem('connectedUser')).token};
    let a = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/AdminAccess/Directions/updateDirectionDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let response = await a.json();
    if (response.success) {
      toast.success("Direction modifiée avec succès!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        router.reload();
      }, 3000);
      
    } else {
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
        <title>Liste des Directions</title>
        <meta name="description" content="Système de Gestion d'Assignation de Tâches" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* <main className={styles.main}> */}
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
        <h2 className="fs-1 fw-bold mt-5 text-center">Liste des Directions</h2>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="">
              <SideBar />
            </div>
          </div>
        <div className="col-md-8 mt-1">
          <Link href={`${router.pathname.replace('/directions', '')}/addDirection`}>
            <button
              type="button"
              className="btn btn-secondary mb-1 fw-bold float-end"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              <i className="bi bi-plus-square-dotted"></i>&nbsp;Créer une nouvelle direction
            </button>
          </Link>
          <table className="table table-dark table-hover table-responsive table-striped table-bordered border-primary">
              <thead>
                <tr>
                  <th scope="col">#ID Direction</th>
                  <th scope="col">Nom de la Direction</th>
                  <th scope="col">Acronyme</th>
                  <th scope="col">Date de Création</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {directions &&
                  Object.keys(directions).map((item, index) => {
                    return (
                      <tr key={index}>
                        <td scope="row">
                          <Link className="cursor-pointer"  passHref={true} href={`/task/${directions[item].directionslug}`}>
                          <span>#000{directions[item].direction_id}</span>
                          </Link>
                          
                        </td>
                        <td>{directions[item].direction_name}</td>
                        <td>{directions[item].direction_acronym}</td>
                        <td>{directions[item].direction_created_on.substr(0, 10)}</td>
                        <td>                        
                        <button
                            type="button"
                            className="btn btn-sm btn-info"
                            onClick={() => {setSelectedDirection(directions[item]); setSelectedDirection_id(directions[item].direction_id); setTeamleader_id(directions[item].teamleader_id); fetchDirector(directions[item].direction_id) }}
                            data-bs-toggle="modal"
                            data-bs-target="#viewDirectionModal"
                            data-bs-placement="bottom" title="Détails de la tâche"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-eye"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setSelectedDirection(directions[item])}
                            type="button"
                            className="btn btn-sm btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#editDirectionModal"
                            data-bs-placement="bottom" title="Modifier la tâche"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pen"
                              viewBox="0 0 16 16"
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                            </svg>
                        </button>
                        <button
                            onClick={() =>{
                              (confirm("êtes vous sûre de vouloir supprimer?")) ? triggerDeletion(directions[item].direction_id) : '';}
                            }
                            type="button"
                            className="btn btn-sm btn-danger"
                            data-bs-placement="bottom" title="Supprimer la tâche"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
                        </button>
                        

                        {directions[item].status && directions[item].status === "Under Process" &&
                          <button
                              type="button"
                              className="btn btn-sm btn-primary"
                              onClick={ () =>{ (confirm("Vous êtes sur le point de spécifier cette tâche comme terminée")) ? triggerStatusChangeHandler(directions[item].direction_id) : '';} }
                              data-bs-placement="bottom" title="Spécifier comme tâche accomplie"
                            >
                              <i className="bi bi-check-circle"></i>
                          </button>
                        }
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
          </table>

          {/* <!-- Modal View Direction Start --> */}
          <div
            className="modal fade bg-dark"
            id="viewDirectionModal"
            tabIndex="-1"
            aria-labelledby="viewDirectionModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content bg-secondary border-white">
                <div className="modal-header">
                  <h3
                    className="modal-title text-center text-white"
                    id="viewDirectionModalLabel"
                  >
                    Détails de la direction
                  </h3>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="col-md-12">
                    <table className="table table-responsive table-bordered table-striped table-dark">
                      <tbody>
                        <tr>
                          <td>Identifiant de la direction:</td>
                          <td>#000{selectedDirection && selectedDirection.direction_id}</td>
                        </tr>
                        <tr>
                          <td>Nom de la direction:</td>
                          <td>{selectedDirection && selectedDirection.direction_name}</td>
                        </tr>
                        <tr>
                          <td>Acronym de la direction:</td>
                          <td>{selectedDirection.direction_acronym}</td>
                        </tr>
                        <tr>
                          <td>Directeur:</td>
                          <td>{selectedDirection && selectedDirection.director_id !== '0' && director && director !== {} ? director.username : 'Pas encore nommé'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-sm btn-warning fw-bold"
                    data-bs-dismiss="modal"
                  >
                    fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal View Direction End */}

          {/* <!-- Modal Edit Direction Start --> */}
          <div
            className="modal fade"
            id="editDirectionModal"
            tabIndex="-1"
            aria-labelledby="editDirectionModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h3
                    className="modal-title text-center"
                    id="editDirectionModalLabel"
                  >
                    <center>Modification de la direction</center>
                  </h3>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="col-md-12">
                  <form onSubmit={handleUpdateDirectionSubmit} method="POST">
                    <div className="mb-3">
                      <label htmlFor="direction_name" className="form-label">
                        Nom de la direction:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="direction_name"
                        id="direction_name"
                        aria-describedby="direction_nameHelp"
                        onChange={handleChange}
                        required
                        value={selectedDirection !== {} && selectedDirection.direction_name}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="direction_acronym" className="form-label">
                        Acronyme de la direction:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="direction_acronym"
                        id="direction_acronym"
                        aria-describedby="direction_acronymHelp"
                        onChange={handleChange}
                        required
                        value={selectedDirection !== {} && selectedDirection.direction_acronym}
                      />
                    </div>
                  
                    <div className="mb-3">
                      <label htmlFor="director_id" className="form-label">
                        Direc(teur/trice) de la direction:
                      </label>
                      <select
                        className="form-select form-select-md"
                        aria-label=".form-select-sm example"
                        name="director_id"
                        onChange={handleChange}
                        required
                        value={selectedDirection !== {} && selectedDirection.director_id}
                      >
                        <option value={0} disabled >
                          Choisir qui sera le directeur de la direction
                        </option>
                        {users &&
                          users.map((user) => (
                            <option key={user.user_id} value={user.user_id}>
                              {user.username}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">
                        fermer
                      </button>
                      <button type="submit" className="btn btn-sm btn-info">
                        <i className="bi bi-pen"></i> Sauvegarder la modification
                      </button>
                    </div>
                  </form>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
          {/* Modal Edit Direction End */}          
        </div>

        </div>
      </main>
    </div>
  );
}

export default Directions;