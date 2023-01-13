import Head from "next/head";
import { useReducer, useState } from "react";
import { projectReducer, initialState } from "./state/projectState";

export default function Home() {
  const [state, dispatcher] = useReducer(projectReducer, initialState);
  const [showProjectForm, setShowProjectForm] = useState(true);

  const [project, setProject] = useState({
    title:"",
    id: 0,
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatcher({type:"ADD", payload:project})
  }
  const handleChange = (event) =>{
    setProject({...project, [event.target.name]: event.target.value})
  }

  return (
    <>
      <Head>
        <title>Next.js Project Manager</title>
        <meta name="description" content="Next.js Project Manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-[1280px] mx-auto">
        {state?.map((project, id)=>{
          return(
            <p key={id}>{project.title}</p>
          )})
        }
        <button className="bg-slate-400 rounded-lg p-1 shadow-md border-slate-900 border-[1px]">
          New Project
        </button>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="border-[1px] m-2"
              name="title"
              placeholder="Project Title"
              onChange={handleChange}
            />
            <button className="block">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
