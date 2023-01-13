const Pool = require('../config/db');

const selectAllCustomer = (search,sortBY,sort,limit,offset) =>{
    return Pool.query(`SELECT * FROM customers WHERE name LIKE '%${search}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectCustomer = (id) =>{
    return Pool.query(`SELECT * FROM customers WHERE id=${id}`);
}

const insertCustomer = (data) =>{
    const { id,name,phone,tgl_lahir,email,pw} = data;
    return Pool.query(`INSERT INTO customers(id,name,phone,tgl_lahir,email,pw) VALUES(${id},'${name}',${phone},'${tgl_lahir}','${email}','${pw}')`);
}

const updateCustomer = (data) =>{
    const { id,name,phone,tgl_lahir,email,pw} = data;
    return Pool.query(`UPDATE customers SET name='${name}', phone=${phone}, tgl_lahir='${tgl_lahir}', email='${email}', pw='${pw}' WHERE id=${id}`);
}

const deleteCustomer = (id) =>{
    return Pool.query(`DELETE FROM customers WHERE id=${id}`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM customers')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM customers WHERE id=${id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

module.exports = {
    selectAllCustomer,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    countData,
    findId
}