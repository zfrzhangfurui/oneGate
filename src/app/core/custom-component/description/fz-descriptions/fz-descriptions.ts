import {
    Component,
    OnInit,
    ContentChildren,
    QueryList,
    AfterContentInit,
    TemplateRef,
    OnChanges,
    SimpleChanges,
    Input,
    ElementRef
} from '@angular/core';
import { FzDescriptionsItem } from '../fz-descriptions-item/fz-descriptions-item';
export interface DecscriptionsItemRenderProps {
    title: string;
    content: TemplateRef<void>;
    fzIcon: string;
    fzStateIcon: string;
    fzStateToggle: boolean;
}

@Component({
    selector: 'fz-descriptions',
    templateUrl: './fz-descriptions.html',
    styleUrls: ['./fz-descriptions.less']
})

export class FzDescriptions implements OnInit, AfterContentInit, OnChanges {
    @Input('col') col: number = 2;
    @ContentChildren(FzDescriptionsItem) items!: QueryList<FzDescriptionsItem>;
    itemMatrix: DecscriptionsItemRenderProps[][] = []
    stateIconToggle = false;
    constructor() { }

    ngOnInit() { }
    ngOnChanges(changes: SimpleChanges): void {
        // if (changes.nzColumn) {
        //   this.prepareMatrix();
        // }
    }
    ngAfterContentInit() {
        this.prepareMatrix();
    }
    private prepareMatrix(): void {
        if (!this.items) {
            return;
        }

        let currentRow: DecscriptionsItemRenderProps[] = [];
        let width = 0;

        const column = this.col - 1;
        const items = this.items.toArray();
        const length = items.length;
        const matrix: DecscriptionsItemRenderProps[][] = [];
        const flushRow = () => {
            matrix.push(currentRow);
            currentRow = [];
            width = 0;
        };

        for (let i = 0; i < length; i++) {
            const item = items[i];
            const { title, content, fzIcon, fzStateIcon, fzStateToggle } = item;
            // console.log('dao zhe la ');
            // console.log('title: ' + title, 'content: ' + content, 'fzIcon: ' + fzIcon);
            // If the last item make the row's length exceeds `nzColumn`, the last
            // item should take all the space left. This logic is implemented in the template.
            // Warn user about that.
            if (width >= column) {
                if (width > column) {
                    console.error(`"nzColumn" is ${column} but we have row length ${width}`);
                }
                currentRow.push({ title, content, fzIcon, fzStateIcon, fzStateToggle });
                flushRow();
            } else if (i === length - 1) {
                currentRow.push({ title, content, fzIcon, fzStateIcon, fzStateToggle });
                flushRow();
            } else {
                currentRow.push({ title, content, fzIcon, fzStateIcon, fzStateToggle });
                width++;
            }
        }
        // console.log(matrix);
        this.itemMatrix = matrix;
    }
}