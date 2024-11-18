import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { EnumPath, EnumSidebar } from '@/common/enum/Enums';
import Notfound from '@/components/notfound';
import FeatureComponent from '@/layouts/GeneralLayout';
import HRLayout from '@/layouts/HRLayout';
import { Contact } from '@/pages/contact';
import { ContractsPage } from '@/pages/contract';
import DepartmentPage from '@/pages/department';
import { Help } from '@/pages/help';
import InfoPrivatePage from '@/pages/infoPrivate';
import { ListEmployeesPage } from '@/pages/listEmployees';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
// eslint-disable-next-line @typescript-eslint/naming-convention
const HomePage = React.lazy(async () => import('@/pages/home'));

// eslint-disable-next-line @typescript-eslint/naming-convention
const AuthPage = React.lazy(async () => import('@/pages/auth/view'));

const rootRoutes: Array<{
  element: JSX.Element;
  path?: string;
  children?: Array<{
    path: string;
    breadcrumbText?: JSX.Element | string;
    title?: JSX.Element;
    element: JSX.Element;
  }>;
}> = [
  {
    element: <HRLayout title='Trang chủ' />,
    children: [
      {
        path: EnumPath.home,
        element: (
          <PrivateRoute
            role={[]}
            children={<HomePage />}
          />
        ),
      },
    ],
  },
  {
    element: <FeatureComponent />,
    children: [
      {
        path: EnumPath.login,
        element: (
          <PublicRoute
            role={[]}
            children={<AuthPage />}
          />
        ),
      },
    ],
  },
  {
    element: <FeatureComponent />,
    children: [
      {
        path: EnumPath.forgotPassword,
        element: (
          <PublicRoute
            role={[]}
            children={<AuthPage />}
          />
        ),
      },
    ],
  },
  {
    element: <FeatureComponent />,
    children: [
      {
        path: EnumPath.resetPassword,
        element: (
          <PublicRoute
            role={[]}
            children={<AuthPage />}
          />
        ),
      },
    ],
  },
  {
    element: <HRLayout title={EnumSidebar.userProfile} />,
    children: [
      {
        path: EnumPath.userProfile,
        element: (
          <PrivateRoute
            role={[]}
            children={<InfoPrivatePage />}
          />
        ),
      },
    ],
  },
  {
    element: <HRLayout title={EnumSidebar.department} />,
    children: [
      {
        path: EnumPath.department,
        element: (
          <PrivateRoute
            role={[]}
            children={<DepartmentPage />}
          />
        ),
      },
    ],
  },
  {
    element: <HRLayout title={EnumSidebar.employees} />,
    children: [
      {
        path: EnumPath.listEmployees,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListEmployeesPage />}
          />
        ),
      },
    ],
  },
  {
    element: <HRLayout title={EnumSidebar.contracts} />,
    children: [
      {
        path: EnumPath.contracts,
        element: (
          <PrivateRoute
            role={[]}
            children={<ContractsPage />}
          />
        ),
      },
    ],
  },
  {
    element: <HRLayout title={EnumSidebar.help} />,
    children: [
      {
        path: EnumPath.help,
        element: (
          <PrivateRoute
            role={[]}
            children={<Help />}
          />
        ),
      },
    ],
  },
  {
    element: <HRLayout title={EnumSidebar.contact} />,
    children: [
      {
        path: EnumPath.contact,
        element: (
          <PrivateRoute
            role={[]}
            children={<Contact />}
          />
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Notfound />,
  },
];
const browserRouter = createBrowserRouter(rootRoutes);

export { browserRouter, rootRoutes };
