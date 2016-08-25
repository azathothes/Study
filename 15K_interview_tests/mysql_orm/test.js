var myOrm = require('./orm.js').myOrm;

var query = new myOrm();

query.table('passwd') 
     .find({passwd:4})
	 .skip(2)
     .limit(2)
     .then(res=>{console.log(res);console.log('======================================')})
     .catch(err=>{console.log(err);console.log('oops')});


query.table('passwd') 
     .find({passwd:4})
     .exec().then(res=>{console.log(res);console.log('======================================')})
     .catch(err=>{console.log(err);console.log('oops')});

query.table('passwd') 
     .find({passwd:3})
     .exec().then(res=>{console.log(res);console.log('======================================')})
     .catch(err=>{console.log(err);console.log('oops')});

query.table('passwd')
	 .update({passwd:'wlf112111'},{passwd:'wlf1234ooo',id:'wanlf_test'})
	 .exec()
	 .then(res=>{console.log(res);console.log('======================================')})
	 .catch(err=>{console.log(err)})