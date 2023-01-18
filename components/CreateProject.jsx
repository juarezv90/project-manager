import React, { useState } from "react";
import { CgRemoveR } from "react-icons/cg";

const CreateProject = ({ dispatch, destroy }) => {
  const [project, setProject] = useState({
    title: "",
    taskList: [],
    id: Date.now()
  });
  const [tags, setTags] = useState([]);
  const [taskItem, setTaskItem] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: "ADD", payload: project });
    destroy({});
  }

  function handleChange(event) {
    setProject({
      ...project,
      [event.target.name]: event.target.value,
      id: Date.now()
    });
  }

  function handleTags(event) {
    const inputs = event.target.value;
    const tagsArray = inputs?.split(",");

    setTags(tagsArray);
  }

  function handleAddTags() {
    setProject({
      ...project,
      tags: tags?.map((e) => e.trim()).map((e) => e.toUpperCase()),
      id: Date.now()
    });
  }

  function removeTag(id) {
    setTimeout(() => {
      setProject({
        ...project,
        tags: project.tags.filter((tag) => tag !== id)
      });
    }, 250);
  }

  return (
    <div className="w-[100%] ">
      <form onSubmit={handleSubmit} className="flex flex-col w-[400px] mx-auto">
        <p>Project Title</p>
        {projectTitle(project, handleChange)}
        <p>Project Description:</p>
        <textarea
          name="description"
          cols="25"
          rows="10"
          onChange={handleChange}
          placeholder="Project Description"
          required
        ></textarea>
        Tags: (optional)
        <textarea
          name="projectTags"
          cols="25"
          rows="2"
          onChange={handleTags}
          placeholder="Project Tags"
        ></textarea>
        <input
          type="button"
          className="border my-2 rounded max-w-[200px] w-[100px] py-1 cursor-pointer"
          onClick={handleAddTags}
          value="Add Tags"
        />
        <span className="flex flex-wrap w-[400px] gap-2 my-2 py-1">
          {project?.tags?.map((tag, id) => (
            <p
              key={id}
              className="bg-white text-xs border p-2 rounded-md shadow-md"
              onClick={() => removeTag(tag)}
            >
              {tag}
            </p>
          ))}
        </span>
        <p>
          Task:
          <input
            type="text"
            placeholder="Add Task"
            className="ml-2 border my-2 max-w-[200px] rounded px-2"
            onChange={(e) => setTaskItem(e.target.value)}
            value={taskItem}
          />
          <input
            form="tasks"
            type="button"
            value="+"
            className="border mx-2 rounded px-2 cursor-pointer"
            onClick={() => {
              setProject({
                ...project,
                taskList: [...project?.taskList, taskItem]
              })
              setTaskItem("");
            }}
          />
        </p>
        <div>
          {project.taskList.map((e, id) => (
            <div key={id}>
              <div
                
                className="flex justify-between items-center max-w-[50%]"
              >
                <p>{e}</p>
                <CgRemoveR
                  color="red"
                  onClick={() => {
                    setProject({
                      ...project,
                      taskList: project.taskList.filter((task) => task !== e)
                    });
                    setProject(current => {
                      const copy = {...current};

                      delete copy[`task${id}`];

                      return copy
                    })
                  }}
                />
              </div>
              <textarea rows="4" name={`task${id}`} onChange={handleChange}></textarea>
            </div>
          ))}
        </div>
        <span className="flex justify-center md:justify-start">
          <button
            className="border my-2 rounded max-w-[200px] w-[100px] py-1"
          >
            Submit
          </button>
          <input
            type="button"
            className="border my-2 rounded max-w-[200px] ml-2 w-[100px] py-1 cursor-pointer"
            value="Cancel"
            onClick={() => destroy({})}
          />
        </span>
      </form>
    </div>
  );
};

export default CreateProject;

function projectTitle(project, handleChange) {
  return (
    <input
      type="text"
      name="title"
      className="border my-2 max-w-[200px] rounded px-2"
      placeholder="Project Title"
      value={project.title}
      onChange={handleChange}
      required
    />
  );
}
