import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';

import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-leitura-codbarras',
  templateUrl: './leitura-codbarras.component.html',
  styleUrls: ['./leitura-codbarras.component.scss']
})
export class LeituraCodbarrasComponent {

  showScanner = true;

  etapa = 1;

  allowedFormats: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_13,

  ];

  leituras = {
    cb: '',
    qr: '',
  };

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor(private readonly _dialog: MatDialog) { }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    console.log(resultString);

    this.openAlertDialog(resultString);

  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  openAlertDialog(mensagem) {

    if(this._dialog.openDialogs && this._dialog.openDialogs.length > 0){
      return false;
    }

    const dialogRef = this._dialog.open(AlertDialogComponent,{
      data:{
        message: mensagem,
        buttonText: {
          cancel: 'Cancelar',
          ok: 'Salvar',
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log(confirmed);
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();

        if(this.etapa == 1){
          this.leituras.qr = this.qrResultString;
          this.allowedFormats = [];
          this.allowedFormats.push(BarcodeFormat.QR_CODE)
          this.etapa = 2;
        }

        else if(this.etapa == 2){
          this.leituras.cb = this.qrResultString;
          this.showScanner = false;
          this.etapa = 3;
        }

        console.log(this.leituras);
        console.log(this.etapa);
        console.log(this.allowedFormats);


      }
    });
  }

}
