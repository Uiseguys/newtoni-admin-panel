/**
 * Created by S.Angel on 4/2/2017.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Api} from '../../services/api/api.service';

@Injectable()
export class ImageService {
    constructor(private api: Api) {}

    // ---------- product api ----------
    getImageCount(): Observable<any> {
        return this.api.get('/resources/count');
    }

    getAllImages(page = 1, pageSize = 500): Observable<any> {
        return this.api.get('/resources/all');
    }

    deleteImage(public_id): Observable<any> {
        return this.api.delete(`/resources/${encodeURIComponent(public_id)}`);
    }
}
