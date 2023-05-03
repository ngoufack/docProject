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
  rendutext!: string;

  doc: DocModel = new DocModel();

  constructor(private sanitizer: DomSanitizer, private document:DocumentService) {
  }

  ngOnInit(): void {

  }



  /*handleReaderLoaded(e:any) {
    let data = 'data:'+this.typeImage+';base64,'
    this.base64textString.push( data + btoa(e.target.result));
    this.doc.Image = this.base64textString;
    console.log(this.base64textString);
  }*/

  onFilselect(event:any){

    if (event.target.files) {
      const files = event.target.files[0];
      this.doc.Image =  files;
      //console.log(this.doc);
      /*const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(files);
      console.log(reader);*/
    }
  }

  seenDoc(){
    //console.log(this.doc);
    const  formgroup = new FormData();
    formgroup.append("Image",this.doc.Image)
    formgroup.append("DestinationLanguage",this.doc.DestinationLanguage)
    this.document.addDoc(formgroup).subscribe({
      next: () => {},
      error: (e) => {
        //console.log(e.error.text)
        this.rendutext = e.error.text;
      },
      complete: () => {}
    })
  }


}
