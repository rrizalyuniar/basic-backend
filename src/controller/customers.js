const {
    selectAllCustomer,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    countData,
    findId,
  } = require("../model/customers");
  const commonHelper = require("../helper/common");
  
  const customerController = {
    getAllCustomer: async (req, res) => {
      try {
        let sortBY = req.query.sortBY || "id";
        let search = req.query.search || "";
        let sort = req.query.sort || 'ASC';
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const result = await selectAllCustomer(search,sortBY,sort,limit,offset);
        const {
          rows: [count],
        } = await countData();
        const totalData = parseInt(count.count);
        const totalPage = Math.ceil(totalData / limit);
        const pagination = {
          currentPage: page,
          limit: limit,
          totalData: totalData,
          totalPage: totalPage,
        };
        commonHelper.response(res, result.rows, 200, "get data success",pagination);
      } catch (error) {
        console.log(error);
      }
    },
    getDetailCustomer: async (req, res) => {
      const id = Number(req.params.id);
      const {rowCount} = await findId(id);
      if (!rowCount) {
        return res.json({
          Message : "data not found"
        })
      }
      selectCustomer(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data by id success");
        })
        .catch((err) => res.send(err));
    },
    createCustomer: async (req, res) => {
      const { name,phone,tgl_lahir,email,pw} = req.body;
      const {
        rows: [count],
      } = await countData();
      const id = Number(count.count) + 1;
      const data = {
        id,
        name,
        phone,
        tgl_lahir,
        email,
        pw,
      };
      insertCustomer(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Customer created")
        )
        .catch((err) => res.send(err));
    },
    updateCustomer: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { name,phone,tgl_lahir,email,pw } = req.body;
        const { rowCount } = await findId(id);
        if (!rowCount) {
          return res.json({
            Message: "data not found"
          });
        }
        const data = {
          id,
          name,
          phone,
          tgl_lahir,
          email,
          pw,
        };
        updateCustomer(data)
          .then((result) => 
            commonHelper.response(res, result.rows, 200, "Customer updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
    deleteCustomer: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          res.json({ message: "ID is Not Found" });
        }
        deleteCustomer(id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Customer deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = customerController;