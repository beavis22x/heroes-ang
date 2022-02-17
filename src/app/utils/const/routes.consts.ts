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

const heroes: RouteConfig = {
  name: 'heroes',
  path: 'heroes',
}

export const ROUTE_CONFIGS: RouteConfigs = {
  root,
  login,
  registration,
  heroes,
}
