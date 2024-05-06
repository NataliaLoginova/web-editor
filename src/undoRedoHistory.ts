import { CONFIG } from './config';

export interface Command {
    undo: () => void,
    redo: () => void
}

export class UndoRedoHistory {
    private undoStack: Command[] = [];
    private redoStack: Command[] = [];
    private readonly maxSteps: number = CONFIG.MAX_STEP;
    private undoIndex = -1;
    private redoIndex = -1;

    public add(command: Command) {
        if (this.undoStack.length < this.maxSteps) {
            this.undoStack.push(command);
            this.redoStack = [];
            this.redoIndex = -1;
            this.undoIndex = this.undoStack.length - 1;
        }
    }

    public undo() {
        const command = this.undoStack[this.undoIndex];
        if (command) {
            command.undo();
            this.redoStack.push(command);
            this.undoIndex--;
            this.redoIndex = this.redoStack.length - 1;
        }
    }

    public redo() {
        const command = this.redoStack[this.redoIndex];
        if (command) {
            command.redo();
            this.undoStack.push(command);
            this.undoIndex = this.undoStack.length - 1;
            this.redoIndex--;
        }
    }

    public clear() {
        this.undoStack = [];
        this.redoStack = [];
        this.undoIndex = -1;
        this.redoIndex = -1;
    }
}
