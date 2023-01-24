import Head from "next/head";
import React, { useReducer, useState, useEffect } from "react";
import CreateProject from "../components/CreateProject";
import { projectReducer, initialState } from "./state/projectState";
import { CgRemoveR } from "react-icons/cg";
import DisplayProject from "../components/DisplayProject";
import content from "../public/data.json"

export default function Home() {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const [showProjectForm, setShowProjectForm] = useState();
  const [projectDisplay, setProjectDisplay] = useState(null)

  useEffect(() => {
    dispatch({type: "LOAD PROJECTS", payload: content.projects})
  },[]);
  

  function showForm() {
    setShowProjectForm({
      form: (
        <CreateProject
          dispatch={dispatch}
          destroy={setShowProjectForm}
          key={0}
        />
      )
    });
  }

  return (
    <>
      <Head>
        <title>Next.js Project Manager</title>
        <meta name="description" content="Next.js Project Manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="w-full h-screen">
        <div className="max-w-[1280px] mx-auto">
          <p className="ml-2">Project List:</p>
          {state?.map((project) => {
            return (
              <div key={project.id} className="flex items-center cursor-pointer">
                <p  className="ml-2" onClick={() => setProjectDisplay(project)}>
                  {project.title}
                </p>
                <CgRemoveR className="ml-4 text-red-500 rounded" onClick={() => dispatch({type: "REMOVE", payload: project.id})}/>
              </div>
            );
          })}
          
          <button onClick={showForm} onLoad={showForm} className="my-4">
            New Project
          </button>
          <div>{showProjectForm?.form}</div>
          <div className="flex">{projectDisplay !== null ? <DisplayProject project={projectDisplay} /> : null}</div>
        </div>
      </div>
    </>
  );
}
