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

const userInfo: RouteConfig = {
  name: 'user-info',
  path: 'user-info-page',
  fullpath: '/user-info-page'
}

const userHeroList: RouteConfig = {
  name: 'user-hero-list',
  path: 'hero-list',
}

const userHistory: RouteConfig = {
  name: 'user-history',
  path: 'history'
}

const userPowerUps: RouteConfig = {
  name: 'user-power-ups',
  path: 'power-ups'
}

const userHeroInfo: RouteConfig = {
  name: 'user-hero-info',
  path: 'hero-info'
}

export const ROUTE_CONFIGS: RouteConfigs = {
  root,
  login,
  registration,
  heroes,
  userInfo,
  userHeroList,
  userHistory,
  userPowerUps,
  userHeroInfo,
}
