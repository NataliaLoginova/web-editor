import { EditorView } from "./EditorView";
import { EditorController } from "./EditorController";


document.addEventListener('DOMContentLoaded', () => {
    const view = new EditorView();
    new EditorController(view);
});
