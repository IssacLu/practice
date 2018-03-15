import Vue from 'vue';
import Router from 'vue-router';

import index from '@/components/index/index';
import user from '@/components/user/user';
import personinfo from '@/components/user/personinfo';
import ticketsinfo from '@/components/user/ticketsinfo';
import organization from '@/components/organization/organization';
import organizationinfo from '@/components/organization/organizationinfo';
import checktickets from '@/components/organization/check_tickets';
import publishticket from '@/components/organization/publish_ticket';
import edittickets from '@/components/organization/edittickets';
import notice from '@/components/user/notice';
import orginnizationlogin from '@/components/orginnizationlogin/orginnizationlogin';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/orginnizationlogin',
      name: 'orginnizationlogin',
      component: orginnizationlogin
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      children: [
        {
          path: '',
          redirect: 'ticketsinfo'
        },
        {
          path: 'personinfo',
          component: personinfo
        },
        {
          path: 'ticketsinfo',
          component: ticketsinfo
        },
        {
          path: 'notice',
          component: notice
        }
      ]
    },
    {
      path: '/organization',
      name: 'organization',
      component: organization,
      children: [
        {
          path: '',
          redirect: 'organizationinfo'
        },
        {
          path: 'organizationinfo',
          component: organizationinfo
        },
        {
          path: 'checktickets',
          component: checktickets
        },
        {
          path: 'publishticket',
          component: publishticket
        },
        {
          path: 'edittickets',
          name: 'edittickets',
          component: edittickets
        }
      ]
    }
  ]
});
