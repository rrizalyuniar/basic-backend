const {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId,
} = require("../model/products");
const commonHelper = require("../helper/common");

const productController = {
  getAllProduct: async (req, res) => {
    try {
      let sortBY = req.query.sortBY || "id";
      let search = req.query.search || "";
      let sort = req.query.sort || 'ASC';
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const result = await selectAllProduct(search,sortBY,sort,limit,offset);
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
  getDetailProduct: async (req, res) => {
    const id = Number(req.params.id);
    const {rowCount} = await findId(id);
    if (!rowCount) {
      return res.json({
        Message : "data not found"
      })
    }
    selectProduct(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data by id success");
      })
      .catch((err) => res.send(err));
  },
  createProduct: async (req, res) => {
    const { name, price, color, size, stock, rating, description } = req.body;
    const {
      rows: [count],
    } = await countData();
    const id = Number(count.count) + 1;
    const data = {
      id,
      name,
      price,
      color,
      size,
      stock,
      rating,
      description,
    };
    insertProduct(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Product created")
      )
      .catch((err) => res.send(err));
  },
  updateProduct: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { name, price, color, size, stock, rating, description } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return res.json({
          Message: "data not found"
        });
      }
      const data = {
        id,
        name,
        price,
        color,
        size,
        stock,
        rating,
        description,
      };
      updateProduct(data)
        .then((result) => 
          commonHelper.response(res, result.rows, 200, "Product updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteProduct(id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productController;
