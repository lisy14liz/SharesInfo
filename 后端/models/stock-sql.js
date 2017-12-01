module.exports = {
	insert: 'INSERT INTO stock (`code`, `name`, `amount`, `proportion`, `dateT`, `city_code`, `update_state`) VALUES ?',
	query: 'SELECT * FROM stock WHERE code = ?',
	queryAll: 'SELECT DISTINCT t1.code, t1.name, t2.amount/t1.amount*100-100 as percent, t2.amount-t1.amount as amount FROM stock t1, stock t2 WHERE t1.code = t2.code AND t1.dateT = ? AND t2.dateT = ? AND t1.city_code = ?',
	queryAllWithCode: 'SELECT DISTINCT t1.code, t1.name, t2.amount/t1.amount*100-100 as percent, t2.amount-t1.amount as amount FROM stock t1, stock t2 WHERE t1.code = t2.code AND t1.dateT = ? AND t2.dateT = ? AND t1.city_code = ? AND (t1.code LIKE ? OR t1.name LIKE ?)',
	update1:'UPDATE stock SET code=code+510000, update_state = 1 WHERE city_code=1 AND update_state=0',
	update2:'UPDATE stock SET code=code+223000, update_state = 1 WHERE city_code=2 AND floor(code/1000)=77 AND update_state=0',
	update3:'UPDATE stock SET code=code-70000, update_state = 1 WHERE city_code=2 AND floor(code/1000)!=77 AND floor(code/10000)=7 AND update_state=0',
	alter1:'alter table stock modify code int(6) zerofill'

}