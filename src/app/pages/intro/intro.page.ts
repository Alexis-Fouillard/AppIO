import {Component, OnInit, ViewChild} from '@angular/core';
import {Plugins} from "@capacitor/core";
import {IonSlides} from "@ionic/angular";
import {Router} from "@angular/router";
import {INTRO_KEY} from "../../guards/intro.guard";
const { Storage } = Plugins;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  /**Permet de slider pour changer de page !*/
@ViewChild(IonSlides)slides: IonSlides;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  next(){
    this.slides.slideNext();
  }

  async start(){
    await Storage.set({key: INTRO_KEY, value: 'true'});
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

}
