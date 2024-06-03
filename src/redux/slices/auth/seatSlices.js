import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSeats: [],
};

const seatSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    toggleSeatSelection(state, action) {
      const seatId = action.payload;
      if (state.selectedSeats.includes(seatId)) {
        state.selectedSeats = state.selectedSeats.filter(id => id !== seatId);
      } else {
        state.selectedSeats.push(seatId);
      }
      console.log("Selected Seats:", state.selectedSeats);
    },

    clearSeatSelection(state){
      state.selectedSeats = [];
    }
  },
});

export const { toggleSeatSelection, clearSeatSelection } = seatSlice.actions;
export default seatSlice.reducer;
