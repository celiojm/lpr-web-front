export const adminNav = {
  items: [
      {
        name: 'Dashboard',
          url: '/dashboard',
          icon: 'icon-speedometer',
      },
      {
          name: 'User',
          icon: 'icon-user',
          children: [
              {
                  name: 'Register',
                  url: '/user/register',
              },
              {
                  name: 'Users',
                  url: '/user/all',
              }
          ],
      },
      {
          name: 'City',
          icon: 'icon-map',
          children: [
              {
                  name: 'Add',
                  url: '/city/create',
              },
              {
                  name: 'Cities',
                  url: '/city/all',
              }
          ],
      },
      {
          name: 'Station',
          icon: 'fa fa-map-pin',
          children: [
              {
                  name: 'Register',
                  url: '/station/create',
              },
              {
                  name: 'Stations',
                  url: '/station/all',
              }
          ],
      },
      {
          name: 'Camera',
          icon: 'fa fa-video-camera',
          children: [
              {
                  name: 'Register',
                  url: '/admin/camera/register',
              },
              {
                  name: 'Cameras',
                  url: '/admin/camera/all',
              }
          ],
      },
      {
          name: 'Alert',
          icon: 'icon-bell',
          children: [
              {
                  name: 'Register',
                  url: '/admin/alert/register',
              },
              {
                  name: 'Alerts',
                  url: '/admin/alert/all',
              }
          ],
      },
  ]
};
