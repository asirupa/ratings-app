export default function StatsReducer(state = {}, action) {
  switch (action.type) {
    case 'FETCH_STATS_FULFILLED':
      let data = action.payload;
      return { ...state, ...data };
    case 'NEW_STATS_DATA':
      return {
        ...state,
        ...action.stats,
      };
    default:
      return state;
  }
}
