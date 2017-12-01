import moment from 'moment'
import { UPDATEDATE, UPDATECODE, UPDATECITY} from './../type'

export default {
	state: {
		codeOrName: '',
   	 	dateSection: [moment().subtract(2, 'days').format('YYYY-MM-DD'), moment().subtract(1,'days').format('YYYY-MM-DD')]
	},
	mutations: {
		[UPDATEDATE](state, action) {
			state.dateSection = action.dateSection
		},
		[UPDATECODE](state, action){
			console.log(action.codeOrName )
      		state.codeOrName  = action.codeOrName 
		},
		[UPDATECITY](state, action){
			console.log(action.szOrsh )
      		state.szOrsh  = action.szOrsh 
		}
	},
	actions: {
		[UPDATEDATE]({ commit }, dateSection){
      commit(UPDATEDATE, { dateSection })
		},
		[UPDATECODE]({ commit }, codeOrName){
      commit(UPDATECODE, { codeOrName })
		},
		[UPDATECITY]({ commit }, szOrsh){
			commit(UPDATECODE, { szOrsh })
		},
	}
}