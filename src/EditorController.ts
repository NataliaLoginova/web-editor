import { NAMES_LIST } from './namesList';
import { UndoRedoHistory } from './undoRedoHistory';
import { EditorView } from './EditorView';

export class EditorController {
    private activeName = null;
    private undoRedoHistory: UndoRedoHistory;
    private editorView: any;

    constructor(editorView: EditorView) {
        this.editorView = editorView;
        this.undoRedoHistory = new UndoRedoHistory();
        this.editorView.onUndo(this.handleUndo.bind(this));
        this.editorView.onRedo(this.handleRedo.bind(this));
        this.editorView.onClear(this.handleClear.bind(this));
        this.editorView.onCanvasClick(this.handleCanvasClick.bind(this));
        this.editorView.createListNames(NAMES_LIST, this.setActiveName.bind(this));
    }

    setActiveName(name: any): void {
        this.activeName = name;
    }

    handleUndo(): void {
        this.undoRedoHistory.undo();
    }

    handleRedo(): void {
        this.undoRedoHistory.redo();
    }

    handleClear(): void {
        this.undoRedoHistory.clear();
        this.editorView.clearCanvas();
    }

    handleCanvasClick(event: Event): void {
        if (!this.activeName) return;

        this.editorView.addTextToCanvas(event, this.activeName,(command: any) => {
            this.undoRedoHistory.add(command);
        });

    }
}
