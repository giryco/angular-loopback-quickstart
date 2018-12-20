import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  MediaMatcher, BreakpointObserver, Breakpoints
} from '@angular/cdk/layout';

/**
 * Services
 */
import { AuthenticationService } from './../shared/services/loopback/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private _mobileQueryListener: () => void;
  public options: any;
  public mobileQuery: MediaQueryList;
  public mobile = (typeof window !== 'undefined') ?
    (window.screen.availWidth < 800) :
    true;
  public views: Object[] = [{
    name: 'Painel inicial',
    icon: 'home',
    link: ['dashboard']
  }, {
    name: 'Plano de Contas',
    icon: 'money',
    link: ['account']
  }, {
    name: 'Contratos',
    icon: 'assignment',
    link: 'contract'
  }, {
    name: 'Fornecedores',
    icon: 'business',
    link: 'provider'
  }, {
    name: 'Materiais',
    icon: 'build',
    link: 'material'
  }, {
    name: 'Locais de almoxarifado',
    icon: 'shopping_cart',
    link: 'warehouse-location'
  }, {
    name: 'Situações Contábeis',
    icon: 'attach_money',
    link: 'accounting-situation'
  }];

  constructor(
    private _auth: AuthenticationService,
    public breakpointObserver: BreakpointObserver,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();

    this
      .mobileQuery
      .addListener(this._mobileQueryListener);

    this.options = {
      fixed: 'fixed', // Define the sidenav style, possible values are 'fixed' and 'Non-fixed'
      opened: !this.mobileQuery.matches, // Possible values are true or false
      mode: 'auto', // Define the sidenav mode, possible values are push, side and over
      top: 56, // Css 'top' from sidenav
      bottom: 0, // Css 'bottom' from sidenav
      userCard: true
    };

    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(mobile => {
      this.options.opened = !mobile.matches;
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this
      .mobileQuery
      .removeListener(this._mobileQueryListener);
  }

  ngOnInit() { }

  logout = () => {
    const params = {
      navigateTo: '/login'
    };

    this._auth.logout(params);
  }
}
