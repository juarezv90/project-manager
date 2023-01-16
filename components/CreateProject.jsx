import React, { useState } from "react";

const CreateProject = ({ dispatch }) => {
  const [project, setProject] = useState({
    title: "",
    id: Date.now()
  });
  
  const [task, setTask] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: "ADD", payload: project });
  }


  function handleChange(event) {
    setProject({
      ...project,
      [event.target.name]: event.target.value,
      id: Date.now()
    });
  }


  function handleTags(event) {
        const tags = event.target.value
        const tagsArray = tags?.split(",");
        setProject({
            ...project,
            [event.target.name]: tagsArray?.map(e => e.trim()).map(e=> e.toUpperCase()),
            id: Date.now()
          });
  }


  return (
    <div className="w-[100%]">
      <form action={handleSubmit} className="flex flex-col w-[400px] mx-auto">
        <p>Project Title</p>
        <input
          type="text"
          name="title"
          className="border my-2 max-w-[200px]"
          placeholder="Project Title"
          value={project.title}
          onChange={handleChange}
          required
        />
        <p>Project Description:</p>
        <textarea
          name="description"
          cols="25"
          rows="10"
          className="border my-2 resize-none"
          onChange={handleChange}
          placeholder="Project Description"
        ></textarea>
        Tags: (optional)
        <textarea
          name="projectTags"
          cols="25"
          rows="5"
          className="border my-2 resize-none"
          onChange={handleTags}
          placeholder="Project Tags"
        ></textarea>
        <p>Task:</p>
        <span><input type="text" className="border my-2 max-w-[200px]"/><input type="button" value="+" className="border mx-2 rounded px-2 cursor-pointer"/></span>
        <button
          onClick={handleSubmit}
          className="border my-2 rounded max-w-[200px] mx-auto w-[200px] py-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
