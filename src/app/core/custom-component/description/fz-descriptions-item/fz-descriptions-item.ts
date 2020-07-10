import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';


@Component({
    selector: 'fz-descriptions-item',
    templateUrl: 'fz-descriptions-item.html',
    styleUrls: ['fz-descriptions-item.less']
})

export class FzDescriptionsItem implements OnInit {
    @ViewChild(TemplateRef, { static: true }) content!: TemplateRef<void>;
    @Input('title') title: string;
    @Input('fzIcon') fzIcon: string;
    @Input('fzStateIcon') fzStateIcon: string;
    @Input('fzStateToggle') fzStateToggle: boolean;
    constructor() { }

    ngOnInit() { }

}