import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'

export const constantRouterMap = [
	{ path: '/refresh',component: require('@/components/refresh').default,name: 'refresh',hidden: true },
  { path: '/read', name: 'Read', component:  require('@/views/study/read').default, hidden: true },
  { path: '/readcheck', name: 'ReadCheck', component:  require('@/views/study/readcheck').default, hidden: true },
  { path: '/review', name: 'Review', component:  require('@/views/study/review').default, hidden: true },
  { path: '/login', component:  require('@/views/login/index').default, hidden: true },
  { path: '/404', component:  require('@/views/404').default, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
		name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component:  require('@/views/dashboard/index').default,
			
    }]
  },
  {
    path: '/study',
    component: Layout,
    redirect: '/study/task',
    name: 'Study',
    meta: { title: '学习', icon: 'study' },
    children: [
			 {
			  path: 'task',
			  name: 'Task',
			  component:  require('@/views/study/list/task').default,
			  meta: { title: '历史任务', icon: 'tasklist' }
			},
			 {
			  path: 'reviewlist',
			  name: 'Reviewlist',
			  component:  require('@/views/study/list/reviewlist').default,
			  meta: { title: '复习', icon: 'review' }
			},
	
			
      {
        path: 'jiaocai',
        name: 'Jiaocai',
        component:  require('@/views/study/list/jiaocai').default,
        meta: { title: '教材', icon: 'jiaocai' },
      },
			{
			  path: 'book',
			  name: 'Book',
			  component:  require('@/views/study/list/book').default,
			  meta: { title: '课外读物', icon: 'book' },
			},
			{
			  path: 'bookshow',
			  name: 'BookShow',
			  component:  require('@/views/study/list/bookshow').default,
			  meta: { title: '课外读物'}, hidden: true
			},
			// {
			//   path: 'read',
			//   name: 'Read',
			// 	hidden: true,
			//   component:  require('@/views/study/read').default,
			//   meta: { title: '任务中'}
			// },
//       {
//         path: 'cat',
//         name: 'Cat',
//         component:  require('@/views/study/list/cat').default,
//         meta: { title: '分类', icon: 'tree' }
//       }
    ]
  },
  // {
  //   path: '/serve',
  //   component: Layout,
		// redirect: '/serve/help',
		// name: 'Serve',
  //   children: [
  //     {
  //       path: 'help',
  //       name: 'Help',
  //       component:  require('@/views/help/help').default,
  //       meta: { title: '帮助', icon: 'help' }
  //     }
  //   ]
  // }, 
	{
    path: '/serve',
    component: Layout,
		redirect: '/serve/setting',
		name: 'Setting',
    children: [
      {
        path: 'setting',
        name: 'Setting',
        component:  require('@/views/help/setting').default,
        meta: { title: '设置', icon: 'setting' }
      }
    ]
  }, {
    path: '/serve',
    component: Layout,
		redirect: '/serve/proposal',
		name: 'Serve',
    children: [
       {
        path: 'proposal',
        name: 'Proposal',
        component:  require('@/views/help/proposal').default,
        meta: { title: '建议', icon: 'proposal' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// export default new Router({
//   routes: [
//     {
//       path: '/login',
//       name: 'login',
//       component: require('@/views/login/index').default
//     },
//    {
//      path: '/',
//      component: Layout,
//      // redirect: '/dashboard',
//      hidden: true,
//      children: [{
// 			 name: 'Dashboard',
//        path: 'dashboard',
//        component:  require('@/views/dashboard/index')
//      }]
//    },
// 		
//   ]
// })
