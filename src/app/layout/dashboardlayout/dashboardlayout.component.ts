import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { Http } from '@angular/http';

import { SettingsService as ConfigService } from '../../services/settings/settings.service';
import { ClientApiService } from '../../services/api/clientapi.service';
import { SettingService } from '../../pages/setting/setting.service';

declare var $: any;

@Component({
  selector: 'app-dashboardlayout',
  templateUrl: './dashboardlayout.component.html',
  styleUrls: ['./dashboardlayout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  toasterconfig = new ToasterConfig({
    showCloseButton: false,
    tapToDismiss: false,
    timeout: 2000
  });

  user = { email: '', roles: [] };
  lang = '';
  timer: any = null;
  category: any[] = [];
  constructor(
    public http: Http,
    private router: Router,
    private toasterService: ToasterService,
    private config: ConfigService,
    private api: ClientApiService,
    private settingApi: SettingService
  ) {
    this.user = config.getAppSetting('user');
    this.lang = localStorage.getItem('stanapplang') || 'de';

    this.category = [
    { name: "Artist Books", link: "Artist-Books" },
    { name: "Magazine", link: "Magazine" },
    { name: "New Media", link: "New-Media" },
    { name: "Photography", link: "Photography" },
    { name: "Graphic", link: "Graphic" }]
  }

  ngOnInit() {
    // this.toasterService.popAsync('error', '', 'asddddddd');
    this.settingApi.getAll().subscribe(res => {
      const item = res.find(item => item.key === 'settings');
      this.config.setAppSetting('settings', item ? item.value : {});
      const hook = res.find(item => item.key === 'netlifyHook');
      if (hook && hook.value.state === 'building') {
        this.startWatch();
      }
    });
  }

  ngOnDestroy() {
    this.stopWatch();
  }

  openUrl(route) {
    this.router.navigate(['/dashboard/' + route.link])
  }
  startWatch() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.settingApi.getSetting('netlifyHook').subscribe(res => {
        if (!res.length) return;

        const detail = res[0].value;
        if (detail.state === 'ready') {
          this.stopWatch();
          window.open(detail.deploy_ssl_url, '_blank');
        } else if (detail.state === 'failed') {
          this.stopWatch();
          this.toasterService.popAsync(
            'error',
            '',
            'Sorry. Building has been failed'
          );
        }
      });
    }, 3500);
  }

  stopWatch() {
    if (!this.timer) return;

    clearInterval(this.timer);
    this.timer = null;
  }

  logout($event) {
    $event.preventDefault();
    this.api.logout().subscribe(() => {
      this.config.clearSetting();
      this.router.navigate(['/home']);
    });
  }

  changeLanguage(lang) {
    this.lang = lang;
    localStorage.setItem('stanapplang', lang);
    document.location.reload();
  }

  triggerHook(isLive) {
    const settings = this.config.getAppSetting('settings') || {};
    const url = isLive ? settings.liveBuildHook : settings.previewBuildHook;

    if (!url) {
      this.toasterService.popAsync(
        'error',
        '',
        'Web Hook url is not defined. Please check settings page'
      );
      return;
    }

    if (
      isLive &&
      !confirm('The changes will be deployed to live site. Are you sure?')
    ) {
      return;
    }

    this.http.post(url, {}).subscribe(
      res => {
        this.startWatch();
      },
      err => {
        this.toasterService.popAsync('error', '', 'Sorry. Something is wrong');
      }
    );
  }
}
