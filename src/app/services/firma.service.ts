import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/api/api.service';

export interface Firma {
  firmaId: number;
  firmaAdi: string;
  firmaKodu: string;
  vergiNo: string;
  vergiDairesi: string;
  telefon: string;
  email: string;
  website: string;
  adres: string | null;
  kurulusTarihi: string | null;
  aktif: boolean;
  olusturulmaTarihi: string;
  guncellenmeTarihi: string;
}

export interface ApiResponse<T> {
  resultType: number;
  messages: string[];
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class FirmaService {
  constructor(private apiService: ApiService) { }

  getFirmaList(): Observable<ApiResponse<Firma[]>> {
    return this.apiService.get<ApiResponse<Firma[]>>('Firma/GetFirmaList');
  }
} 