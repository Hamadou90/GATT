import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/AdminHome.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";
import SideBar from "../../../components/sideBar";

const AddDirections = () => {
  const [directions, setDirections] = useState([]);
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


  const [direction_name, setDirection_name] = useState('');
  const [direction_acronym, setDirection_acronym] = useState('');
  const [director_id, setDirector_id] = useState(0);
  const [specify_director_id, setSpecify_Director_id] = useState('');

  

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
    const fetchDirections = async () => {
      let allDirections = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Directions/getAllDirections`,
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
    console.log("Deletion process: Task_id = ", task_id);

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
    if (e.target.name == "direction_name") setDirection_name(e.target.value);
    if (e.target.name == "direction_acronym") setDirection_acronym(e.target.value);
    if (e.target.name == "director_id") setDirector_id(e.target.value);
    if (e.target.name == "specify_director_id") setSpecify_Director_id(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { direction_name, direction_acronym, director_id };

    // fetch(''); // Fetch() API
    let result = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/AdminAccess/Directions/postDirection`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await result.json();

    setDirection_name("");
    setDirection_acronym("");
    setDirector_id(null);

    if (response.success) {  
      toast.success("Direction créée avec succès!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });  
      if(response.director_id === 0){
        setTimeout(() => {
          toast.info("N'oubliez pas de spécifier le directeur de la direction créée!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });          
        }, 1000);
      }  

      // redirection section
      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}/Admin/Directions/directions`);
      }, 3500);
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
        <title>Liste des Directions</title>
        <meta name="description" content="Système de Gestion d'Assignation de Tâches" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* <main className={styles.main}> */}
      <main className={styles.main}>
        <ToastContainer
            position="top-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        <h2 className="fs-1 fw-bold mt-5 text-center">Création d&apos;une nouvelle direction</h2>
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
                    value={direction_name}
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
                    value={direction_acronym}
                  />
                </div>
               
                <div className="mb-3">
                  <label htmlFor="specify_director_id" className="form-label">
                    Voulez-vous spécifier le directeur?:
                  </label>
                  <select
                    className="form-select form-select-md"
                    aria-label=".form-select-sm example"
                    name="specify_director_id"
                    onChange={handleChange}
                    required
                    value={specify_director_id}
                  >
                    <option value="">
                      Veuillez répondre
                    </option>
                    <option value="Yes">
                      Oui
                    </option>
                    <option value="No">
                      Non
                    </option>
                    
                  </select>
                </div>
                {specify_director_id && specify_director_id === 'Yes' && <div className="mb-3">
                  <label htmlFor="director_id" className="form-label">
                    Direc(teur/trice) de la direction:
                  </label>
                  <select
                    className="form-select form-select-md"
                    aria-label=".form-select-sm example"
                    name="director_id"
                    onChange={handleChange}
                    required
                    value={director_id}
                  >
                    <option value={0}>
                      Choisir qui sera le directeur de la direction
                    </option>
                    {users &&
                      users.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.username}
                        </option>
                      ))}
                  </select>
                </div>}
                
                <div className="mb-3 ">
                  <button type="submit" className="btn btn-primary float-end">
                    <i className="bi bi-building-fill"></i> Créer la direction
                  </button>                  
                </div>
              </form>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}

export default AddDirections;