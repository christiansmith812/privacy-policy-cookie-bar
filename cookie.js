let cookie = {
    
	day: 30,
	
	init: function(day = null) {
		if (day !== null && Number.isInteger(day)) { this.day = day; }
		if (!this.get('privacyAccept')) { this.show(); }

		document.querySelector('#privacyPolicyAcceptBtn').addEventListener('click', () => {
			this.hide();
		});
	},
	
	show: function(){
		document.querySelector('#privacyPolicy').style.display = 'table';
	},
	
	hide: function(){
		if (!this.get('privacyAccept')) {
			const expires = new Date();
			expires.setMilliseconds(expires.getMilliseconds() + (this.day * 864e+5));
			this.set('privacyAccept', 1, expires.toUTCString());
		}
		
		document.querySelector('#privacyPolicy').style.display = 'none';
	},
	
	set: function(name, value, expires, path, domain, secure) {
		document.cookie = name + '=' + 
						escape(value) +
						((expires) ? '; expires=' + expires : '') +
						((path) ? '; path=' + path : '') +
						((domain) ? '; domain=' + domain : '') +
						((secure) ? '; secure' : '');
	},
	
	get: function(name) {
		const cookie = ' ' + document.cookie;
		const search = ' ' + name + '=';
		
		let setStr = null;
		let offset = 0;
		let end = 0;
		
		if (cookie.length > 0) {
			offset = cookie.indexOf(search);
			
			if (offset != -1) {
				offset += search.length;
				end = cookie.indexOf(';', offset)
				
				if (end == -1) {
					end = cookie.length;
				}

				setStr = unescape(cookie.substring(offset, end));
			}
		}

		return(setStr);
	},
	
	delete: function (name) {
		document.cookie = name + '=' + '; expires=Thu, 01 Jan 1970 00:00:01 GMT';
	}
	
};

cookie.init();
