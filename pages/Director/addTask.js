import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Select from "react-select";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [tasktitle, setTasktitle] = useState("");
  const [tasktype, setTasktype] = useState('');
  const [starting_date, setStarting_date] = useState("");
  const [ending_date, setEnding_date] = useState("");
  const [user_ids, setUser_ids] = useState([]);
  const [teamleader_id, setTeamleader_id] = useState(null);
  const [comment_director, setComment_director] = useState("");
  const [users, setUsers] = useState([]);
  const [distinctUsers, setDistinctUsers] = useState([]);


  useEffect(() => {
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

    const fetchTasks = async () => {
      let allTasks = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Tasks/getAllTasks`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      let response = await allTasks.json();
      setTasks(response.result);
    };

    // Function calls
    fetchTasks();
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchDistinctUsers = async () => {
      let data = { teamleader_id };

      let allDistinctUsers = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Users/getAllDistinctUsers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      let response = await allDistinctUsers.json();
      setDistinctUsers(response.result);
    };

    // Function call
    if (teamleader_id !== null) fetchDistinctUsers();
  }, [teamleader_id]);

  const handleChange = (e) => {
    if (e.target.name == "tasktitle") setTasktitle(e.target.value);
    if (e.target.name == "tasktype") setTasktype(e.target.value);
    if (e.target.name == "starting_date") setStarting_date(e.target.value);
    if (e.target.name == "ending_date") setEnding_date(e.target.value);
    if (e.target.name == "duration") setDuration(e.target.value);
    if (e.target.name == "user_ids") {
      let updatedOptions = [...e.target.options]
        .filter((option) => option.selected)
        .map((x) => x.value);

      setUser_ids(updatedOptions);
    }
    if (e.target.name == "teamleader_id") setTeamleader_id(e.target.value);
    if (e.target.name == "comment_director")
      setComment_director(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    if (tasktype !== null && tasktype === "Collective")
      data = { tasktitle, starting_date, ending_date, comment_director, teamleader_id, tasktype, user_ids };
    else
      data = { tasktitle, starting_date, ending_date, comment_director, teamleader_id, tasktype };

    // fetch(''); // Fetch() API
    let result = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Tasks/postTask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await result.json();

    setTasktitle("");
    setStarting_date("");
    setEnding_date("");
    setComment_director("");
    setTasktype('');
    setTeamleader_id(null);

    if (response.success) {
      
      toast.success("Tâche créée avec succès!", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push(`${router.pathname}/staffs`)
      }, 3000);
    }
    else {
      toast.error(response.error, {
        position: "top-left",
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
        <title>Add Task</title>
        <meta name="description" content="Page de Création de Tâche" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

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
        <h2 className="fs-1 fw-bold">Création de nouvelle tâche</h2>
        <div className="col-md-6 bg-secondary p-2 text-white fw-bolder">
          <form onSubmit={handleSubmit} method="POST">
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
                required
                value={tasktitle}
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
                  required
                  value={starting_date}
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
                  min={`${starting_date && starting_date !== ""? starting_date : ''}`}
                  onChange={handleChange}
                  required
                  value={ending_date}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Type de la tâche:
              </label>
              <select
                className="form-select form-select-md"
                aria-label=".form-select-sm example"
                name="tasktype"
                onChange={handleChange}
                value={tasktype}
                required
              >
                <option value={''}>
                  Choisir le type de la tâche à assigner
                </option>
                <option value="Individual">Individuelle</option>
                <option value="Collective">Collective</option>
              </select>
            </div>

            {tasktype && tasktype === "Individual" && (
              <>
                <div className="mb-3">
                  <label htmlFor="teamleader_id" className="form-label">
                    Assigner à:
                  </label>
                  <select
                    className="form-select form-select-md"
                    aria-label=".form-select-sm example"
                    name="teamleader_id"
                    onChange={handleChange}
                    required
                    value={teamleader_id}
                  >
                    <option value={0} >
                      Choisir à quel staff assigner la tâche
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

            {tasktype && tasktype === "Collective" && (
              <>
                <div className="mb-3 d-flex">
                  <div
                    className={
                      tasktype &&
                      tasktype === "Collective" &&
                      teamleader_id &&
                      teamleader_id !== null
                        ? "col-sm-5"
                        : "col-sm-12"
                    }
                  >
                    <label htmlFor="teamleader_id" className="form-label">
                      Responsable de la tâche:
                    </label>
                    <select
                      className="form-select form-select-md"
                      aria-label=".form-select-sm example"
                      name="teamleader_id"
                      onChange={handleChange}
                      required
                      value={teamleader_id}
                    >
                      <option value={null} >
                        Qui est le Responsable?
                      </option>
                      {users &&
                        users.map((user) => (
                          <option key={user.user_id} value={user.user_id}>
                            {user.username}
                          </option>
                        ))}
                    </select>
                  </div>

                  {tasktype &&
                    tasktype === "Collective" &&
                    teamleader_id &&
                    teamleader_id !== null && (
                      <div className="col-sm-7 mx-1">
                        <label htmlFor="user_ids" className="form-label">
                          Les autres membres du groupe:
                        </label>
                        <select
                          className="form-select form-select-md"
                          aria-label=".form-select-sm example"
                          name="user_ids"
                          onChange={handleChange}
                          multiple
                          required
                          value={user_ids}
                        >
                          <option value={null} disabled>
                            Utilisez [ctrl + click gauche] pour multi-choix
                          </option>
                          {distinctUsers &&
                            distinctUsers.map((user) => (
                              <option key={user.user_id} value={user.user_id}>
                                {user.username}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
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
                required
                value={comment_director}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Créer la tâche
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
