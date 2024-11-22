import { NotFoundError } from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/admin',
    lazy: async () => {
      const AppShell = await import('../../shared/ui/theme/app-shell');
      return { Component: AppShell.default };
    },
    errorElement: <NotFoundError />,
    children: [
      {
        index: true,
        path: 'dashboard',
        lazy: async () => ({
          Component: (await import('../../pages/admin/dashboard')).default
        })
      },
      {
        index: true,
        path: 'master-data',
        lazy: async () => ({
          Component: (
            await import('../../pages/admin/masterData/ui/formMasterData.tsx')
          ).default
        })
      }
    ]
  },
  {
    path: '/',
    lazy: async () => ({
      Component: (await import('../../pages/admin/auth/ui/index')).default
    })
  },

  {
    path: '*',
    lazy: async () => ({
      Component: (await import('../../pages/errors/not-found-error')).default
    })
  }
]);

export default router;
