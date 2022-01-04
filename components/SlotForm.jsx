import React, { useEffect } from 'react';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import API from '../utils/API';

const SlotForm = ({ showAddSlotForm, handleShowAddSlotForm }) => {
  const [open, setOpen] = useState(false);
  const [venueOpts, setVenueOpts] = useState([]);
  const [venue, setVenue] = useState('');
  const [slot, setSlot] = useState('');

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setOpen(showAddSlotForm);
  }, [showAddSlotForm]);

  const hideModal = () => {
    setOpen(false);
    handleShowAddSlotForm(false);
  };

  useEffect(() => {
    API({
      url: '/course',
      method: 'GET',
    })
      .then((response) => {
        if (response.data.success) {
          setVenueOpts(response.data.success);
          setVenue(response.data.success[0]._id);
        } else console.log('Error fetching bookings');
      })
      .catch((err) => {
        console.log('Error fetching bookings');
      });
  }, []);

  const submitSlot = () => {
    hideModal();

    let formData = new FormData();

    formData.append('venueId', venue);
    formData.append('date', slot);

    API.post('/slot', formData)
      .then((res) => {
        if (res.data.success) alert('Slot added successfully');
        else if (res.data.error) alert('Error');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={hideModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <form className="space-y-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Slot
                  </h3>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Venue
                  </label>
                  <div className="mt-1">
                    <select onChange={(e) => setVenue(e.target.value)}>
                      {venueOpts.map((opt) => (
                        <option value={opt._id} key={opt._id}>
                          {opt.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Slot
                  </label>
                  <div className="mt-1">
                    <input
                      id="slot"
                      name="slot"
                      type="datetime-local"
                      min="2021-12-22"
                      max="2021-12-31"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => setSlot(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => submitSlot()}
                >
                  Add Slot
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => hideModal()}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlotForm;
