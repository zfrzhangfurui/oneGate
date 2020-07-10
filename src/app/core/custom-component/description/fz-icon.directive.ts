import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';
@Directive({
    selector: '[fzIcon]'
})

export class FzIconDirective implements OnInit {
    @Input('iconType') iconType: string = null;
    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) {


    }

    ngOnInit() {
        if (this.iconType !== null) {
            let iconURL;
            // console.log(this.iconType);
            switch (this.iconType) {

                case 'batchFolding': iconURL = '/assets/svgs/Batch-folding.svg'; break;
                case 'copyRight': iconURL = '/assets/svgs/copyright.svg'; break;
                case 'detail': iconURL = '/assets/svgs/detail.svg'; break;
                case 'diff': iconURL = '/assets/svgs/diff.svg'; break;
                case 'fileImage': iconURL = '/assets/svgs/file-image.svg'; break;
                case 'image': iconURL = '/assets/svgs/image.svg'; break;
                case 'infoCircle': iconURL = '/assets/svgs/info-circle.svg'; break;
                case 'judgeBySelf': iconURL = '/assets/svgs/judgeBySelf.svg'; break;
                case 'moneyCollect': iconURL = '/assets/svgs/money-collect.svg'; break;
                case 'new': iconURL = '/assets/svgs/new.svg'; break;
                case 'old': iconURL = '/assets/svgs/old.svg'; break;
                case 'tag': iconURL = '/assets/svgs/tag.svg'; break;
                case 'tags': iconURL = '/assets/svgs/tags.svg'; break;
                case 'timeCircle': iconURL = '/assets/svgs/time-circle.svg'; break;
                case 'user': iconURL = '/assets/svgs/user.svg'; break;
            }
            this.renderer.setProperty(this.element.nativeElement, 'data', iconURL);
        }
    }
}