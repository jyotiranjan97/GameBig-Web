import React from 'react';
import GamersInfoList from './GamerInfoList';

const UserBookingDetails = ({ bookingDetails }: { bookingDetails: any }) => {
  if (!bookingDetails) return null;
  return (
    <div
      className={
        'py-10 px-4 flex flex-col gap-12 font-sans text-gray-50 ' +
        'font-semibold text-xl  sm:text-left bg-slate-900'
      }
    >
      <span className="text-xl text-center text-gray-400">My Booking</span>
      <div className="grid grid-cols-2 mx-auto gap-4 md:gap-10">
        <section>
          <h2 className="font-semibold text-base text-gray-500">Team</h2>
          <span className="text-gray-200 text-xl font-semibold tracking-wide rounded-md">
            {bookingDetails.teamName}
          </span>
        </section>
        <section>
          <h2 className="font-semibold text-sm text-gray-500">Phone</h2>
          <span className="text-gray-200 text-xl font-semibold tracking-wide rounded-md">
            {bookingDetails.phoneNumber}
          </span>
        </section>
        <section>
          <h2 className="font-semibold text-base text-gray-500">Slot Number</h2>
          <span className="text-xl text-center font-semibold tracking-wide rounded-md text-green-500 ">
            {bookingDetails.slotNumber || 'Organizer Will Update'}
          </span>
        </section>
      </div>
      <GamersInfoList gamers={bookingDetails.users} />
    </div>
  );
};

export default UserBookingDetails;
