import { RouteConfig, RouteConfigs } from '../interfaces/routes.interfaces';

const root: RouteConfig = {
  name: 'root',
  path: '',
}

const login: RouteConfig = {
  name: 'login',
  path: 'login',
}

const registration: RouteConfig = {
  name: 'registration',
  path: 'registration',
}

const heroesRoot: RouteConfig = {
  name: 'heroes-root',
  path: 'heroes-selection-page',
}

const userRoot: RouteConfig = {
  name: 'user-root',
  path: 'user-info-page',
}

export const ROUTE_CONFIGS: RouteConfigs = {
  root,
  login,
  registration,
  heroesRoot,
  userRoot,
}
