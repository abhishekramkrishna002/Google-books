import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';
import { Book } from './book';

@Component({
    selector: 'main',
    templateUrl: '/assets/html/app.component.html'
})



export class AppComponent {
    private appService: AppService;
    public bookName: string;
    public totalRecords:number=0;
    public startIndex: number = 0;
    public dirtyBit: boolean=true;
    public books: Array<Book> = new Array<Book>();
    constructor(appService: AppService) {
        this.appService = appService;
    }
    search(event: any) {
        
        if (event.which === 13) {
            this.dirtyBit=false;
            this.startIndex=0;
            console.dir(this.bookName);
            this.appService.getBooksFromApi(this.bookName, this.startIndex).subscribe(
                res => { this.books=(res.books);this.totalRecords=res.count;}
            );
        }
        else
        {
            this.dirtyBit=true;
        }
        

    }

    @HostListener('window:scroll', ['$event'])
    doSomething(event) {
//        console.dir(event);
        var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        let body = document.body, html = document.documentElement;
        let docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        let windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.startIndex+=10;
            this.appService.getBooksFromApi(this.bookName, this.startIndex).subscribe(
                res => { this.books=this.books.concat(res.books) }
            );
        }
    }
}
