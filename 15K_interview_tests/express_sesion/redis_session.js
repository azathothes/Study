const redis = require('ioreids');
const crypto = require('crypto');

const mysession = function(session_info){
	var conn_info = session_info.connection || {port:6379,host:'127.0.0.1'};
	var maxAge = session_info.maxAge || 3000;
	var sessionId = session_info.sessionId || "";

	const redis = new reids(conn_info.port,conn_info.host);
	return function(req,res,next){
		req.session = {};
		var sessionProxy = new Proxy(req.session,{
			set:function(target,prop,value){
					var encript = crypto.createHash('md5');
	        var enValue = encript.update(session_info.cookieKey + prop).digest('hex');
					target[prop] = enValue;
					redis.set(enValue,value);
					res.cookies[sessionId] = enValue;
			},
			get:function(target,prop){
					var envalue = target[prop];
					if(!envalue)
					{
						  return null;
					}
					return redis.get(envalue);
			}
		});
	}
}
