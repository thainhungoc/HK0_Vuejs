import { createRouter, createWebHistory } from "vue-router";
import ManagerProduct from "../components/ManagerProduct.vue";
import ManagerUser from "../components/ManagerUser.vue";
import Dashboard from "../components/Dashboard.vue";
import Admin from "../components/Admin.vue";

const routes =[
    {path:'/admin', name:'admin', component: Admin, alias:'/',
    children: [
        {
          path:'',
          name:"admin-doashboard",
          component:Dashboard,
          
        },
        {
          path: 'manager-user',
          name:'admin-manager-user',
          component: () => import('../components/ManagerUser.vue'),
        },
        {
          path: 'manager-product',
          name:'admin-manager-product',
          component: () => import('../components/ManagerProduct.vue'),
        },
      ]}
        
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export  default  router;
