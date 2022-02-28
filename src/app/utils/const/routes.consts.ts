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
  path: 'heroes',
}

const userRoot: RouteConfig = {
  name: 'user-root',
  path: 'user-info-page',
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

const battlePage: RouteConfig = {
  name: 'battle-page',
  path: 'battle-page'
}

export const ROUTE_CONFIGS: RouteConfigs = {
  root,
  login,
  registration,
  heroesRoot,
  userRoot,
  userInfo,
  userHeroList,
  userHistory,
  userPowerUps,
  userHeroInfo,
  battlePage,
}
