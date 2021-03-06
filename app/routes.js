"use strict";

module.exports = function (app) {
  var login = require("./controller/login");
  app.route("/api/login/user").post(login.user_login);

  var audit_log = require("./controller/audit_log");
  app.route("/api/audit/log").get(audit_log.get);

  var menu = require("./controller/menu");
  app.route("/api/menu/user").get(menu.user_menu);

  var sys_configuration = require("./controller/sys_configuration");
  app.route("/api/configuration").get(sys_configuration.get);
  app.route("/api/configuration").post(sys_configuration.update);

  var sys_menu_parent = require("./controller/sys_menu_parent");
  app.route("/api/menu/parent").get(sys_menu_parent.get);
  app.route("/api/menu/parent").put(sys_menu_parent.insert);
  app.route("/api/menu/parent").post(sys_menu_parent.update);
  app.route("/api/menu/parent").delete(sys_menu_parent.delete);

  var sys_menu_child = require("./controller/sys_menu_child");
  app.route("/api/menu/child").get(sys_menu_child.get);
  app.route("/api/menu/child").put(sys_menu_child.insert);
  app.route("/api/menu/child").post(sys_menu_child.update);
  app.route("/api/menu/child").delete(sys_menu_child.delete);

  var sys_role_section = require("./controller/sys_role_section");
  app.route("/api/role/section").get(sys_role_section.get);
  app.route("/api/role/section").post(sys_role_section.update);

  var user_department = require("./controller/user_department");
  app.route("/api/master/user_department").get(user_department.get);
  app.route("/api/master/user_department").put(user_department.insert);
  app.route("/api/master/user_department").post(user_department.update);
  app.route("/api/master/user_department").delete(user_department.delete);

  var user_section = require("./controller/user_section");
  app.route("/api/master/user_section").get(user_section.get);
  app.route("/api/master/user_section").put(user_section.insert);
  app.route("/api/master/user_section").post(user_section.update);
  app.route("/api/master/user_section").delete(user_section.delete);

  var user = require("./controller/user");
  app.route("/api/master/user").get(user.get);
  app.route("/api/master/user").put(user.insert);
  app.route("/api/master/user").post(user.update);
  app.route("/api/master/user").delete(user.delete);

  // MODULE RESTO
  var r_branch = require("./controller/resto/resto_branch");
  app.route("/api/resto/branch").get(r_branch.get);
  app.route("/api/resto/branch").put(r_branch.insert);
  app.route("/api/resto/branch").post(r_branch.update);
  app.route("/api/resto/branch").delete(r_branch.delete);
  var r_branch_menu = require("./controller/resto/resto_branch_menu");
  app.route("/api/resto/branch_menu").get(r_branch_menu.get);
  app.route("/api/resto/branch_menu").put(r_branch_menu.insert);
  app.route("/api/resto/branch_menu").post(r_branch_menu.update);
  app.route("/api/resto/branch_menu").delete(r_branch_menu.delete);
  var r_menu = require("./controller/resto/resto_menu");
  app.route("/api/resto/menu").get(r_menu.get);
  app.route("/api/resto/menu").put(r_menu.insert);
  app.route("/api/resto/menu").post(r_menu.update);
  app.route("/api/resto/menu").delete(r_menu.delete);
  var r_menu_category = require("./controller/resto/resto_menu_category");
  app.route("/api/resto/menu_category").get(r_menu_category.get);
  app.route("/api/resto/menu_category").put(r_menu_category.insert);
  app.route("/api/resto/menu_category").post(r_menu_category.update);
  app.route("/api/resto/menu_category").delete(r_menu_category.delete);
  var r_menu_v_ctgry = require("./controller/resto/resto_menu_variant_category");
  app.route("/api/resto/menu_variant_category").get(r_menu_v_ctgry.get);
  app.route("/api/resto/menu_variant_category").put(r_menu_v_ctgry.insert);
  app.route("/api/resto/menu_variant_category").post(r_menu_v_ctgry.update);
  app.route("/api/resto/menu_variant_category").delete(r_menu_v_ctgry.delete);
  var resto_menu_variant = require("./controller/resto/resto_menu_variant");
  app.route("/api/resto/menu_variant").get(resto_menu_variant.get);
  app.route("/api/resto/menu_variant").put(resto_menu_variant.insert);
  app.route("/api/resto/menu_variant").post(resto_menu_variant.update);
  app.route("/api/resto/menu_variant").delete(resto_menu_variant.delete);
};
