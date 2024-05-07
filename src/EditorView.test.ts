import { EditorView } from './EditorView';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';

describe('EditorView', () => {
    let view: EditorView;
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        container.id = 'canvas';
        document.body.appendChild(container);

        view = new EditorView();
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('should create list names with active items', () => {
        const sidebar = document.createElement('div');
        sidebar.id = 'sidebar';
        document.body.appendChild(sidebar);

        const namesList = ['Natalia', 'Dmitrii'];
        const setActiveName = jest.fn();
        view.createListNames(namesList, setActiveName);

        expect(sidebar.querySelector('ul')).toBeInTheDocument();
        expect(sidebar.querySelectorAll('button')).toHaveLength(namesList.length);

        const firstItem = sidebar.querySelector('button')!;
        fireEvent.click(firstItem);

        expect(setActiveName).toHaveBeenCalledWith('Natalia');
        expect(firstItem.classList.contains('active')).toBeTruthy();

        document.body.removeChild(sidebar);
    });

    it('should bind onUndo callback and trigger it when undo button is clicked', () => {
        const undoButton = document.createElement('button');
        undoButton.id = 'undo';
        document.body.appendChild(undoButton);

        const onUndo = jest.fn();
        view.onUndo(onUndo);

        fireEvent.click(undoButton);
        expect(onUndo).toHaveBeenCalled();

        document.body.removeChild(undoButton);
    });

    it('should bind onRedo callback and trigger it when redo button is clicked', () => {
        const redoButton = document.createElement('button');
        redoButton.id = 'redo';
        document.body.appendChild(redoButton);

        const onRedo = jest.fn();
        view.onRedo(onRedo);

        fireEvent.click(redoButton);
        expect(onRedo).toHaveBeenCalled();

        document.body.removeChild(redoButton);
    });

    it('should bind onClear callback and trigger it when clear button is clicked', () => {
        const clearButton = document.createElement('button');
        clearButton.id = 'clear';
        document.body.appendChild(clearButton);

        const onClear = jest.fn();
        view.onClear(onClear);

        fireEvent.click(clearButton);
        expect(onClear).toHaveBeenCalled();

        document.body.removeChild(clearButton);
    });

    it('should call the provided callback when addTextToCanvas is called', () => {
        const callback = jest.fn();
        const mockEvent = { currentTarget: container } as unknown as Event;
        view.addTextToCanvas(mockEvent, 'Test Text', callback);

        expect(callback).toHaveBeenCalled();
    });
});
