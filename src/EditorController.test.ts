import {EditorController} from './EditorController';
import {EditorView} from './EditorView';
import {UndoRedoHistory} from "./UndoRedoHistory";


jest.mock('./EditorView', () => {
    return {
        EditorView: jest.fn().mockImplementation(() => {
            return {
                onUndo: jest.fn(),
                onRedo: jest.fn(),
                onClear: jest.fn(),
                clearCanvas: jest.fn(),
                addTextToCanvas: jest.fn(),
                onCanvasClick: jest.fn(),
                createListNames: jest.fn(),
            };
        })
    };
});
jest.mock('./UndoRedoHistory', () => {
    return {
        UndoRedoHistory: jest.fn().mockImplementation(() => {
            return {
                undo: jest.fn(),
                redo: jest.fn(),
                clear: jest.fn(),
                add: jest.fn()
            };
        })
    };
});

const undoRedoHistoryMock = new UndoRedoHistory();
const editorView = new EditorView();
const editorController = new EditorController(editorView, undoRedoHistoryMock);

describe('EditorController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('handleUndo should call undo from history', () => {
        editorController.handleUndo();
        expect(undoRedoHistoryMock.undo).toBeCalled();
    });

    test('handleRedo should call redo from history', () => {
        editorController.handleRedo();
        expect(undoRedoHistoryMock.redo).toBeCalled();
    });

    test('handleClear should call clear from history and clearCanvas from view', () => {
        editorController.handleClear();
        expect(undoRedoHistoryMock.clear).toBeCalled();
        expect(editorView.clearCanvas).toBeCalled();
    });

    test('handleCanvasClick should do nothing if activeName is not set', () => {
        const event = new MouseEvent('click');
        editorController.handleCanvasClick(event);
        expect(editorView.addTextToCanvas).not.toHaveBeenCalled();
    });

    test('handleCanvasClick should add text to canvas if activeName is set', () => {
        const event = new MouseEvent('click');
        editorController.setActiveName('Alice');
        editorController.handleCanvasClick(event);
        expect(editorView.addTextToCanvas).toHaveBeenCalledWith(event, 'Alice', expect.any(Function));
    });
});
