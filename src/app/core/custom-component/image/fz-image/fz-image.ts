import { Component, AfterViewInit, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'fz-image',
    templateUrl: './fz-image.html',
    styleUrls: ['./fz-image.less'],
    animations: [

    ]
})


export class FzImage implements AfterViewInit {
    @ViewChild('img') img: ElementRef<HTMLImageElement>;
    @ViewChild('container1') container1: ElementRef<HTMLDivElement>;
    @Input('url') url: string = null;
    @Input('natualSize') natualSize: boolean = false;
    loadingSpinnerToggle: boolean = true;
    constructor(
        private http: HttpClient,
        private render: Renderer2
    ) { }
    ngAfterViewInit() {
        this.img.nativeElement.src = this.url;
        this.img.nativeElement.onload = () => {
            this.loadingSpinnerToggle = false;
            let realHeight = this.img.nativeElement.naturalHeight;
            let realWidth = this.img.nativeElement.naturalWidth;
            this.render.setAttribute(this.container1.nativeElement, 'width', realWidth.toString() + 'px')
            this.render.setAttribute(this.container1.nativeElement, 'height', realHeight.toString() + 'px')
            console.log(realHeight, realWidth);
        }


    }
}