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

      <div className="w-full">
        
      <div className="max-w-[1280px] mx-auto">
        <p>Project List:</p> 
        {state?.map((project, id)=>{
          return(
            <p key={id}>{project.title}</p>
          )})
        }
        <button className="bg-slate-400 rounded-lg p-1 shadow-md border-slate-900 border-[1px]" onClick={showForm}>
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
