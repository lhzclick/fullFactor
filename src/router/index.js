import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/data_init_attr'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                },

                // 业务页面  --初始化元数据
                {
                    path: '/data_init_attr',
                    component: resolve => require(['../components/page/Data_init_attr.vue'], resolve),
                    meta: { title: '属性定义表导入' }
                },
                {
                    path: '/data_init_attr_detail',
                    component: resolve => require(['../components/page/Data_init_attr_detail.vue'], resolve),
                    meta: { title: '属性定义表导入详情' ,keepAlive: false}
                },
                {
                    path: '/data_init_source',
                    component: resolve => require(['../components/page/Data_init_source.vue'], resolve),
                    meta: { title: '数据源导入' }
                },
                {
                    path: '/data_init_source_detail',
                    component: resolve => require(['../components/page/Data_init_source_detail.vue'], resolve),
                    meta: { title: '数据源导入详情' }
                },
                {
                    path: '/data_init_etl',
                    component: resolve => require(['../components/page/Data_init_etl.vue'], resolve),
                    meta: { title: 'ETL数据导入' }
                },
                {
                    path: '/data_init_etl_detail',
                    component: resolve => require(['../components/page/Data_init_etl_detail.vue'], resolve),
                    meta: { title: 'ETL数据导入详情' }
                },
                // 元数据管理
                {
                    path: '/data_manage_attr',
                    component: resolve => require(['../components/page/Data_manage_attr.vue'], resolve),
                    meta: { title: '属性定义表管理' }
                },
                {
                    path: '/data_manage_source',
                    component: resolve => require(['../components/page/Data_manage_source.vue'], resolve),
                    meta: { title: '数据源管理' }
                },
                {
                    path: '/data_manage_type',
                    component: resolve => require(['../components/page/Data_manage_type.vue'], resolve),
                    meta: { title: '事件类型管理' }
                },
                {
                    path: '/data_manage_collect',
                    component: resolve => require(['../components/page/Data_manage_collect.vue'], resolve),
                    meta: { title: '元数据采集管理' }
                },

                // 采集数据管理
                {
                    path: '/data_collect_correct',
                    component: resolve => require(['../components/page/Data_collect_correct.vue'], resolve),
                    meta: { title: '数据修正' }
                },
                {
                    path: '/data_collect_correct_detail',
                    component: resolve => require(['../components/page/Data_collect_correct_detail.vue'], resolve),
                    meta: { title: '数据修正详情' }
                },
                {
                    path: '/data_collect_verify',
                    component: resolve => require(['../components/page/Data_collect_verify.vue'], resolve),
                    meta: { title: '数据审核' }
                },
                {
                    path: '/data_collect_verify_detail',
                    component: resolve => require(['../components/page/Data_collect_verify_detail.vue'], resolve),
                    meta: { title: '数据审核详情' }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
