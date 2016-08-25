var mysql = require('mysql');

function myOrm(connection){
	connection = connection || {};
	this._host = connection.host || 'localhost';
    this._port = connection.port || 3306;
    this._user = connection.user || 'wanlf';
    this._password = connection.password || 'wlf112111';
    this._database = connection.database || 'VoidMirage';
    this._result = null;
    this._method = 'query';
    //connect
    this.pool = mysql.createPool({
 		 host     : this._host,
  		 user     : this._user,
  		 password : this._password,
  		 database : this._database
		});
}

myOrm.prototype.find = function(opt){
	if(!this._table)
	{
		throw new Error('can not query data without a table set up.invoke table function first!');
	}
	this._sql = `select * from ${this._table} where 1=1`;
	this._opt = opt;
	return this;
}
myOrm.prototype.table = function(table){
	this._table = table;
	return this;
}
myOrm.prototype.skip = function(skip_num){
	if(!this._sql)
	{
		throw new Error('can not skip data from empty result,find it first!');
	}
	this._skip_num = skip_num;
	return this;
}
//one of the last function to be called
myOrm.prototype.limit = function(limit_num){
	if(!this._sql)
	{
		throw new Error('can not skip data from empty result,find it first!');
	}
	return new Promise((res,rej)=>{
		pool.getConnection((err,conn)=>{
			if(err)
			{
				rej(err);
			}
			else
			{
				if(this._opt)
				{
					var op = Object.keys(this._opt)
					for(var key of op)
					{
						sql += `and ${key}=${query[key]}`
					}
				}
				if(this._skip_num)
				{
					sql += `limit ${this._skip_num} offset ${limit_num}`;
				}
				

				conn.query(sql,(err,result)=>{
					if(err)
					{
						rej(err);
					}
					else
					{
						res(result);
					}
				});
			}
		});
	});
}
//one of the last function to be called
myOrm.prototype.exec = function(){
	if(!this._table || !this._sql)
	{
		throw new Error('can not query data before the table and the queryinfo is set up.');
	}
	return new Promise((res,rej)=>{
		pool.getConnection((err,conn)=>{
			if(err)
			{
				rej(err);
			}
			else
			{
				if(this._upt)
				{
					var up = Object.keys(this._upt)
					for(var key of up)
					{
						this._sql += ` ${key}=${up[key]}`
					}
					this._sql +='where 1=1'
				}
				if(this._opt)
				{
					var op = Object.keys(this._opt)
					for(var key of op)
					{
						this._sql += `and ${key}=${op[key]}`
					}
				}
				if(this._skip_num)
				{
					this._sql += `limit ${this._skip_num}`;
				}
				if(this._take_num)
				{
					this._sql +=`offset ${this._take_num}`;
				}


				conn.query(this._sql,(err,result)=>{
					if(err)
					{
						rej(err);
					}
					else
					{
						res(result);
					}
				});
			}
		});
	});
}
myOrm.prototype.take = function(take_num){
	this._take_num = take_num;
	return this;
}
myOrm.prototype.delete = function(opt){
	if(!this._table)
	{
		throw new Error('can not delete data from a unknown table! call table function first!')
	}
	this._method = 'delete';
	this._opt = opt;
	this._sql = `delete from ${this._table} where 1=1`;
	this._skip_num = null;
	this._take_num = null;
	this._sql = `update ${this._table} set `
	return this;
}
myOrm.prototype.update = function(opt,upt){
	if(!this._table)
	{
		throw new Error('can not update data from a unknown table! call table function first!')
	}
	this._method = 'update';
	this._skip_num = null;
	this._take_num = null;
	this._opt = opt;
	this._upt = upt;
	return this;
}
myOrm.prototype.findOne = function(opt){
	if(!this._table)
	{
		throw new Error('can not find data from a unknown table! call table function first!')
	}
	this._opt = opt;
	this._sql = `select * from ${this._table}`
	this._upt = null;
	this._skip_num = 1;
	this._take_num = null;
	return this;
}



module.exports.myOrm = myOrm;