'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/user/info', controller.users.userInfo); // 查询个人信息
  router.post('/api/user/login', controller.users.userLogin); // 登录
  router.post('/api/user/register', controller.users.userRegister); // 注册(新增用户)
  router.get('/api/user/route_menu', controller.users.userRouteMenu); // 获取当前用户路由信息

  router.get('/api/control/user_list', controller.controls.userList); // 用户列表
  router.post('/api/control/user_update', controller.controls.userUpdate); // 更新用户

  router.get('/api/control/dept_list', controller.controls.deptList); // 部门列表
  router.post('/api/control/dept_add', controller.controls.deptAdd); // 新增部门
  router.post('/api/control/dept_update', controller.controls.deptUpdate); // 更新部门

  router.get('/api/control/menu_list', controller.controls.menuList); // 菜单列表
  router.post('/api/control/menu_add', controller.controls.menuAdd); // 新增菜单
  router.post('/api/control/menu_update', controller.controls.menuUpdate); // 更新菜单

  router.get('/api/control/role_list', controller.controls.roleList); // 角色列表
  router.post('/api/control/role_add', controller.controls.roleAdd); // 新增角色
  router.post('/api/control/role_update', controller.controls.roleUpdate); // 更新角色
};
