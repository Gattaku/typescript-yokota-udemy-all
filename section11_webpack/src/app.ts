import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

namespace App {
  const newPjt = new ProjectInput();
  const activePrjList = new ProjectList("active");
  const finishPjtList = new ProjectList("finished");
}
