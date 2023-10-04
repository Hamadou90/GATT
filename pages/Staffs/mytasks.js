import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyTasks = ({ user }) => {
  
  function createMarkup(content) {
    return { __html: content }
}

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [tasktitle, setTasktitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasktype, setTasktype] = useState(null);
  const [starting_date, setStarting_date] = useState("");
  const [ending_date, setEnding_date] = useState("");
  const [user_id, setUser_id] = useState(null);
  const [teamleader_id, setTeamleader_id] = useState(null);
  const [selectedTask_id, setSelectedTask_id] = useState(null);
  const [comment_director, setComment_director] = useState("");
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(JSON.parse(JSON.stringify(user)));
  const [distinctTaskees, setDistinctTaskees] = useState([]);
  const [inchargeTask, setInchargeTask] = useState({value: null});


  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [query, setQuery] = useState("");


  // From Pagination component Start
  const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = tasks.slice(firstIndex, lastIndex);
    const npage = Math.ceil(tasks.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const previousPage = _ => {
        if(currentPage !== 1)
            setCurrentPage(currentPage - 1);
    }
    const nextPage = () => {
        if(currentPage !== npage)
            setCurrentPage(currentPage + 1);
    }
    const changeCurrentPage = (number) => {
        setCurrentPage(number);
    }
  // From Pagination component End



  // Section Fetch Other group members  
  useEffect(() => {
    
    const fetchInchargeTask = async () => {
      let data = { selectedTask_id, teamleader_id };
      let theUser = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Users/getInchargeTask`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }
      );

      let response = await theUser.json();
      setInchargeTask(response.result);
    };

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

    // // Function calls
    fetchDistinctTaskees();
    if(selectedTask.teamleader_id !== selectedTask.user_id)
      fetchInchargeTask();
  
  }, [selectedTask_id])

  
  useEffect(() => {

    const fetchMyTasks = async () => {  
      let allMyTasks = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Tasks/getMyTasks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: JSON.parse(localStorage.getItem('connectedUser')).token })
        }
      );
  
      let response = await allMyTasks.json();
      setTasks(response.result);
    };

    if (!localStorage.getItem('connectedUser')) {
      router.push('/');
    }
    else{
      fetchMyTasks();
    }

  }, []);
  

  const triggerPersonalStatusChangeHandler = async (task_id) => {  
      let data = {task_id, token: JSON.parse(localStorage.getItem('connectedUser')).token};
      let a = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Tasks/signalTaskCompleted`,
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
        toast.success("Signalement au Directeur effectué avec succès!", {
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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    let data = {task_id: selectedTask.task_id, teamleader_id: selectedTask.teamleader_id, description: selectedTask.description, token: JSON.parse(localStorage.getItem('connectedUser')).token};
    let a = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Tasks/commentTask`,
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
      toast.success("Commentaire éffectué avec succès!", {
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

  const handleSearchChange = e => {
    if(e.target.name === 'query') setQuery(e.target.value);
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    const fetchTaskData = async () =>{
      
      const theSpecificTask = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/Tasks/getMyTasks?q=${query}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem('connectedUser')).token })
        // body: JSON.stringify(data),
        })
        let response = await theSpecificTask.json();

      setTasks(response.result)
    }

    fetchTaskData();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Liste de mes Tâches</title>
        <meta
          name="description"
          content="Système de Gestion d'Assignation des Tâches"
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
        <h2 className="fs-1 fw-bold mt-5">Liste de mes Tâches</h2>
        <div className="col-md-12 mt-1">
        <div className="col-5">
            <form onSubmit={handleSearchSubmit}>
              <div className="form-floating mb-2 d-flex">
                  <input onChange={handleSearchChange} value={query} name='query' type="search" className="form-control form-control" id="floatingInput" placeholder="Search Query" />
                  <label htmlFor="floatingInput">Search Query</label>
                  
                  <button className="btn btn-outline-primary" type="submit">
                      <i className="bi bi-search"></i>
                  </button>
              </div>
            </form>

            {query && query !== '' && <div>
              {(tasks).filter(task => task.tasktitle.toLowerCase().includes(query)).slice(0, 3).map((task, index) => {
                        return <div key={task.task_id} className='btn border-primary list-group fw-bold justify-content-center' onClick={() => setQuery(task.tasktitle)}> {index + 1}: {task.tasktitle}</div>
                      })}
            </div>}
          </div>
          
          <table className="table table-dark table-nowrap table-hover table-responsive table-striped table-bordered border-primary">
            <thead>
              <tr>
                <th scope="col">#ID Tâche</th>
                <th scope="col">Tâche</th>
                <th scope="col">Date de Début</th>
                <th scope="col">Date de Fin</th>
                <th scope="col">Commmentaire du Directeur</th>
                <th scope="col">Signalée comme Terminée?</th>
                <th scope="col">Statut</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records &&
                Object.keys(records).map((item, index) => {
                  return (
                    <tr key={index}>
                      <td scope="row">
                        <Link
                          passHref={true}
                          href={`/task/${records[item].taskslug}`}
                        >
                          <span>#000{records[item].task_id}</span>
                        </Link>
                      </td>
                      <td>{
                      records[item].tasktitle
                      }</td>
                      <td>
                        {new Date(records[item].starting_date).toLocaleString()}
                        </td>
                      <td>
                        {new Date(records[item].ending_date).toLocaleString()}
                        </td>
                      <td>
                        {records[item].comment_director.substr(0, 17) + "..."}
                      </td>
                      <td>
                          {" "}
                        <span
                          className={`badge rounded-pill p-1 m-0 ${
                            records[item] && records[item].task_accomplished === "No"
                              ? "bg-secondary"
                              : "bg-success"
                          }`}
                        >
                          {" "}
                          {records[item] && records[item].task_accomplished && records[item].task_accomplished === "No"
                            ? <i className="bi bi-hand-thumbs-down fs-2"></i> 
                            : <i className="bi bi-hand-thumbs-up fs-2"></i> }{" "}
                        </span>{" "}
                      </td>
                      <td>
                      {" "}
                        <span
                          className={`badge ${
                            records[item].status !== "Under Process"
                              ? "bg-success"
                              : "bg-info text-black"
                          }`}
                        >
                          {" "}
                          {records[item].status &&
                          records[item].status !== "Under Process"
                            ? "Terminé"
                            : "En cours de Traitement"}{" "}
                        </span>{" "}
                      </td>
                      <td>
                        <span className="col-sm-12 d-flex">
                        <button
                          type="button"
                          className="btn btn-sm btn-info mx-2"
                          onClick={() => {
                            setSelectedTask(records[item]);
                            setSelectedTask_id(records[item].task_id);
                            setTeamleader_id(records[item].teamleader_id);
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#viewTaskModal"
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

                        {records[item] && records[item].teamleader_id === records[item].user_id &&
                          <span className="dropdown">
                          <button className="btn btn-sm btn-secondary dropdown-toggle inline" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Options
                          </button>
                          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                            {records[item] && records[item].teamleader_id === records[item].user_id && records[item].status === "Under Process" && records[item].task_accomplished !== 'Yes' &&
                              <li>
                              <a className="dropdown-item">
                                  <button
                                onClick={() => setSelectedTask(records[item])}
                                type="button"
                                className="btn btn-sm btn-light"
                                data-bs-toggle="modal"
                                data-bs-target="#commentTaskModal"
                              >
                                 <i className="bi bi-pen"></i>&nbsp;Commenter la tâche
                                  </button>
                              </a>
                              </li>
                            }
                            {records[item] && records[item].teamleader_id === records[item].user_id && records[item].status === "Under Process" && records[item].task_accomplished !== 'Yes' &&
                              <li>
                              <a className="dropdown-item mx-2 ">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-success"
                                    onClick={ () =>{ (confirm("Vous êtes sur le point de spécifier cette tâche comme terminée")) ? triggerPersonalStatusChangeHandler(records[item].task_id) : '';} }
                                    data-bs-placement="bottom" title="Signaler comme tâche accomplie"
                                  >
                                    <i className="bi bi-check-circle"></i> Signaler comme Tâche Accomplie
                                  </button>
                              </a>
                              </li>
                            }
                          </ul>
                          </span>
                        }                        
                        </span>
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
                          <td>
                            {selectedTask.starting_date &&
                              selectedTask.starting_date.substr(0, 10)}
                          </td>
                        </tr>
                        <tr>
                          <td>Date de fin:</td>
                          <td>
                            {selectedTask.ending_date &&
                              selectedTask.ending_date.substr(0, 10)}
                          </td>
                        </tr>
                        <tr>
                          <td>Durée:</td>
                          <td>
                            {Math.round((new Date(selectedTask.ending_date) - new Date(selectedTask.starting_date)) / (1000 * 60 * 60)) + ' heures.' }
                          </td>
                        </tr>
                        <tr>
                          <td>Commentaire du Directeur:</td>
                          <td style={{whiteSpace: 'pre-wrap'}}>
                            {selectedTask && selectedTask.comment_director}
                          </td>
                        </tr>
                        <tr>
                          <td>Type de la tâche:</td>
                          <td>
                            {selectedTask &&
                            selectedTask.tasktype === "Individual"
                              ? "Individuelle"
                              : "Collective"}
                          </td>
                        </tr>
                        {selectedTask &&
                          selectedTask.tasktype &&
                          selectedTask.tasktype === "Individual" && (
                            <>                             
                              <tr>
                                <td>Mon Commentaire:</td>
                                <td style={{whiteSpace: 'pre-wrap'}}>
                                  {selectedTask &&
                                  selectedTask.description &&
                                  selectedTask.description.length > 0
                                    ? selectedTask.description
                                    : "---"}
                                </td>
                              </tr>
                            </>
                          )}

                        {/* Group Members display Section Start */}
                        {selectedTask &&
                          selectedTask.tasktype &&
                          selectedTask.tasktype === "Collective" && (
                            <>
                              <tr>
                                <td>
                                  <span className="text-center">
                                    Assignée à:
                                  </span>{" "}
                                </td>
                                <td>
                                  <div>
                                    {" "}
                                    <u>Responsable:</u>{" "}
                                    <i>                                      
                                      {selectedTask &&
                                        selectedTask.tasktype ===
                                          "Collective" && selectedTask.teamleader_id === selectedTask.user_id? 'Moi' :
                                        inchargeTask.username}
                                    </i>
                                  </div>
                                  <hr />
                                  <div>
                                    {" "}
                                    <u>Les autres membres:</u>{" "}
                                    {distinctTaskees &&
                                      Object.keys(distinctTaskees).map(
                                        (item, index) => {
                                          return (
                                            <>
                                              <div key={index}>
                                                <i>
                                                  {
                                                    distinctTaskees[item].username && distinctTaskees[item].username === selectedTask.username ? "Moi" : distinctTaskees[item].username
                                                  }
                                                </i>
                                              </div>
                                              <br />
                                            </>
                                          );
                                        }
                                      )}{" "}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                {selectedTask && selectedTask.teamleader_id === selectedTask.user_id? 'Mon commentaire' :
                                        'Commentaire du responsable'}
                                  
                                  </td>
                                <td style={{whiteSpace: 'pre-wrap'}}>                                 
                                  {selectedTask &&
                                  selectedTask.description &&
                                  selectedTask.description.length > 0
                                    ? selectedTask.description
                                    : "---"}
                                </td>
                              </tr>
                            </>
                          )}                        
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
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal View Task End */}


          {/* <!-- Modal Comment Task Start --> */}
          <div
            className="modal fade"
            id="commentTaskModal"
            tabIndex="-1"
            aria-labelledby="commentTaskModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h3
                    className="modal-title text-center"
                    id="commentTaskModalLabel"
                  >
                    <center>Commentaire sur la tâche #000{selectedTask.task_id} </center>
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
                    <form onSubmit={handleCommentSubmit} method="POST">
                    <div className="mb-3">
                        <label
                          htmlFor="description"
                          className="form-label"
                        >
                          Le Commentaire:
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          className="form-control"
                          cols="30"
                          rows="3"
                          onChange={handleChange}
                          value={selectedTask && selectedTask.description && selectedTask.description !== null ? selectedTask.description : ''}
                          required
                        ></textarea>
                    </div>                  

                      <button type="submit" className="btn btn-sm btn-info">
                        <i className="bi bi-send fw-bold">Commenter</i> 
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
                    Fermer
                  </button>
                  <button type="submit" className="btn btn-sm btn-info">
                  <i className="bi bi-send fw-bold">Commenter</i> 
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal Comment Task End */}
        </div>


        {/* Pagination Section Start */}
        <nav className='col-5 offset-3'>
          <ul className="pagination">
              {currentPage && currentPage !== 1 && <li className="page-item mx-1">
                  <a href="#" className="page-link" onClick={previousPage}>&lt;&lt;</a>
              </li>}
              <div className='w-[50vw] d-flex overflow-y-hidden overflow-x-auto'>
                  {numbers.map((n, i) => 
                      <li className={`page-item  over ${currentPage === n? 'active': ''}`} key={i}>
                          <a href="#" className="page-link" onClick={() => changeCurrentPage(n)}>{n}</a>
                      </li>
                  )}
              </div>
                  {currentPage && currentPage !== npage && <li className="page-item mx-1">
                    <a href="#" className="page-link" onClick={nextPage}>&gt;&gt;</a>
                  </li>}
          </ul>
        </nav>
        {/* Pagination Section End */}
      </main>
    </div>
  );
};

export default MyTasks;
