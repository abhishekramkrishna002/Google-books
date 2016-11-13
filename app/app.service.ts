import { Injectable } from '@angular/core';
import { Stub } from './stub';
import { Book } from './book';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class AppService {

    private appKey:string="AIzaSyBgaSjDrT918iq3Ns2P1D2n7MnjdZjP22k";
    
    
    constructor(private http: Http) { }
    
    getBooks() {
        let books: Array<Book> = new Array<Book>();
        let bookResponse = Stub.search;
        for (let book of bookResponse.items) {
            books.push({
                title: book.volumeInfo.title,
                subTitle: book.volumeInfo.subtitle,
                categories: book.volumeInfo.categories,
                authors: book.volumeInfo.authors,
                rating: book.volumeInfo.averageRating,
                pageCount: book.volumeInfo.pageCount,
                image: book.volumeInfo.imageLinks.thumbnail,
                description: book.volumeInfo.description,
                isbn: book.volumeInfo.industryIdentifiers,
                previewLink: book.volumeInfo.previewLink
            });

        }
        console.dir(books);
        return Promise.resolve(books);
    }

    getBooksFromApi(bookName:string,startIndex:number): Observable<any> {
        let getBooksUrl: string = "https://www.googleapis.com/books/v1/volumes?q=" + bookName+"&startIndex="+startIndex+"&key="+this.appKey;
        
        return this.http.get(getBooksUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
//        console.dir(body);
        let books: Array<Book> = new Array<Book>();
        let bookResponse = body;
        for (let book of bookResponse.items) {
//           console.dir(book);
            books.push({
                title: book.volumeInfo.title,
                subTitle: book.volumeInfo.subtitle,
                categories: book.volumeInfo.categories,
                authors: book.volumeInfo.authors,
                rating: book.volumeInfo.averageRating,
                pageCount: book.volumeInfo.pageCount,
                image: book.volumeInfo.imageLinks === undefined?'':book.volumeInfo.imageLinks.thumbnail,
                description: book.volumeInfo.description,
                isbn: book.volumeInfo.industryIdentifiers,
                previewLink: book.volumeInfo.previewLink
            });

        }
        console.dir(books);
        return  {count:bookResponse.totalItems,books:books};
    }
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
