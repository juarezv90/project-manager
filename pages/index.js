import Head from "next/head";
import React, { useReducer, useState } from "react";
import CreateProject from "../components/CreateProject";
import { projectReducer, initialState } from "./state/projectState";
import { CgRemoveR } from "react-icons/cg";

export default function Home() {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const [showProjectForm, setShowProjectForm] = useState();

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
      {console.log(state)}

      <div className="w-full h-screen">
        <div className="max-w-[1280px] mx-auto">
          <p className="ml-2">Project List:</p>
          {state?.map((project, id) => {
            return (
              <div key={id} className="flex items-center">
                <p  className="ml-2">
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
        </div>
      </div>
    </>
  );
}
