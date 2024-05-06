import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Command } from "./undoRedoHistory";

export class EditorView {
    private svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;

    constructor() {
        this.svg = d3.select('#canvas')
            .append('svg');
    }

    createListNames(nameList: any, callback: (name: string) => void): void {
        const sidebar = document.getElementById('sidebar');
        const list = document.createElement('ul');

        list.classList.add('list-group');
        nameList.forEach((name: string) => this.createName(name, callback, list));
        sidebar!.appendChild(list);
    }

    createName(name: string, callback: (name: string) => void, list: HTMLUListElement): void {
        const listItem = document.createElement('button');
        const textNode = document.createTextNode(name);

        listItem.classList.add('list-group-item', 'list-group-item-action');
        listItem.appendChild(textNode);
        listItem.addEventListener('click', () => this.onNameClicked(callback));

        list!.appendChild(listItem);
    }

    onCanvasClick(callback: (event: Event) => void): void {
        this.svg.on('click', callback);
    }

    onNameClicked(callback: (name: string) => void): void {
        const sidebar = document.getElementById('sidebar');

        sidebar!.addEventListener('click', (event: any) => {
            const target = event.target;

            if (target!.classList.contains('list-group-item')) {
                const previouslyActive = sidebar!.querySelector('.active');
                if (previouslyActive) {
                    previouslyActive.classList.remove('active');
                }
                target!.classList.add('active');
                const name = target!.textContent;
                callback(name)
            }
        });
    }

    onUndo(callback: () => void): void {
        const undoButton = document.getElementById('undo');
        undoButton!.addEventListener('click', callback);
    }

    onRedo(callback: () => void): void {
        const redoButton = document.getElementById('redo');
        redoButton!.addEventListener('click', callback);
    }

    onClear(callback: () => void): void {
        const clearButton = document.getElementById('clear');
        clearButton!.addEventListener('click', callback);
    }

    clearCanvas(): void {
        this.svg.selectAll('text').remove();
    }

    addTextToCanvas(event: Event, activeName: string, callback: (command: Command) => void): void {
        const [x, y] = d3.pointer(event, event.currentTarget);

        let text = this.svg
            .append('text')
            .attr('x', x)
            .attr('y', y)
            .text(activeName);

        const commandText = activeName;

        callback({
            undo: () => text.remove(),
            redo: () => {
                if (!document.body.contains(text.node())) {
                    text = this.svg.append('text');
                }

                text
                    .attr('x', x)
                    .attr('y', y)
                    .text(commandText)
                    .raise()
            }
        });
    }
}
