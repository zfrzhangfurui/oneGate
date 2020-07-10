import { Component, Input, ElementRef, OnInit, ViewChild, HostListener, EventEmitter, Output } from "@angular/core";
import { of } from 'rxjs';
@Component({
    selector: 'custom-select',
    templateUrl: './select.html',
    styleUrls: ['./select.less']
})

export class Select implements OnInit {
    @ViewChild('select') select: ElementRef;
    @Output() valueChange = new EventEmitter();
    @Input('selectItem') content: Array<string>;
    // @HostListener('click', ['$event'])
    // onClick(btn) {
    //     // if (this.selectToggle) {
    //     //     this.selectToggle = !this.selectToggle;
    //     // }
    //     console.log(btn);
    // }
    selectToggle: boolean = false;

    selectValue;
    //selElmnt = this.customSelect.nativeElement;
    selectClicked() {
        this.selectToggle = !this.selectToggle;
        // console.log(this.selectToggle);
    }
    itemClicked(item) {
        this.selectValue = item;
        this.selectToggle = !this.selectToggle;
        this.select.nativeElement.innerHTML = this.selectValue;
        this.valueChange.emit(this.selectValue);
    }

    constructor() {
    }

    ngOnInit() {
    }
}