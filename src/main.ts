import { EditorView } from "./EditorView";
import { EditorController } from "./EditorController";
import { UndoRedoHistory } from "./UndoRedoHistory";


document.addEventListener('DOMContentLoaded', () => {
    const view = new EditorView();
    const undoRedoHistory = new UndoRedoHistory()
    new EditorController(view, undoRedoHistory);
});
