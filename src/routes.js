import DashBoard from './views/Dashboard';
import AdminDashBoard from './views/Dashboard/AdminDashboard';
import CreateCity from './views/City/CreateCity';
import Cities from './views/City/Cities';
import CreateStation from './views/Station/CreateStation';

export const AdminRoute = [
  { path: '/dashboard', name: 'Dashboard', component: AdminDashBoard, exact: true },
  { path: '/city/create', name: 'Create City', component: CreateCity, exact: true },
  { path: '/city/all', name: 'Cities', component: Cities, exact: true },
  { path: '/station/create', name: 'Create Station', component: CreateStation, exact: true },
];

export const UserRoute = [
    { path: '/dashboard', name: 'Dashboard', component: DashBoard, exact: true },
    { path: '/city/create', name: 'Create City', component: CreateCity, exact: true },
    { path: '/city/all', name: 'Cities', component: Cities, exact: true },
    { path: '/station/create', name: 'Create Station', component: CreateStation, exact: true },
];