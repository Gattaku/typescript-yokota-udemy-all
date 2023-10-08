import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

namespace App {
  const newPjt = new ProjectInput();
  const activePrjList = new ProjectList("active");
  const finishPjtList = new ProjectList("finished");
}

// console.log("ogata");
