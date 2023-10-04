import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/AdminHome.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import SideBar from "../../../components/sideBar";

const Administrators = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [toBeActivatedUser, setToBeActivatedUser] = useState({});
  const [admin_username, setAdmin_Username] = useState("");
  const [admin_email, setAdmin_Email] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  

  useEffect(() => {
    const fetchUsers = async () => {
      let allAdminUsers = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/AdminAccess/AdminUsers/getAllAdminUsers`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      let response = await allAdminUsers.json();
      setUsers(response.result);
    };

    // Function call
    fetchUsers();
  }, []);

  const handleActivateAccountSubmit = () => {
    // Function calls
  }


  const handleActivate =  async (datum) => {
    // let data = {...toBeActivatedUser, activate: 'activate'};
    let data = {...datum, activate: 'activate'};
    let a = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Users/updateUser`,
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
      toast.success("Activation de compte éffectuée avec succès!", {
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
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    let data = selectedUser;
    let a = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Users/updateUser`,
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
        <title>Liste des Administrateurs</title>
        <meta name="description" content="Gestion d'Assignation de Tâches" />
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
        <h2 className="fs-1 fw-bold mt-5 text-center">Liste des Administrateurs</h2>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="">
              <SideBar />
            </div>
          </div>
          <div className="col-md-8 mt-1">
            <Link href={`${router.pathname.replace('/administrators', '')}/addAdministrator`}>
              <button
                type="button"
                className="btn btn-secondary mb-1 fw-bold float-end"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                <i className="bi bi-plus-square-dotted"></i>&nbsp;Créer un nouveau compte Administrateur
              </button>
            </Link>
            <table className="table table-dark table-hover table-responsive table-striped table-bordered border-primary">
              <thead>
                <tr>
                  <th scope="col">#ID Administrateur</th>
                  <th scope="col">Nom et Prénom</th>
                  <th scope="col">Adresse admin_Email</th>
                  <th scope="col">Date de Création</th>
                  <th scope="col">Activé?</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  Object.keys(users).map((item, index) => {
                    return (
                      <tr key={index}>
                        <td scope="row">
                          <Link
                            className="cursor-pointer"
                            passHref={true}
                            href={`/user/${users[item].admin_id}`}
                          >
                            <span>#000{users[item].admin_id}</span>
                          </Link>
                        </td>
                        <td>{users[item].admin_username}</td>
                        <td>{users[item].admin_email}</td>
                        <td>
                          {String(users[item].admin_created_on).substr(0, 10) +
                            " à " +
                            String(users[item].admin_created_on).substr(11, 8)}
                        </td>
                        <td>
                          {" "}
                          <span
                            className={`badge rounded-pill ${
                              users[item].activated === "Yes"
                                ? "bg-success"
                                : "bg-info text-black"
                            }`}
                          >
                            {" "}
                            {users[item].activated &&
                            users[item].activated !== "Yes"
                              ? "Non"
                              : "Oui"}{" "}
                          </span>{" "}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-info"
                            onClick={() => setSelectedUser(users[item])}
                            data-bs-toggle="modal"
                            data-bs-target="#viewStaffModal"
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
                            onClick={() => setSelectedUser(users[item])}
                            type="button"
                            className="btn btn-sm btn-success"
                            data-bs-toggle="modal"
                            data-bs-target="#editStaffModal"
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
                            onClick={() =>
                              alert("êtes vous sûre de vouloir supprimer?")
                            }
                            type="button"
                            className="btn btn-sm btn-danger"
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
                          {users[item].activated === "No" && (
                            <button
                              onClick={() => {
                                handleActivate(users[item]);
                              }}
                              type="button"
                              className="btn btn-sm btn-primary "
                            >
                              <span className="">Activer le compte</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            {/* <!-- Modal View Staff Start --> */}
            <div
              className="modal fade"
              id="viewStaffModal"
              tabIndex="-1"
              aria-labelledby="viewStaffModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3
                      className="modal-title text-center"
                      id="viewStaffModalLabel"
                    >
                      <center>Détails de l&apos;employé</center>
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
                      <table className="table table-responsive table-bordered table-striped">
                        <tbody>
                          <tr>
                            <td>Identifiant:</td>
                            <td>{selectedUser && selectedUser.admin_id}</td>
                          </tr>
                          <tr>
                            <td>Nom et Prénom:</td>
                            <td>{selectedUser && selectedUser.admin_username}</td>
                          </tr>
                          <tr>
                            <td>Adresse admin_Email:</td>
                            <td>{selectedUser && selectedUser.admin_email}</td>
                          </tr>
                          <tr>
                            <td>Mot de Passe:</td>
                            <td>{selectedUser && selectedUser.password && selectedUser.password.substr(0, 30) + '...'}</td>
                          </tr>
                          <tr>
                            <td>Type de Compte:</td>
                            <td>{selectedUser && selectedUser.category === 'Simple User'? 'Employé': 'Administrateur Système' }</td>
                          </tr>
                          <tr>
                            <td>Date de Création:</td>
                            <td>{selectedUser.admin_created_on && selectedUser.admin_created_on.substr(0, 10)}</td>
                          </tr>
                          <tr>
                            <td>Compte Activé?:</td>
                            <td>{selectedUser && selectedUser.activated === 'Yes'? 'Oui' : 'Non'}</td>
                          </tr>
                        </tbody>
                      </table>
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
                  </div>
                </div>
              </div>
            </div>
            {/* Modal View Staff End */}

            {/* <!-- Modal Edit Staff Start --> */}
            <div
              className="modal fade"
              id="editStaffModal"
              tabIndex="-1"
              aria-labelledby="editStaffModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3
                      className="modal-title text-center"
                      id="editStaffModalLabel"
                    >
                      <center>Modification de l&apos;employé</center>
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
                      <form onSubmit={handleUpdateSubmit} method="POST">
                        <div className="mb-3">
                          <label htmlFor="admin_username" className="form-label">
                            Nom de l&apos;employé:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="admin_username"
                            id="admin_username"
                            aria-describedby="taskHelp"
                            onChange={handleChange}
                            value={selectedUser.admin_username}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="admin_email" className="form-label">
                            admin_Email de l&apos;employé:
                          </label>
                          <input
                            type="admin_email"
                            className="form-control"
                            name="admin_email"
                            id="admin_email"
                            aria-describedby="taskHelp"
                            onChange={handleChange}
                            value={selectedUser.admin_email}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Mot de passe de l&apos;employé:
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              className="form-control relative"
                              name="password"
                              id="password"
                              aria-describedby="passwordHelp"
                              onChange={handleChange}
                              value={selectedUser.password}
                              required
                            />
                            <span className="absolute top-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-eye-slash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                              </svg>
                            </span>
                          </div>
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
            {/* Modal Edit Staff End */}


            
          </div>
          {/* <ModalForm /> */}

        </div>

        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js" integrity="sha384-j0CNLUeiqtyaRmlzUHCPZ+Gy5fQu0dQ6eZ/xAww941Ai1SxSY+0EQqNXNE6DZiVc" crossOrigin="anonymous"></Script>
      </main>
    </div>
  );
}

export default Administrators;