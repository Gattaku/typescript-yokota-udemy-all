/// <reference path="./models/drag-drop.ts" />
/// <reference path="./models/project.ts" />
/// <reference path="./state/project-state.ts" />
/// <reference path="./util/validation.ts" />
/// <reference path="./decorators/autobind.ts" />
// / <reference path="./components/base-component.ts" />
// / <reference path="./components/project-item.ts" />
/// <reference path="./components/project-list.ts" />
/// <reference path="./components/project-input.ts" />

namespace App {
       
    const newPjt = new ProjectInput();
    const activePrjList = new ProjectList("active");
    const finishPjtList = new ProjectList("finished");
}
