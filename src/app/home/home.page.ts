import { Component } from '@angular/core';
import { CalculoService } from '../service/calculo.service';
import { Calculo } from '../model/calculo.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  routerInfo: string = '/info';

  calculo: Calculo = {
    salarioBruto: null,
    jornadaMensal: null,
    adicionalHorasExtras: null,
    qtdHorasExtras: null
  }

  resultadoUnitario: number;
  resultadoTotal: number;

  constructor(private calculoService: CalculoService, public alertController: AlertController, private router: Router,
    private admobFree: AdMobFree) {
    this.showBanner();

  }

  calcularHoraExtra(): void {
    if (this.validaCampos(this.calculo)) {
      this.resultadoUnitario = this.calculoService.valorHoraExtra(this.calculo);
      this.resultadoTotal = (this.calculo.qtdHorasExtras * this.resultadoUnitario);
    } else {
      this.presentAlert();
    }
  }

  validaCampos(calculo: Calculo): boolean {
    if (calculo.adicionalHorasExtras == null || calculo.jornadaMensal == null
      || calculo.qtdHorasExtras == null || calculo.salarioBruto == null) {
      return false;
    }
    return true;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Preencha todos o campos!',
      buttons: ['OK']
    });
    await alert.present();
  }

  limpar(): void {
    this.calculo.salarioBruto = null;
    this.calculo.jornadaMensal = null;
    this.calculo.adicionalHorasExtras = null;
    this.calculo.qtdHorasExtras = null;
    this.resultadoTotal = null;
    this.resultadoUnitario = null;
  }

  pageInfo(): void {
    this.router.navigate([this.routerInfo]);
  }

  showBanner() {
    let bannerConfig: AdMobFreeBannerConfig = {
      id: "ca-app-pub-4420839482116106/3564962143",
      autoShow: true,
      //isTesting: true
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then(() => {

    }).catch(e => {
      console.log(e);
    })
  }

}
