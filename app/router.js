'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/user/login', controller.users.userLogin); // 登录
  router.post('/api/user/register', controller.users.userRegister); // 注册
  router.get('/api/user/info', controller.users.userInfo); // 查询个人信息
  router.post('/api/control/dept_add', controller.controls.deptAdd); // 新增部门
  router.post('/api/control/dept_update', controller.controls.deptUpdate); // 更新部门
  router.post('/api/control/menu_add', controller.controls.menuAdd); // 新增菜单
  router.post('/api/control/menu_update', controller.controls.menuUpdate); // 更新菜单
};
