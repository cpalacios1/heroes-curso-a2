
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeroesService, Heroe } from './../../services/heroes.service';
import * as Jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {
  heroe: Heroe;
  fotoCasa: string;
  constructor(private _activatedRoute: ActivatedRoute, private _heroesService: HeroesService) {

  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.heroe = this._heroesService.getHeroe(params['id']);
      if (this.heroe.casa === 'DC') {
        this.fotoCasa = 'assets/img/dc_logo.jpg';
      } else {
        this.fotoCasa = 'assets/img/marvel_logo.png';
      }
    });
  }

  getPDF() {
    console.log('getPDF()');

    /////-------------JSPDF----------------
    //Ejemplo 1 TEXTO
    // const doc: Jspdf = new Jspdf({
    //   orientation: 'landscape',
    //   unit: 'in',
    //   format: [4, 2]
    // });

    // doc.text('Hello world!', 1, 1);
    // doc.save('a4.pdf');

    //Ejemplo 2 HTML A IMAGEN
    // const doc: Jspdf = new Jspdf();
    // const options = {
    //   onrendered: function(canvas){
    //     let img = canvas.toDataURL('image/png;base64');
    //     console.log(img);
    //     doc.addImage(img, 'JPEG', 15, 40, 180, 160);
    //     doc.save('a4.pdf');
    //   }
    // }
    // html2canvas( $('#imprimir')[0], options);

    //Ejemplo 1 HTML
    // const doc: Jspdf = new Jspdf('p','pt','a4');
    // doc.fromHTML($('#imprimir').get(0), 0, 0, {width:500}, function(){
    //   doc.addPage([400,200]);
    //   doc.save('a4.pdf');
    // });

    /////-------------phantom-html2pdf----------------
    const doc: Jspdf = new Jspdf('p', 'pt', 'a4');
    doc.fromHTML('http://localhost:4200/heroe/1', 0, 0, {width: 500}, function(){
      doc.addPage([400, 200]);
      doc.save('a4.pdf');
    });

  }


}
