import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSeats: [],
  seats: [],
};

const seatSlice = createSlice({
  name: 'seats',
  
  initialState,
  reducers: {
    setSeats(state, action) {
      state.seats = action.payload;
    },
    toggleSeatSelection(state, action) {
      const seatId = action.payload;
      const seat = state.seats.find(seat => seat.id === seatId);
      if (seat.estado === true) {
        seat.estado = false;
        state.selectedSeats = state.selectedSeats.filter(id => id !== seatId);
      } else if (seat.estado === false) {
        seat.estado = true;
        state.selectedSeats.push(seatId);
      }
    },
    updateSeats(state, action) {
      state.seats = action.payload;
      state.selectedSeats = action.payload.filter(seat => seat.state === 'selected').map(seat => seat.id);
    },
  },
});

export const { setSeats, toggleSeatSelection, updateSeats } = seatSlice.actions;
export default seatSlice.reducer;
