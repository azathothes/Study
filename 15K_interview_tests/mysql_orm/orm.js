var mysql = require('mysql');

function myOrm(connection){
	connection = connection || {};
	this._host = connection.host || '127.0.0.1';
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
    console.log('initialize successful.database connected...');


}
//use _query class to proxy every query function so as to make every query operation execute individualy.
function _query(table,pool){
	this._table = table;
	this.pool = pool;
}
_query.prototype.find = function(opt){
	console.log('find here')
	if(!this._table)
	{
		throw new Error('can not query data without a table set up.invoke table function first!');
	}
	this._sql = `select * from ${this._table} where 1=1 `;
	this._opt = opt;
	return this;
}
myOrm.prototype.table = function(table){
	return new _query(table,this.pool)
}
_query.prototype.skip = function(skip_num){
	console.log('skip here')
	if(!this._sql)
	{
		throw new Error('can not skip data from empty result,find it first!');
	}
	this._skip_num = skip_num;
	return this;
}
//one of the last function to be called
_query.prototype.limit = function(limit_num){
	console.log('limit here')
	if(!this._sql)
	{
		throw new Error('can not skip data from empty result,find it first!');
	}
	return new Promise((res,rej)=>{
		this.pool.getConnection((err,conn)=>{
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
						this._sql += `and ${key}=${this._opt[key]} `
					}
				}
				if(this._skip_num)
				{
					this._sql += `limit ${this._skip_num} offset ${limit_num} `;
				}
				console.log('about query for '+this._table)
				console.log(this._sql)
				conn.query(this._sql,(err,result)=>{
					if(err)
					{
						rej(err);
					}
					else
					{
						res(result);
					}
					_clean.call(this);
					conn.release();
				});
			}
		});
	});
}
//one of the last function to be called
_query.prototype.exec = function(){
	if(!this._table || !this._sql)
	{
		throw new Error('can not query data before the table and the queryinfo is set up.');
	}
	return new Promise((res,rej)=>{
		this.pool.getConnection((err,conn)=>{
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
						this._sql += ` ${key}='${this._upt[key]}' `;
						this._sql +=',';
					}
					if(this._sql.endsWith(','))
					{
						this._sql = this._sql.substring(this._sql , this._sql.length - 1);
					}
					this._sql +='where 1=1'
				}
				if(this._opt)
				{
					var op = Object.keys(this._opt)
					for(var key of op)
					{
						this._sql += ` and ${key}='${this._opt[key]}' `
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
				console.log(this._sql);
				conn.query(this._sql,(err,result)=>{
					if(err)
					{
						rej(err);
				    }
					else
					{
						res(result);
					}
					_clean.call(this);
					conn.release();
				});
			}
		});
	});
}
_query.prototype.take = function(take_num){
	this._take_num = take_num;
	return this;
}
_query.prototype.delete = function(opt){
	if(!this._table)
	{
		throw new Error('can not delete data from a unknown table! call table function first!')
	}
	this._method = 'delete';
	this._opt = opt;
	this._sql = `delete from ${this._table} where 1=1`;
	this._skip_num = null;
	this._take_num = null;
	return this;
}
_query.prototype.update = function(opt,upt){
	if(!this._table)
	{
		throw new Error('can not update data from a unknown table! call table function first!')
	}
	this._sql = `update ${this._table} set `
	this._method = 'update';
	this._skip_num = null;
	this._take_num = null;
	this._opt = opt;
	this._upt = upt;
	return this;
}
_query.prototype.findOne = function(opt){
	if(!this._table)
	{
		throw new Error('can not find data from a unknown table! call table function first!')
	}
	this._opt = opt;
	this._sql = `select * from ${this._table} where 1=1 `
	this._upt = null;
	this._skip_num = 1;
	this._take_num = null;
	return this;
}

function _clean(){
	this._table = null;
	this._sql = null;
    this._opt = null;
	this._upt = null;
	this._skip_num = null;
	this._take_num = null;
}

module.exports.myOrm = myOrm;