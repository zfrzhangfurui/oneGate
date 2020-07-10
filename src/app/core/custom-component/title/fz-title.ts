import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'fz-title',
    templateUrl: 'fz-title.html',
    styleUrls: ['fz-title.less']
})

export class FzTitle {
    @Input('title') title: string = 'title is required';
    @Input('icon') icon: string = 'none';
    @Input('iconToggle') iconToggle: boolean = true;
    constructor() { }
}