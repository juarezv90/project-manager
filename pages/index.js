import Head from "next/head";
import React, { useReducer, useState } from "react";
import CreateProject from "../components/CreateProject";
import { projectReducer, initialState } from "./state/projectState";

export default function Home() {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const [showProjectForm, setShowProjectForm] = useState();

  function showForm() {
    setShowProjectForm( { form: 
      <CreateProject dispatch={dispatch}  destroy={setShowProjectForm} key={0}/>
    } )
    
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
        {state?.map((project, id)=>{
          return(
            <p key={id} className="ml-2">{project.title}</p>
          )})
        }
        <button onClick={showForm} onLoad={showForm}>
          New Project
        </button>
        <div>
          {showProjectForm?.form}
        </div>
      </div>
      </div>

    </>
  );
}
