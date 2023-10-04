import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/AdminHome.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";
import SideBar from "../../../components/sideBar";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [toBeActivatedUser, setToBeActivatedUser] = useState({});
  const [tasktitle, setTasktitle] = useState("");
  const [tasktype, setTasktype] = useState(null);
  const [starting_date, setStarting_date] = useState("");
  const [ending_date, setEnding_date] = useState("");
  const [user_id, setUser_id] = useState(null);
  const [teamleader_id, setTeamleader_id] = useState(null);
  const [selectedTask_id, setSelectedTask_id] = useState(null);
  const [comment_director, setComment_director] = useState("");
  const [users, setUsers] = useState([]);
  const [distinctTaskees, setDistinctTaskees] = useState([]);
  const router = useRouter();

  // Section Fetch Other group members
  
  useEffect(() => {
    
    const fetchDistinctTaskees = async () => {
      let data = { selectedTask_id, teamleader_id };
      let allUsers = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Users/getAllDistinctTaskees`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }
      );

      let response = await allUsers.json();
      setDistinctTaskees(response.result);
    };

    // // Function call
    fetchDistinctTaskees();
  }, [selectedTask_id])
  

  

  useEffect(() => {
    const fetchTasks = async () => {
      let allTasks = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/AdminAccess/Tasks/getAllTasks`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      let response = await allTasks.json();
      setTasks(response.result);
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
    fetchTasks();
    fetchUsers();

    if(selectedTask && selectedTask !== {} && selectedTask.task_id){
      setSelectedTask_id(selectedTask.task_id);
    }
  }, []);

  const triggerStatusChangeHandler = async (task_id) =>{
    let data = task_id;
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


  const triggerDeletion = async (task_id) =>{
    let data = task_id;
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
    setSelectedTask({ ...selectedTask, [name]: value });
  };

  const handleUpdateTaskSubmit = async (e) => {
    e.preventDefault();
    let data = {...selectedTask, token: JSON.parse(localStorage.getItem('connectedUser')).token};
    let a = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Tasks/updateTaskDetails`,
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
      toast.success("Modification éffectuée avec succès!", {
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
        <title>Liste des Tâches</title>
        <meta name="description" content="Système d'Assignation de Tâches" />
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
        <h2 className="fs-1 fw-bold mt-5 text-center">Liste des Tâches</h2>
        <div className="row mt-3">
          <div className="col-md-4">
              <div className="">
                <SideBar />
              </div>
            </div>
          <div className="col-md-8 mt-1">
          <Link href={`${router.pathname.replace('/tasks', '')}/addTask`}>
              <button
                type="button"
                className="btn btn-secondary mb-1 fw-bold"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                <i className="bi bi-plus-square-dotted"></i>&nbsp;Créer une nouvelle tâche
              </button>
            </Link>
          <table className="table table-dark table-hover table-responsive table-striped table-bordered border-primary">
              <thead>
                <tr>
                  <th scope="col">#ID Tâche</th>
                  <th scope="col">Tâche</th>
                  <th scope="col">Date de Début</th>
                  <th scope="col">Date de Fin</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks &&
                  Object.keys(tasks).map((item, index) => {
                    return (
                      <tr key={index}>
                        <td scope="row">
                          <Link className="cursor-pointer"  passHref={true} href={`/task/${tasks[item].taskslug}`}>
                          <span>#000{tasks[item].task_id}</span>
                          </Link>
                          
                        </td>
                        <td>{tasks[item].tasktitle}</td>
                        <td>{tasks[item].starting_date.substr(0, 10)}</td>
                        <td>{tasks[item].ending_date.substr(0, 10)}</td>
                        <td>                          
                        <button
                            type="button"
                            className="btn btn-sm btn-info"
                            onClick={() => {setSelectedTask(tasks[item]); setSelectedTask_id(tasks[item].task_id); setTeamleader_id(tasks[item].teamleader_id); }}
                            data-bs-toggle="modal"
                            data-bs-target="#viewTaskModal"
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
                            onClick={() => setSelectedTask(tasks[item])}
                            type="button"
                            className="btn btn-sm btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#editTaskModal"
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
                              (confirm("êtes vous sûre de vouloir supprimer?")) ? triggerDeletion(tasks[item].task_id) : '';}
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
                        

                        {tasks[item].status && tasks[item].status === "Under Process" &&
                          <button
                              type="button"
                              className="btn btn-sm btn-primary"
                              onClick={ () =>{ (confirm("Vous êtes sur le point de spécifier cette tâche comme terminée")) ? triggerStatusChangeHandler(tasks[item].task_id) : '';} }
                              data-bs-placement="bottom" title="Spécifier comme tâche accomplie"
                            >
                              <i className="bi bi-check-circle"></i>
                          </button>
                        }

                          {tasks[item].comment}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            {/* <!-- Modal View Task Start --> */}
            <div
              className="modal fade bg-dark"
              id="viewTaskModal"
              tabIndex="-1"
              aria-labelledby="viewTaskModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content bg-secondary border-white">
                  <div className="modal-header">
                    <h3
                      className="modal-title text-center text-white"
                      id="viewTaskModalLabel"
                    >
                      Détails de la tâche
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
                            <td>Identifiant:</td>
                            <td>#000{selectedTask && selectedTask.task_id}</td>
                          </tr>
                          <tr>
                            <td>Intitulé de la tâche:</td>
                            <td>{selectedTask && selectedTask.tasktitle}</td>
                          </tr>
                          <tr>
                            <td>Date de début:</td>
                            <td>{selectedTask.starting_date && selectedTask.starting_date.substr(0, 10)}</td>
                          </tr>
                          <tr>
                            <td>Date de fin:</td>
                            <td>{selectedTask.ending_date && selectedTask.ending_date.substr(0, 10)}</td>
                          </tr>
                          <tr>
                            <td>Durée:</td>
                            <td>
                              {Math.round((new Date(selectedTask.ending_date) - new Date(selectedTask.starting_date)) / (1000 * 60 * 60)) + ' heures.' }
                              {                             
                              console.log('The Difference of the two datetimes: ', new Date(selectedTask.starting_date), ' AND ', new Date(selectedTask.ending_date), ' IS ', ((new Date(selectedTask.ending_date)) - (new Date(selectedTask.starting_date))) / (1000 * 60 * 60) ) }
                            </td>
                          </tr>
                          <tr>
                            <td>Commentaire du Directeur:</td>
                            <td style={{whiteSpace: 'pre-wrap'}}>{selectedTask && selectedTask.comment_director}</td>
                          </tr>
                          <tr>
                            <td>Type de la tâche:</td>
                            <td>{selectedTask && selectedTask.tasktype === 'Individual'? 'Individuelle': 'Collective'}</td>
                          </tr>
                          {selectedTask && selectedTask.tasktype && selectedTask.tasktype === 'Individual' &&
                            (
                              <>
                                <tr>  
                                  <td>Assignée à:</td>
                                  <td>
                                    {selectedTask && selectedTask.tasktype === "Individual" && selectedTask.username
                                    }
                                  </td>
                                </tr>
                                <tr>
                                  <td>Commentaire de l&apos;employé:</td>
                                  <td style={{whiteSpace: 'pre-wrap'}}>{selectedTask && selectedTask.description && selectedTask.description.length > 0? selectedTask.description : '---'}</td>
                                </tr>
                            </>
                            )
                          }


                          {/* Group Members display Section Start */}                        
                          {selectedTask && selectedTask.tasktype && selectedTask.tasktype === "Collective" && 
                            (
                              <>
                                  <tr>  
                                    <td><span className="text-center">Assignée à:</span> </td>
                                    <td>                                    
                                      <div> <u>Responsable:</u> <i>{selectedTask && selectedTask.tasktype === "Collective" && selectedTask.username}</i></div>
                                      <hr />
                                      <div> <u>Les autres membres:</u> {distinctTaskees && Object.keys(distinctTaskees).map((item, index) => {
                                        return (
                                          <>
                                            <div key={index}>
                                              <i>{distinctTaskees[item].username}</i> 
                                            </div><br />
                                          </>
                                        )}
                                      )} </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Commentaire de l&apos;employé:</td>
                                    <td style={{whiteSpace: 'pre-wrap'}}>{selectedTask && selectedTask.description && selectedTask.description.length > 0? selectedTask.description : '---'}</td>
                                  </tr>
                              </>
                            )
                          }
                          <tr>
                            <td>Signalée comme Terminée?:</td>
                          <td>
                            {" "}
                          <span
                            className={`badge rounded-pill p-1 m-0 ${
                              selectedTask && selectedTask.task_accomplished === "No"
                                ? "bg-secondary"
                                : "bg-success"
                            }`}
                          >
                            {" "}
                            {selectedTask && selectedTask.task_accomplished && selectedTask.task_accomplished === "No"
                              ? <i className="bi bi-hand-thumbs-down fs-2"></i> 
                              : <i className="bi bi-hand-thumbs-up fs-2"></i> }{" "}
                          </span>{" "}
                        </td>
                          </tr>
                          <tr>
                            <td>Tâche Terminée?:</td>
                            <td>
                            {" "}
                          <span
                            className={`badge rounded-pill p-0 m-0 ${
                              selectedTask && selectedTask.status === "Under Process"
                                ? ""
                                : "bg-success"
                            }`}
                          >
                            {" "}
                            {selectedTask && selectedTask.status && selectedTask.status === "Under Process"
                              ? <i className="bi bi-x-circle h3 text-primary"></i> 
                              : <i className="bi bi-check-circle h3"></i> }{" "}
                          </span>{" "}
                            </td>
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
            {/* Modal View Task End */}

            {/* <!-- Modal Edit Task Start --> */}
            <div
              className="modal fade"
              id="editTaskModal"
              tabIndex="-1"
              aria-labelledby="editTaskModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3
                      className="modal-title text-center"
                      id="editTaskModalLabel"
                    >
                      <center>Modification de la tâche</center>
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
                    <form onSubmit={handleUpdateTaskSubmit} method="POST">
                      <div className="mb-3">
                        <label htmlFor="tasktitle" className="form-label">
                          Intitulé de la tâche:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="tasktitle"
                          id="tasktitle"
                          aria-describedby="taskHelp"
                          onChange={handleChange}
                          value={selectedTask !== {} && selectedTask.tasktitle}
                        />
                      </div>
                      <div className="mb-3 d-flex">
                        <div className="col-md-6 mx-2">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Date et heure de début de la tâche:
                          </label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            id="starting_date"
                            name="starting_date"
                            onChange={handleChange}
                            value={selectedTask.starting_date && selectedTask.starting_date.substr(0, 16)}
                          />
                        </div>
                        <div className="col-md-5 mx-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Date et heure de fin de la tâche:
                          </label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            id="ending_date"
                            name="ending_date"
                            onChange={handleChange}
                            value={selectedTask.ending_date && selectedTask.ending_date.substr(0, 16)}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                          Type de Tâche:
                        </label>
                        <select
                          className="form-select form-select-md"
                          aria-label=".form-select-sm example"
                          name="tasktype"
                          onChange={handleChange}
                          value={selectedTask && selectedTask.tasktype}
                        >
                          <option selected value={null} disabled>
                            {selectedTask.tasktype? 'Individuelle' : 'Choisir le type de tâche à assigner'}
                          </option>
                          <option value="Individual">Individuelle</option>
                          <option value="Collective">Collective</option>
                        </select>
                      </div>

                      {selectedTask.tasktype && selectedTask.tasktype === "Individual" && (
                        <>
                          <div className="mb-3">
                            <label htmlFor="user_id" className="form-label">
                              Assigner à:
                            </label>
                            <select
                              className="form-select form-select-md"
                              aria-label=".form-select-sm example"
                              name="user_id"
                              onChange={handleChange}
                            >
                              <option selected disabled value={selectedTask && selectedTask.teamleader_id? selectedTask.teamleader_id : null}>
                                {selectedTask && selectedTask.teamleader_id? selectedTask.username : 'Choisir à quel staff assigner la tâche'}
                              </option>
                              {users &&
                                users.map((user) => (
                                  <option key={user.user_id} value={user.user_id}>
                                    {user.username}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </>
                      )}                      

                      {selectedTask.tasktype && selectedTask.tasktype === "Collective" && (
                        <>
                          <div className="mb-3 d-flex">
                            <div className="col-sm-6">
                              <label htmlFor="user_id" className="form-label">
                                Assigner à: (utilisez [ctrl + click gauche] pour multi-choix)
                              </label>
                              <select
                                className="form-select form-select-md"
                                aria-label=".form-select-sm example"
                                name="user_id"
                                onChange={handleChange}
                                multiple
                              >
                                <option selected value={null} disabled>
                                  Choisir les staffs à qui assigner
                                </option>
                                {users &&
                                  users.map((user) => (
                                    <option key={user.user_id} value={user.user_id}>
                                      {user.username}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="col-sm-6 mt-5 mx-1">
                              <label htmlFor="teamleader_id" className="form-label">
                                Responsable:
                              </label>
                              <select
                                className="form-select form-select-md"
                                aria-label=".form-select-sm example"
                                name="teamleader_id"
                                onChange={handleChange}
                              >
                                <option selected value={null}>
                                  Choisir le Responsable de la tâche
                                </option>
                                {users &&
                                  users.map((user) => (
                                    <option key={user.user_id} value={user.user_id}>
                                      {user.username}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                          Commentaire du Directeur:
                        </label>
                        <textarea
                          name="comment_director"
                          id="comment_director"
                          className="form-control"
                          cols="30"
                          rows="3"
                          onChange={handleChange}
                          value={selectedTask.comment_director}
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-sm btn-info">
                        Sauvegarder la modification
                      </button>
            </form>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-sm btn-warning"
                      data-bs-dismiss="modal"
                    >
                      fermer
                    </button>
                    <button type="submit" className="btn btn-sm btn-info">
                      Sauvegarder la modification
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal Edit Task End */}            
          </div>
        </div>      
      </main>
    </div>
  );
}

export default Tasks;