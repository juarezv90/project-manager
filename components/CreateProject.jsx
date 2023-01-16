import React, { useState } from "react";

const CreateProject = ({ dispatch, destroy }) => {
  const [project, setProject] = useState({
    title: "",
    task: [],
    id: Date.now()
  });

  const [taskItem, setTaskItem] = useState("");
  const [tags, setTags] = useState([]);

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

  function handleTask() {
    setProject({
      ...project,
      task: [...project?.task, taskItem]
    });
    setTaskItem("");
  }

  return (
    <div className="w-[100%] ">
      <form onSubmit={handleSubmit} className="flex flex-col w-[400px] mx-auto">
        <p>Project Title</p>
        <input
          type="text"
          name="title"
          className="border my-2 max-w-[200px] rounded"
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
          className="border my-2 resize-none rounded"
          onChange={handleChange}
          placeholder="Project Description"
          required
        ></textarea>
        Tags: (optional)
        <textarea
          name="projectTags"
          cols="25"
          rows="2"
          className="border my-2 resize-none rounded"
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
              className="text-xs border p-2 rounded-md shadow-md"
              onClick={() => removeTag(tag)}
            >
              {tag}
            </p>
          ))}
        </span>
        <p>Task:</p>
        <span>
          <input
            type="text"
            name="tasks"
            className="border my-2 max-w-[200px] rounded"
            onChange={(e) => setTaskItem(e.target.value)}
            value={taskItem}
          />
          <input
            form="tasks"
            type="button"
            value="+"
            className="border mx-2 rounded px-2 cursor-pointer"
            onClick={handleTask}
          />
          {project.task.map((task, id) => (
            <p
              key={id}
              onClick={() => {
                setProject({
                  ...project,
                  task: project.task.filter((e, key) => key !== id)
                });
              }}
            >
              {task}
            </p>
          ))}
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
