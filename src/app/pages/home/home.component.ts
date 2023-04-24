import { Component,OnInit } from '@angular/core';
import {FileModel} from "../../model/file.model";
import {DomSanitizer} from "@angular/platform-browser";
import {DocModel} from "../../model/doc.model";
import {DocumentService} from "../../service/document.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  base64textString: any[]=[];
  typeImage!: string;

  doc: DocModel = new DocModel();

  constructor(private sanitizer: DomSanitizer, private document:DocumentService) {
  }

  ngOnInit(): void {

  }



  handleReaderLoaded(e:any) {
    let data = 'data:'+this.typeImage+';base64,'
    this.base64textString.push( data + btoa(e.target.result));
    this.doc.Image = this.base64textString;
    console.log(this.base64textString);
  }

  onFilselect(event:any){
    if (event.target.files) {
      const files = event.target.files[0];
      console.log(files);
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(files);
      console.log(reader);
    }
  }

  seenDoc(){
    console.log(this.doc);
    this.document.addDoc(this.doc).subscribe(data =>{
      console.log(data);
    })
  }

}
