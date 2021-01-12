import DashBoard from './views/Dashboard';
import AdminDashBoard from './views/Dashboard/AdminDashboard';
import CreateCity from './views/City/CreateCity';
import Cities from './views/City/Cities';
import CreateStation from './views/Station/CreateStation';
import Stations from './views/Station/Stations';
import CreateCamera from './views/Camera/CreateCamera';
import Cameras from './views/Camera/Cameras';
import CreateAlert from './views/Alert/CreateAlert';
import Alerts from './views/Alert/Alerts';
import CreateUser from './views/User/CreateUser';
import User from './views/User/Users';
import Profile from "./views/User/Profile";
import Vehicles from './views/Vehicle/Vehicles';
import VehicleDetail from './views/Vehicle/VehicleDetail';

export const AdminRoute = [
    { path: '/dashboard', name: 'Dashboard', component: AdminDashBoard, exact: true },
    { path: '/city/create', name: 'Create City', component: CreateCity, exact: true },
    { path: '/city/all', name: 'Cities', component: Cities, exact: true },
    { path: '/station/create', name: 'Create Station', component: CreateStation, exact: true },
    { path: '/station/all', name: 'Stations', component: Stations, exact: true },
    { path: '/camera/create', name: 'Create Camera', component: CreateCamera, exact: true },
    { path: '/camera/all', name: 'Cameras', component: Cameras, exact: true },
    { path: '/alert/create', name: 'Criar Alerta', component: CreateAlert, exact: true },
    { path: '/alert/all', name: 'Alertas', component: Alerts, exact: true },
    {path: '/user/create', name: 'Criar usuário', component: CreateUser, exact: true},
    {path: '/user/all', name: 'Usuários', component: User, exact: true},
    {path: '/user/profile/:id', name: 'Perfil', component: Profile},
    {path: '/vehicle/all', name: 'Veículos', component: Vehicles, exact: true},
    {path: '/vehicle/detail/:id', name: 'Detalhe do veículo', component: VehicleDetail},
];

export const UserRoute = [
    { path: '/dashboard', name: 'Dashboard', component: DashBoard, exact: true },
    { path: '/city/create', name: 'Create City', component: CreateCity, exact: true },
    { path: '/city/all', name: 'Cities', component: Cities, exact: true },
    { path: '/station/create', name: 'Create Station', component: CreateStation, exact: true },
    { path: '/station/all', name: 'Stations', component: Stations, exact: true },
    { path: '/camera/create', name: 'Create Camera', component: CreateCamera, exact: true },
    { path: '/camera/all', name: 'Cameras', component: Cameras, exact: true },
    { path: '/alert/create', name: 'Criar Alerta', component: CreateAlert, exact: true },
    { path: '/alert/all', name: 'Alertas', component: Alerts, exact: true },
    {path: '/user/create', name: 'Criar usuário', component: CreateUser, exact: true},
    {path: '/user/all', name: 'Usuários', component: User, exact: true},
    {path: '/user/profile/:id', name: 'Profile', component: Profile},
    {path: '/vehicle/all', name: 'Veículos', component: Vehicles},
    {path: '/vehicle/detail/:id', name: 'Detalhe do veículo', component: VehicleDetail}
];