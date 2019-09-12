<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'data_init',
                        title: '初始化元数据',
                        subs: [
                            {
                                index: 'data_init_attr',
                                title: '属性定义表导入',
                            },
                            {
                                index: 'data_init_source',
                                title: '数据源导入',
                            },
                            {
                                index: 'data_init_etl',
                                title: 'ETL数据导入',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'data_manage',
                        title: '元数据管理',
                        subs: [
                            {
                                index: 'data_manage_attr',
                                title: '属性定义表管理',
                            },
                            {
                                index: 'data_manage_source',
                                title: '数据源管理',
                            },
                            {
                                index: 'data_manage_type',
                                title: '事件类型管理',
                            },
                            {
                                index: 'data_manage_collect',
                                title: '元数据采集管理',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'data_collect',
                        title: '采集数据管理',
                        subs: [
                            {
                                index: 'data_collect_correct',
                                title: '数据修正',
                            },
                            {
                                index: 'data_collect_verify',
                                title: '数据审核',
                            },
                        ]
                    },
                ]
            }
        },
        mounted(){
            // 从登入成功保存的用户信息获取用户菜单权限
            var userinfo = JSON.parse(window.localStorage.getItem('AXJJ_USERINFO'))
            // console.log(userinfo.menuTreeDtoList)
            // this.items = userinfo.menuTreeDtoList
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
