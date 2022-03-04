let fs = require('fs');
let _ = require('lodash');
let htxt = require('htxt');
let build = async ()=>{
	let files = fs.readdirSync('./docs');
	let rets = [];
	let layout = fs.readFileSync('./template.html').toString();
	let pages = []

	let tmpl = _.template(layout);
	for(let file of files){
		let ret = htxt.parse(fs.readFileSync('./docs/'+file).toString());
		fs.writeFileSync('./builds/'+ret.options.short+'.html',  tmpl({body:ret.html}) )
		pages.push(_.pick(ret.options, ['title', 'short']));
	}

	fs.writeFileSync('./builds/menu.txt', pages.map((page)=>{
		return `-${page.title}=<a href="/${page.short}.html">${page.title}</a>`
	}).join('\n')) 
}

 
build().then()