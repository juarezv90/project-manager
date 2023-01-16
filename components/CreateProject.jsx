import React, { useState } from "react";

const CreateProject = ({ dispatch, destroy }) => {
  const [project, setProject] = useState({
    title: "",
    id: Date.now()
  });

  const [task, setTask] = useState([]);
  const [taskItem, setTaskItem] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: "ADD", payload: project });
    destroy({})
  }

  function handleChange(event) {
    setProject({
      ...project,
      [event.target.name]: event.target.for.value,
      id: Date.now()
    });
  }

  function handleTags(event) {
    const tags = event.target.value;
    const tagsArray = tags?.split(",");
    setProject({
      ...project,
      [event.target.name]: tagsArray
        ?.map((e) => e.trim())
        .map((e) => e.toUpperCase()),
      id: Date.now()
    });
  }

  function handleCancel(){
    destroy({});
  }

  function handleTask() {
    setTask([...task, taskItem])
  }

  return (
    <div className="w-[100%]">
      <form onSubmit={handleSubmit} className="flex flex-col w-[400px] mx-auto">
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
          required
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
        <button onClick={handleAddTags}>Add Tags</button>

        {project?.projectTags?.map((tag,id) => <p key={id}>{tag}</p>)}
        <p>Task:</p>
        <span>
          <input type="text" name="tasks" className="border my-2 max-w-[200px]" onChange={e=> setTaskItem(e.target.value)}/>
          <input
            form="tasks"
            type="button"
            value="+"
            className="border mx-2 rounded px-2 cursor-pointer"
            onClick={handleTask}
          />
          {task.map((task,id) => <p key={id}>{task}</p>)}
        </span>
        <span className="flex">
          <button
            type="submit"
            className="border my-2 rounded max-w-[200px] w-[100px] py-1"
          >
            Submit
          </button>
          <input
            type="button"
            className="border my-2 rounded max-w-[200px] ml-2 w-[100px] py-1"
            value="Cancel"
            onClick={handleCancel}
          />
        </span>
      </form>
    </div>
  );
};

export default CreateProject;
