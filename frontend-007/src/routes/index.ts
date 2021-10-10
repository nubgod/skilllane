import loadable from '@loadable/component'
import { RouteConfig } from 'react-router-config'
import Courses from '../pages/course'
import Login from '../pages/login'
import Register from '../pages/register'
// import Home from '../pages/home'
// import CreateParty from '../pages/create'
// import MyParties from '../pages/my-parties'

const routesConfig: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    restricted: true,
    component: Courses,
  },
  // {
  //   path: '/create-party',
  //   exact: true,
  //   restricted: true,
  //   component: CreateParty,
  // },
  // {
  //   path: '/my-parties',
  //   exact: true,
  //   restricted: true,
  //   component: MyParties,
  // },
]

export default routesConfig
