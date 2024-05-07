import { UndoRedoHistory } from './UndoRedoHistory';

describe('UndoRedoHistory', () => {
    let history: UndoRedoHistory;

    beforeEach(() => {
        history = new UndoRedoHistory();
    });

    test('should execute undo', () => {
        const command = { undo: jest.fn(), redo: jest.fn() };
        history.add(command);
        history.undo();

        expect(command.undo).toHaveBeenCalled();
    });

    test('should execute redo', () => {
        const command = { undo: jest.fn(), redo: jest.fn() };
        history.add(command);
        history.undo();
        history.redo();

        expect(command.redo).toHaveBeenCalled();
    });

    test('should clear history', () => {
        const command = { undo: jest.fn(), redo: jest.fn() };
        history.add(command);
        history.clear();
        history.undo();
        history.redo();

        expect(command.undo).not.toHaveBeenCalled();
        expect(command.redo).not.toHaveBeenCalled();
    });
});
