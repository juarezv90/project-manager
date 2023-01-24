import React from "react";
import { CgRemoveR } from "react-icons/cg";

const DisplayProject = ({ project }) => {
  console.log(project);
  return (
    <div className="w-[80%] mx-auto">
      <p className="text-2xl font-semibold">{project.title}</p>
      <div className="ml-4">
        <p>Description: {project.description}</p>
        <div className="flex gap-2 py-2">
          <p>Tags:</p>
          {project.tags.map((tag, id) => (
            <p key={id} className="bg-white text-xs border px-2 pt-1 rounded-md shadow-md cursor-pointer">{tag.toUpperCase()}</p>
          ))}
        </div>
        <div>
          {project.taskList.map((task, id) => (
            <>
            {console.log(id)}
              <p className="mt-2 text-lg">{task}:</p>
              <p className="ml-4">{project[`task${id}`]}</p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayProject;
