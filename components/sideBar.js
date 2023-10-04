import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";


const SideBar = () => {
  return (
    <div className="sidebar fixed-right bg-dark" role="cdb-sidebar">
      <div className="sidebar-container ">
        {/* <div className="sidebar-header">
          <a className="sidebar-brand">Contrast</a>
          <a className="sidebar-toggler">
            <i className="fa fa-bars"></i>
          </Link>
        </div> */}
        <div className="sidebar-nav">
          <div className="sidenav">
            <Link href={`${process.env.NEXT_PUBLIC_HOST}/Admin/Administrators/administrators`} className="sidebar-item">
              <div className="btn text-white fs-5 fw-bold sidebar-item-content mb-2">
                {/* <i className="fa fa-th-large sidebar-icon sidebar-icon-lg"></i> */}
                <i className="bi bi-person-fill-gear sidebar-icon"></i>&nbsp;
                <span>Gérer les Comptes Admininistrateurs</span>
                {/* <div className="suffix">
                  <div className="badge rounded-pill bg-danger">new</div>
                </div> */}
                    <hr />
              </div>
            </Link> 
           <Link href={`${process.env.NEXT_PUBLIC_HOST}/Admin/Staffs/staffs`} className="sidebar-item">
              <div className="btn text-white fs-5 fw-bold sidebar-item-content mb-2">
                {/* <i className="fa fa-sticky-note sidebar-icon"></i> */}
                <i className="bi bi-people-fill sidebar-icon"></i>&nbsp;
                <span>Gérer les Comptes Employés</span> <hr />
              </div>
            </Link>
            <Link href={`${process.env.NEXT_PUBLIC_HOST}/Admin/Directions/directions`} className="sidebar-item">
              <div className="btn text-white fs-5 fw-bold sidebar-item-content mb-2">
                {/* <i className="fa fa-sticky-note sidebar-icon"></i> */}
                <i className="bi bi-building-fill sidebar-icon"></i>&nbsp;
                <span>Gérer les Directions</span> <hr />
              </div>
            </Link>
           <Link href={`${process.env.NEXT_PUBLIC_HOST}/Admin/Tasks/tasks`} className="sidebar-item">
              <div className="btn text-white fs-5 fw-bold sidebar-item-content mb-2">
                {/* <i className="fa fa-sticky-note sidebar-icon"></i> */}
                <i className="bi bi-list-task sidebar-icon"></i>&nbsp;
                <span>Gérer les Tâches</span> <hr />
              </div>
            </Link>
          </div>
          {/* <div className="sidebar-footer">Sidebar Footer</div> */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
