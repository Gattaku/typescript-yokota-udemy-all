import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";
var App;
(function (App) {
    const newPjt = new ProjectInput();
    const activePrjList = new ProjectList("active");
    const finishPjtList = new ProjectList("finished");
})(App || (App = {}));
//# sourceMappingURL=app.js.map