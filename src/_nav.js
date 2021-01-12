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
                  name: 'New User',
                  url: '/user/create',
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
                  name: 'New City',
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
                  name: 'New Station',
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
                  name: 'New Camera',
                  url: '/camera/create',
              },
              {
                  name: 'Cameras',
                  url: '/camera/all',
              }
          ],
      },
      {
          name: 'Alert',
          icon: 'icon-bell',
          children: [
              {
                  name: 'New Alert',
                  url: '/alert/create',
              },
              {
                  name: 'Alerts',
                  url: '/alert/all',
              }
          ],
      },
      {
          name: 'Veículos',
          url: '/vehicle/all',
          icon: 'fa fa-automobile',
      },
  ]
};
