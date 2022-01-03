import React, { useEffect } from 'react';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import MediaUpload from './MediaUpload';
import API from '../utils/API';
import { useRouter } from 'next/router';

const Modal = ({ showAddVenueForm, handleShowAddVenueForm }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [gallery, setGallery] = useState('');

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setOpen(showAddVenueForm);
  }, [showAddVenueForm]);

  const hideModal = () => {
    setOpen(false);
    handleShowAddVenueForm(false);
  };

  const handleThumbnailUpload = (image) => {
    setThumbnail(image);
  };

  const handleMediaUpload = (media) => {
    setGallery(media);
  };

  const submitVenue = () => {
    if (
      !title ||
      !description ||
      !address ||
      !price ||
      !capacity ||
      !thumbnail ||
      !gallery[0] ||
      !gallery[1]
    ) {
      alert('Enter valid fields');
      return;
    }
    hideModal();

    let formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('price', price);
    formData.append('capacity', capacity);
    formData.append('owner', localStorage.getItem('userId'));
    formData.append('thumbnail', thumbnail[0]);
    formData.append('gallery-1', gallery[0]);
    formData.append('gallery-2', gallery[1]);

    API.post('/venue', formData)
      .then((res) => {
        alert('Successfully added');
        router.reload(window.location.pathname);
      })
      .catch((err) => alert('Error'));
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
                    Venue
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Venue Title
                  </label>
                  <div className="mt-1">
                    <input
                      id="title"
                      name="tile"
                      type="text"
                      autoComplete="title"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      defaultValue={''}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Write a few sentences about your venue.
                  </p>
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      defaultValue={''}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Write down adress of your venue
                  </p>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <div className="mt-1">
                    <input
                      id="price"
                      name="price"
                      type="text"
                      autoComplete="price"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="capacity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Capacity
                  </label>
                  <div className="mt-1">
                    <input
                      id="capacity"
                      name="capacity"
                      type="number"
                      autoComplete="capacity"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Thumbnail
                  </label>
                  <MediaUpload
                    handleMediaUpload={handleThumbnailUpload}
                    mediaCount={1}
                  />
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Galley
                  </label>
                  <MediaUpload
                    handleMediaUpload={handleMediaUpload}
                    mediaCount={2}
                  />
                </div>
              </form>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => submitVenue()}
                >
                  Add Venue
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

export default Modal;
