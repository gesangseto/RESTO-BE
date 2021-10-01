"use strict";
const response = require("../../response");
const models = require("../../models");
const utils = require("../../utils");
const perf = require("execution-time")();

exports.get = async function (req, res) {
  var data = { data: req.query };
  try {
    // LINE WAJIB DIBAWA
    perf.start();

    const require_data = [];
    for (const row of require_data) {
      if (!req.query[`${row}`]) {
        data.error = true;
        data.message = `${row} is required!`;
        return response.response(data, res);
      }
    }
    // LINE WAJIB DIBAWA
    var $query = `
    SELECT 
    * ,
    a.created_by AS created_by,
    a.updated_by AS updated_by,
    a.created_at AS created_at,
    a.updated_at AS updated_at,
    a.status AS status
    FROM resto_menu AS a
    LEFT JOIN resto_menu_category AS b ON a.resto_menu_category_id = b.resto_menu_category_id
    WHERE 1+1=2 `;
    for (const k in req.query) {
      if (k != "page" && k != "limit") {
        $query += ` AND a.${k}='${req.query[k]}'`;
      }
    }
    if (req.query.page || req.query.limit) {
      var start = 0;
      if (req.query.page > 1) {
        start = parseInt((req.query.page - 1) * req.query.limit);
      }
      var end = parseInt(start) + parseInt(req.query.limit);
      $query += ` LIMIT ${start},${end} `;
    }
    let check = await models.get_query($query);
    let _menus = [];
    if (check.data.length > 0 && req.query.resto_menu_id) {
      for (const it of check.data) {
        let _menu = it;
        let variant = `SELECT * FROM resto_menu_variant AS a
        LEFT JOIN resto_menu_variant_category AS b ON a.resto_menu_variant_category_id=b.resto_menu_variant_category_id
        WHERE a.resto_menu_id='${it.resto_menu_id}'`;
        variant = await models.exec_query(variant);
        let nested = await utils.nestedData({
          data: variant.data,
          unique: "resto_menu_variant_category_id",
        });
        let _categories = [];
        for (const i in nested) {
          var _category = {};
          _category.resto_menu_variant_category_id =
            nested[i][0].resto_menu_variant_category_id;
          _category.resto_menu_variant_category_name =
            nested[i][0].resto_menu_variant_category_name;
          _category.resto_menu_variant_category_description =
            nested[i][0].resto_menu_variant_category_description;
          _category.resto_menu_variant_type =
            nested[i][0].resto_menu_variant_type;
          let _variants = [];
          for (const at of nested[i]) {
            let _variant = {};
            _variant.resto_menu_variant_id = at.resto_menu_variant_id;
            _variant.resto_menu_variant_name = at.resto_menu_variant_name;
            _variant.resto_menu_variant_description =
              at.resto_menu_variant_description;
            _variant.resto_menu_variant_price = at.resto_menu_variant_price;
            _variant.resto_menu_variant_status = at.status;
            _variants.push(_variant);
          }
          _category.variant = _variants;
          _categories.push(_category);
        }
        _menu.variant_category = _categories;
        _menus.push(_menu);
      }
    }
    if (_menus.length > 0) {
      check.data = _menus;
    }
    return response.response(check, res);
  } catch (error) {
    data.error = true;
    data.message = `${error}`;
    return response.response(data, res);
  }
};

exports.insert = async function (req, res) {
  var data = { data: req.body };
  try {
    perf.start();
    req.body.created_by = req.headers.user_id;

    const require_data = ["resto_menu_name", "resto_menu_category_id"];
    for (const row of require_data) {
      if (!req.body[`${row}`]) {
        data.error = true;
        data.message = `${row} is required!`;
        return response.response(data, res);
      }
    }
    var _res = await models.insert_query({
      data: req.body,
      table: "resto_menu",
    });
    return response.response(_res, res);
  } catch (error) {
    data.error = true;
    data.message = `${error}`;
    return response.response(data, res);
  }
};

exports.update = async function (req, res) {
  var data = { data: req.body };
  try {
    perf.start();

    const require_data = [
      "resto_menu_name",
      "resto_menu_category_id",
      "resto_menu_id",
    ];
    for (const row of require_data) {
      if (!req.body[`${row}`]) {
        data.error = true;
        data.message = `${row} is required!`;
        return response.response(data, res);
      }
    }
    var _res = await models.update_query({
      data: req.body,
      key: "resto_menu_id",
      table: "resto_menu",
    });
    return response.response(_res, res);
  } catch (error) {
    data.error = true;
    data.message = `${error}`;
    return response.response(data, res);
  }
};

exports.delete = async function (req, res) {
  try {
    perf.start();

    var data = { data: req.body };
    const require_data = ["resto_menu_id"];
    for (const row of require_data) {
      if (!req.body[`${row}`]) {
        data.error = true;
        data.message = `${row} is required!`;
        return response.response(data, res);
      }
    }
    // LINE WAJIB DIBAWA
    var _res = await models.delete_query({
      data: req.body,
      key: "resto_menu_id",
      table: "resto_menu",
    });
    return response.response(_res, res);
  } catch (error) {
    data.error = true;
    data.message = `${error}`;
    return response.response(data, res);
  }
};
