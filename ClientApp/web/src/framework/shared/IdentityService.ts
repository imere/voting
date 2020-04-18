import { UserManager, UserManagerSettings, WebStorageStateStore } from 'oidc-client';

import { Routes } from '@/constants';
import { API_AUTHORITY, HOST } from '@/framework/shared/api/questionnaire';

class IdentityService {
  private _manager: UserManager;
  private CLIENT_SETTINGS: UserManagerSettings = {
    'authority': API_AUTHORITY,
    'client_id': 'js',
    'redirect_uri': `${HOST}${Routes.AUTH_CALLBACK}`,
    'post_logout_redirect_uri': `${HOST}`,
    'response_type': 'id_token token',
    'scope': 'openid profile api1',
    userStore: new WebStorageStateStore({
      store: window.localStorage
    })
  };

  constructor() {
    this._manager = new UserManager(this.CLIENT_SETTINGS);
    this._manager.clearStaleState();
  }

  login = async () => {
    const result = await this._manager.getUser();
    return this._manager.signinPopup().then(() => result);
  }

  completeAuthentication = () => this._manager.signinPopupCallback()

  logout = async () => this._manager.signoutRedirect()

  getUser = () => this._manager.getUser();
}

const iservice = new IdentityService();

export { iservice } ;
