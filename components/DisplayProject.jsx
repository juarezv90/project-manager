import React from "react";
import { CgRemoveR } from "react-icons/cg";

const DisplayProject = ({ project }) => {
  console.log(project.tags);
  return (
    <div className="w-[80%] mx-auto">
      <p>{project.title}</p>
      <div className="ml-4">
        <p>Description: {project.description}</p>
        <div className="flex gap-2">
          <p>Tags:</p>
          {project.tags.map((tag, id) => (
            <p key={id} className="bg-white text-xs border px-2 rounded-md shadow-md cursor-pointer">{tag.toUpperCase()}</p>
          ))}
        </div>
        <div>
          {project.taskList.map((task, id) => (
            <>
              <p>{task}</p>
              <p>{project[`${task.replace(" ", "")}`]}</p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayProject;
